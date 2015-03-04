Commons Website
===============

The Awestruct system that is used to build commons.openshift.org


Adding New Companies and their logos
====================================

1. Get logo from participant, preferably a png with 0 alpha channel (Transparent Background) or a svg. If the logo doesn't come with a transparent background, please open it in Gimp (or photoshop) to remove the background. There are plenty of tutorials out there that will show you how to do this if you don't alreday know how. 

2. Place the image in the `/img/commons-logos/` directory. 

3. Open the file `/img/participants.txt` 

4. The participants are sorted alphabetically by company name and the next thing you'll need to find the line where you want to append the new participant. 

5. The order in which you put the participant name, url, and path to image is very important as well as the commas that seperate them. So be sure to use the following order `<participants name>,<participants url>,commons-logos/<logo filename>`.

6. Save your changes.

7. run `rake clean preview` on your local machine and navigate to `http://localhost:4242` and check to see if the participant is displayed and showing correctly. 

8. Once that's done, add-commit-push your changes and once the site is rebuilt (which is nightly) the new participant will be public