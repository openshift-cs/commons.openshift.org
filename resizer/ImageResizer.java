import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;
import java.util.regex.*;

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

  /** String located in GitHub issues for any piece of information*/
  private static final String ISSUE_SKIP_FLAG = " TBD";

  /** Maximum pixel width for uploaded company logo */
  private static final float MAX_HEIGHT = 60;

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

  /**
   * Discretionary number of milliseconds the copyURLToFile method will run until timeout, 10 seconds
   */
  private static final int TIMEOUT_MILLIS = 10000;

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

    /*
     * Following lines declare/initialize variables necessary for properly parsing
     * text input and extracting company name, url, and logo url
     */
    String line;
    String bodyLine;
    String ymlLine;
    boolean addIssue;
    String company;
    String business_url;
    String link;
    String fileName;
    URL logo_url;
    int companies_parsed = 0;

    //Establishes the BufferedWriter needed to append text to 'participants.yml'
    BufferedWriter out = null;
    File f = new File(COMMONS_PATH + "/data/participants.yml");
    try {
      out = new BufferedWriter(new FileWriter(f, true));
    } catch (IOException e) {
      System.out.println("Error: Could not write to `" + COMMONS_PATH + "/data/participants.yml`");
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

          if (company != null && business_url != null && link != null && !bodyLine.contains(ISSUE_SKIP_FLAG)) {

            try {
              logo_url = new URL(link);
            } catch (MalformedURLException e) {
              System.out.println("Error: Invalid URL (" + link + ") - " + company);
              continue;
            }

            Scanner participantsReader = new Scanner(new File(COMMONS_PATH + "/data/participants.yml"));

            addIssue = true;
            //Checks for duplicate and checks to see if any field is "TBD"
            while (participantsReader.hasNextLine()) {
              ymlLine = participantsReader.nextLine();
              if (ymlLine.contains(company)) {
                addIssue = false;
                break;
              }
            }
            participantsReader.close();

            if (addIssue) {
              //If SVG file, do not resize image
              switch (getExtension(logo_url)) {
                case "svg":
                  fileName = saveImage(null, logo_url, company);
                  break;
                case "":
                  System.out.println("Error: Unsupported URL - " + logo_url + " (" + company + ")");
                  continue issue_loop;
                default:
                  fileName = resizeImage(logo_url, company);
                  break;
              }

              if (fileName != null) {
                //Appends company and information to 'participants.yml'
                out.append("- name: \"" + company + "\"");
                out.newLine();
                out.append("  link: \"" + business_url + "\"");
                out.newLine();
                out.append("  logo: \"commons-logos/" + fileName + "\"");
                out.newLine();
                //Prints to the console which companies were added
                System.out.println(companies_parsed + ". Company \"" + company + "\" added.");
              }
            } else {
              System.out.println(companies_parsed + ". Company \"" + company + "\" NOT added because it's a duplicate.");
            }
          } else {
            System.out.println(companies_parsed + ". Company \"" + company + "\" NOT added because of missing data (url: " + business_url + "; logo: " + link + ")");
          }
        }
      }
    }

    /*
     * Empty print line for console clarity, closes the inputReader, prints short message
     * if no new participants were appended to 'participants.yml', and closes the
     * BufferedWriter
     */
    inputReader.close();
    System.out.println();
    System.out.println(companies_parsed + " companies have been processed.");
    out.close();
  }

  /**
   * Static method simply responsible for determining the file extension of the picture file
   * going to be used as the company's logo on the website
   * @param url the url object of the image file whose extension is to be retrieved
   * @return the file extension of the image at the URL
   */
  private static String getExtension(URL url) {
    String mimeType = null;
    try {
      mimeType = url.openConnection().getContentType();
    } catch (IOException e) {
      System.out.println("Error: Unable to read the image at the specified URL (" + url + ")");
      return "";
    }
    if (!mimeType.startsWith("image")) {
      System.out.println("Error: MimeType of " + mimeType + " does not match expected 'image/*' MimeType");
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
      logo = ImageIO.read(logoUrl);
    } catch (IOException e) {
      System.out.println("Error: Unable to read the image at the specified URL (" + logoUrl + ") - " + company);
      return null;
    }

    //Initializes dimensional variables for input logo image and whether image was resized
    int height = logo.getHeight();
    int width = logo.getWidth();
    int type = logo.getType();
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


      outputLogo = new BufferedImage(width, height, type == 0 ? BufferedImage.TYPE_INT_ARGB : type);
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
    String filePath = COMMONS_PATH + "/source/img/commons-logos/";
    String fileName = company.toLowerCase().replaceAll("\\s","") + "." + getExtension(url);
    File imageFile = new File(filePath + fileName);

    try {
      if (image == null) {
        FileUtils.copyURLToFile(url, imageFile, TIMEOUT_MILLIS, TIMEOUT_MILLIS);
      } else {
        ImageIO.write(image, getExtension(url), imageFile);
      }
      return fileName;
    } catch (IOException e) {
      System.out.println("Error: Unable to write image for " + url + " to " + filePath + fileName);
      return null;
    }
  }
}
