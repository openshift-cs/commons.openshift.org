import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Scanner;
import java.util.regex.*;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;

/**
 * Java program responsible for extracting necessary information from cURL command, resizing
 * and re-uploading the picture at the provided link to the correct size, and appending the new
 * information/file to the 'participants.yml' file within the commons.openshift.org GitHub repo
 *
 * @author shusen - Summer 2018
 *
 */
public class ImageResizer {

  /**
   * System's COMMONS_PATH environmental variable, which leads to the root directory
   * of the project's GitHub repo
   */
  private static final String COMMONS_PATH = System.getenv("COMMONS_PATH");

  /** Specific text String located in cURL command output on same line as body of Issues */
  private static final String ISSUE_FLAG = "\"body\": \"company";
  private static final String ISSUE_NUMBER_FLAG = "\"number\": ";

  /** String located in GitHub issues for any piece of information*/
  private static final String ISSUE_SKIP_FLAG = "tbd";

  /** Maximum pixel height for uploaded company logo */
  private static final float MAX_HEIGHT = 160;

  /**
   * Regular expression pattern used to capture company name, url, and logo url from
   * cURL output
   *
   * Full Regex: company:\s*(?<company>.*(?= url))\s*url:\s*(?<url>.*(?= logo))\s*logo:\s*(?:(?=!\[)!\[.*]\((?<logo1>[^"\s]*)\)|(?<logo2>[^"\s]*))(?:"|\s*.*)
   * https://regex101.com/r/KpF6m3/2
   */
  private static final String REGEX_PATTERN =
    "company:\\s*(?<company>.*(?= url))\\s*" + // Match the first line as containing the "company" information, use lookahead to ensure we don't match "url"
    "url:\\s*(?<url>.*(?= logo))\\s*" + // Match the second line as containing the "url" information, use lookahead to ensure we don't match "logo"
    "logo:\\s*(?:(?=!\\[)!\\[.*]\\((?<logo1>[^\"\\s]*)\\)|(?<logo2>[^\"\\s]*))(?:\"|\\s*.*)"; // Match the third line as containing the "logo" information. Using a conditional (as a non-capturing group), we're able to differentiate embedded images from logo URLs

  /** Sending user agent prevents 403's when getting images from some servers **/
  private static final String USER_AGENT = "oscommonsbot/1.0";

  /**
   * Main method; contains most critical functionality of program including establishing
   * Scanner for piped input and extracting critical body information from cURL output
   * @param args command line arguments
   * @throws IOException if the reading/writing operation fails
   */
  public static void main(String[] args) throws IOException {

    System.out.println("Processing GitHub issues for new Commons participants:\n");

    //Establishes input Scanners used to read piped-in cURL output and 'participants.yml' file
    Scanner inputReader = new Scanner(System.in);

    /** Whether or not errors have occured */
    boolean errors_encountered = false;

    /*
     * Following lines declare/initialize variables necessary for properly parsing
     * text input and extracting company name, url, and logo url
     */
    String line;
    String bodyLine;
    boolean needFirstCommit = true;
    boolean participantsUpdated = false;
    String issue_number = "unknown";
    String company;
    String business_url;
    String link;
    String fileName;
    URL logo_url;
    URL company_url;
    int companies_parsed = 0;

    BufferedWriter commit_out = null;
    File commit_f = new File(COMMONS_PATH + "/commit.txt");
    try {
      commit_out = new BufferedWriter(new FileWriter(commit_f, true));
    } catch (IOException e) {
      errors_encountered = true;
      System.out.println("Error: Could not write to `" + COMMONS_PATH + "/commit.txt`");
      System.exit(1);
    }

    Pattern bodyRegex = Pattern.compile(REGEX_PATTERN, Pattern.CASE_INSENSITIVE);

    /*
     * The main functionality of the program; processes through the GitHub Issue looking for
     * specific Strings of text that indicate whether or not the Issue involves adding a
     * company to the OpenShift Commons participants. If the Issue is formatted correctly and
     * the company has not already been processed, the program appends the company to the
     * 'participants.yml' file at the end of the list and calls on the proper method to
     * process and resize the image file at the URL stored in the "link" String
     */
    issue_loop:
    while (inputReader.hasNextLine()) {
      line = inputReader.nextLine().trim();
      if (line.toLowerCase().startsWith(ISSUE_FLAG.toLowerCase())) {
        companies_parsed++;
        bodyLine = line.trim().replace("\\r\\n", " ");
        Matcher m = bodyRegex.matcher(bodyLine);

        if (m.find()) {

          company = m.group("company");
          business_url = m.group("url");
          link = m.group("logo1");

          if (link == null) {
            link = m.group("logo2");
          }

          if (company != null && business_url != null && link != null && !bodyLine.toLowerCase().contains(ISSUE_SKIP_FLAG)) {

            try {
              logo_url = new URL(link);
            } catch (MalformedURLException e) {
              errors_encountered = true;
              System.out.println("Error: Invalid URL (" + link + ") - " + company);
              continue;
            }

            // Check the company URL, add "http://" to plain links
            if (!business_url.toLowerCase().matches("^https?://.*")) {
              business_url = "http://" + business_url;
              System.out.println("Warning: Missing http(s); company URL amended to " + business_url);
            }
            try {
              company_url = new URL(business_url);
            } catch (MalformedURLException e) {
              errors_encountered = true;
              System.out.println("Error: Invalid company URL (" + business_url + ") - " + company);
              continue;
            }

            //If SVG file, do not resize image
            switch (getExtension(logo_url)) {
              case "svg":
                fileName = saveImage(null, logo_url, company);
                break;
              case "":
                errors_encountered = true;
                System.out.println("Error: Unsupported URL - " + logo_url + " (" + company + ")");
                continue issue_loop;
              default:
                fileName = resizeImage(logo_url, company);
                break;
            }

            if (fileName != null) {
              if (deduplicateParticipants(company)) {

                //Establishes the BufferedWriter needed to append text to 'participants.yml'
                try {
                  BufferedWriter out = new BufferedWriter(new FileWriter(new File(COMMONS_PATH + "/src/content/participants/participants.yml"), true));

                  //Appends company and information to 'participants.yml'
                  out.newLine();
                  out.append("- name: \"" + company + "\"");
                  out.newLine();
                  out.append("  link: \"" + company_url + "\"");
                  out.newLine();
                  out.append("  logo: \"" + fileName + "\"");
                  out.close();
                  participantsUpdated = true;
                } catch (IOException e) {
                  errors_encountered = true;
                  System.out.println("Error: Could not write to `" + COMMONS_PATH + "/data/participants.yml`");
                }

                if (needFirstCommit) {
                  commit_out.append("Participants: Auto-add participants from Issues\n\n");
                  needFirstCommit = false;
                }

                commit_out.append("- Closes: #" + issue_number + "\n");
                //Prints to the console which companies were added
                System.out.println(companies_parsed + ". Company \"" + company + "\" added.");
              } else {
                errors_encountered = true;
                System.out.println("Problem deduplicate Participants in YAML");
              }
            } else {
              errors_encountered = true;
              System.out.println("Problem saving image file");
            }
          } else {
            if (business_url.toLowerCase() != "tbd" && link.toLowerCase() != "tbd")
            if (needFirstCommit) {
              commit_out.append("Participants: Auto-add participants from Issues\n\n");
              needFirstCommit = false;
            }

            commit_out.append("- Invalid issue: #" + issue_number + " (missing data -> url: " + business_url + "; logo: " + link + ")\n");
            System.out.println(companies_parsed + ". Company \"" + company + "\" NOT added because of missing data (url: " + business_url + "; logo: " + link + ")");
          }

          System.out.println("\t(From issue: https://github.com/openshift-cs/commons.openshift.org/issues/" + issue_number + ")");
        }
      } else if (line.toLowerCase().startsWith(ISSUE_NUMBER_FLAG.toLowerCase())) {
        issue_number = line.substring(10, line.length() - 1);
      }
    }

    inputReader.close();
    System.out.println();
    System.out.println(companies_parsed + " companies have been processed.");
    if (errors_encountered) {
      participantsUpdated = true;
      commit_out.append("\nErrors encountered during processing. Check job log for details.");
    }
    if (participantsUpdated) {
      commit_out.close();
    }
  }

  /**
   * Remove particpant from YAML file if they're going to be re-added in PR
   * @param company_name The company name to check if it exists
   * @return boolean The successful state of the operation
   */
  private static boolean deduplicateParticipants(String company_name) {
    try {
      File inputFile = new File(COMMONS_PATH + "/data/participants.yml");
      File tempFile = new File(COMMONS_PATH + "/data/participants.yml.new");

      BufferedReader reader = new BufferedReader(new FileReader(inputFile));
      BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile));

      String currentLine;
      String yamlData = "";


      while((currentLine = reader.readLine()) != null) {
        // Write the yaml header and skip it's processing as a yaml section
        if (currentLine.startsWith("participants:")) {
          writer.write(currentLine);
          continue;
        }

        // '-' indicates a new yaml section, determine what to do with previous section
        if (currentLine.startsWith("-") && yamlData != "") {
          // Only save yaml section if it does not contain the company name to be replaced
          if (!yamlData.toLowerCase().contains("- name: \"" + company_name.toLowerCase() + "\"")) {
            writer.write(yamlData);
          }
          yamlData = "";
        }

        yamlData += System.getProperty("line.separator") + currentLine;
      }
      if (yamlData != "" && !yamlData.toLowerCase().contains("- name: \"" + company_name.toLowerCase() + "\"")) {
        writer.write(yamlData);
      }
      writer.close();
      reader.close();
      return tempFile.renameTo(inputFile);
    } catch (IOException e) {
      System.out.println("Error deduplicating Participants YAML file");
      return false;
    }
  }

  /**
   * Static method simply responsible for determining the file extension of the picture file
   * going to be used as the company's logo on the website
   * @param url the url object of the image file whose extension is to be retrieved
   * @return the file extension of the image at the URL
   */
  private static String getExtension(URL url) {
    URLConnection conn = null;
    String mimeType = null;
    try {
      conn = url.openConnection();
      // avoid 403's by setting the user agent request header
      conn.setRequestProperty("User-Agent", USER_AGENT);
      // explicitly open connection to catch exceptions like SSL handshake errors
      conn.connect();
      mimeType = conn.getContentType();
    } catch (IOException e) {
      System.out.println("Error: Unable to read the image at the specified URL (" + url + ")");
      System.out.println(e);
      return "";
    }

    // in case there is no connection exception thrown and the mimeType is unknown
    if (mimeType == null) {
      System.out.println("Error: Unknown MimeType when trying to read the image at the specified URL (" + url + ")");
      return "";
    }

    if (!mimeType.startsWith("image")) {
      System.out.println("Error: MimeType of " + mimeType + " does not match expected 'image/*' MimeType");
      try {
        // print response headers if not getting "image" content type
        Map<String, List<String>> map = conn.getHeaderFields();
        System.out.println("---- Response headers ----");
        for (Map.Entry<String, List<String>> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
        System.out.println("---- End of response headers ----");
      } catch (Exception e) {
        System.out.println("Error: Unable to parse response headers (" + url + ")");
        return "";
      }
      return "";
    }
    try {
      return MimeTypes.getDefaultMimeTypes().forName(mimeType).getExtension().substring(1);
    } catch (MimeTypeException e) {
      System.out.println("Error: Unable to determine appropriate extension from MimeType " + mimeType + " (" + url + ")");
      return "";
    }
  }

  /**
   * Static method used to process the image at the parameterized URL, retrieve its dimensions,
   * and resize the image if the height of the image exceeds 60 pixels. If the height is above
   * the max height, creates new BufferedImage file and uses Graphics2D class to redraw the
   * graphics from oversized logo onto new, smaller "canvas" file. Then, new file is output into
   * commons-logos with the proper name. If not oversized, simply outputs logo.
   * @param logoUrl the URL that contains the company's logo image file
   * @param company the name of the company whose logo is to be processed
   */
  private static String resizeImage(URL logoUrl, String company) {
    //Using the ImageIO and URL classes, reads in the image at the given URL
    BufferedImage logo;

    try {
      URLConnection conn = logoUrl.openConnection();
      // avoid 403's by setting the user agent request header
      conn.setRequestProperty("User-Agent", USER_AGENT);
      logo = ImageIO.read(conn.getInputStream());
    } catch (IOException e) {
      System.out.println("Error: Unable to read the image at the specified URL (" + logoUrl + ") - " + company);
      System.out.println(e);
      return null;
    }

    //Initializes dimensional variables for input logo image and whether image was resized
    int height = logo.getHeight();
    int width = logo.getWidth();
    // produce only RGB and ARGB image types (not indexed, or other types
    // that could lose the background transparency)
    int type = (logo.getTransparency() == Transparency.OPAQUE) ? BufferedImage.TYPE_INT_RGB : BufferedImage.TYPE_INT_ARGB;

    BufferedImage outputLogo;
    Image scaledImage;
    //Calculates scale-down ratio
    float conversionRatio = MAX_HEIGHT / (float) height;

    /*
     * Re-assigns width and height variables to properly scale logo dimensions and draws logo
     * image onto newly resized "blank canvas" IF height exceeds maximum height
     */
    if (height > MAX_HEIGHT) {
      width = (int) (width * conversionRatio);
      height = (int) (height * conversionRatio);

      scaledImage = logo.getScaledInstance(width, height, Image.SCALE_SMOOTH);

      outputLogo = new BufferedImage(width, height, type);
      Graphics2D imageDrawer = outputLogo.createGraphics();
      imageDrawer.addRenderingHints(
        new RenderingHints(
          RenderingHints.KEY_RENDERING,
          RenderingHints.VALUE_RENDER_QUALITY));
      imageDrawer.drawImage(scaledImage, 0, 0, null);
      imageDrawer.dispose();

      return saveImage(outputLogo, logoUrl, company);
    } else {
      return saveImage(logo, logoUrl, company);
    }
  }

  private static String saveImage(BufferedImage image, URL url, String company) {
    String filePath = COMMONS_PATH + "/src/content/participants/";
    String fileName = company.toLowerCase().replaceAll("\\s","") + "." + getExtension(url);
    File imageFile = new File(filePath + fileName);

    try {
      if (image == null) {
        // avoid 403's by setting the user agent request header
        URLConnection conn = url.openConnection();
        conn.setRequestProperty("User-Agent", USER_AGENT);
        FileUtils.copyInputStreamToFile(conn.getInputStream(), imageFile);
      } else {
        ImageIO.write(image, getExtension(url), imageFile);
      }
      return fileName;
    } catch (IOException e) {
      System.out.println("Error: Unable to write image for " + url + " to " + filePath + fileName);
      System.out.println(e);
      return null;
    }
  }
}
