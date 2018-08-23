# Contributing

If you wish to contribute to this repository please follow the guidelines below.

## Forking this repository

The first thing you need to do is to [fork this repository](https://github.com/openshift/commons.openshift.org#fork-destination-box) into your own github account.

Then, clone it into your local machine:

```bash
$ git clone git@github.com:your-username/commons.openshift.org
```

And add the `upstream` remote to follow this repository's changes:

```bash
$ git remote add upstream git@github.com:openshift/commons.openshift.org
$ git fetch upstream
```


## Adding partners

Currently the most common task is to add partners' information to the website, i.e., their logo, name, and url. You can check if any there's any logo waiting to be added on this repository's [issues](https://github.com/openshift/commons.openshift.org/issues).
Before you start working on an issue, assign yourself to it.

Firstly, open the `data/participants.yml`file with any editor:

```bash
$ vim data/partipants.yml
```

Then, add the following code for each participant (note that list is alphabetically ordered):

```yml
- name: "Partner name"
  link: "http://link-to-partner.com"
  logo: "commons-logos/partner-name.png"
```

Then, open the logo image file with any image editor, e.g. GIMP, and:

Resize it to a reasonable dimension, default to 120px width and variable height.

```
# Using GIMP
# Image > Scale Image
```

Save it with to the `source/img/commons-logos/ folder, with **compression enabled**

```
# Using GIMP
# File > Export As (Shift + Ctrl + E)
# Choose PNG format, enable "Save background color" and add some compression level
```

Finally, after you've successfully tested the changes, using our [development guidelines](https://github.com/openshift/commons.openshift.org#development), submit a Pull Request using the guidelines bellow.


## Adding Gathering Pages

Gathering pages summarizing information about a particular event can be generated automatically, based on information provided in the `/data/gatherings.yml` file. Details of the gathering event, sponsors and speakers are separated into three groups, explained below with in-line (comments in brackets). If not stated otherwise, the attribute is required and cannot be omitted for the page generation. However, if there are too many details omitted, the page may look plain; make sure to always check that the page is build to your liking, with the data provided in `gatherings.yml`.

**Gatherings**  
Most data about individual event pages is stored here:

```
gatherings:
  - name: "Seattle 2018" (unique; used to build the html page name and the menu link)
    menu: "show" (is not in the site menu, if there's not "show" here)
    language: "English" (optional)
    date: "2018-12-10"
    time: "8:00 am - 5:30 pm"
    location: "Seattle, Washington"
    google_maps_URL: >-
      Start content here
      (optional; alternate for the bottom map. Search for the location in Google Maps; Click "Share"; Select "Embed a map"; Copy/paste the entire HTML, including "<iframe...")
    venue: "Washington Convention Center"
    venue_URL: "" (optional; link to external venue page)
    venue_address: "" (optional; adds lines to venue location on bottom of the page)
    calendar_event_URL: "https://events.org/calendar_link.ical" (optional)
    registration_text: "" (optional; replaces the default "Purchase tickets Now"/"Register Now")
    registration_URL: "https://www.regonline.com/registration/Checkin.aspx?EventID=2246960"
    pricing: (optional; if present, at least one label and price point is expected)
      - label: "Early Bird"
        price: "$99"
      - label: "Standard"
        price: "$149"
        strikethrough: true (optional strikethrough boolean)
    head_text: >- (optional; if present, overrides the header text)
      Where users, partners, customers, contributors and upstream project leads come together to collaborate and work together on OpenShift.
    lead_text: >- (optional; rendered as red intro text)
      The OpenShift Commons Gathering will be co-located in Seattle with CNCF's KubeCon-NA!
    info_text: >-
      The OpenShift Commons Gathering brings together experts (...)
    event_footer_text: >- (optional; this note is displayed below the event summary)
      By being co-located in Seattle with KubeCon (...)
    schedule_leadin: >- (optional: if present, will replace the lead-in text for the schedules)
      The day will have a mix of keynotes, panels, ted-style talks, SIG break-out sessions, plenty of time to 
      network over local craft beers and be continuously fueled by local baristas.
    videos_text: >- (optional; if present, will replace the text for the link to see gatherings videos)
      See session video recordings from previous gatherings
    invite_link: "" (optional; a link to invite a friend)
    sponsors: (optional; sponsors are searched by name in participants.yml and in the sponsor list below)
      - name: "sponsor"
    sponsoring_URL: "foo" (optional; if present renders a button for sponsor registration)
    sponsor_button_text: >- (optional; if present, overrides the sponsor application button text)
      Apply to be a sponsor
    overview_secion: (optional: if present, overrides the specified text)
      where:
      when:
      price:
      alternative_date_month:
      alternative_date_day_of_week:
      invite_a_friend:
    headers: (optional; if present, overrides the text of the specified header)
      overview: ""
      sponsors: ""
      schedule: ""
      speakers: ""
      venue: ""
    schedule: (required; to be chronologically ordered - the template does not re-order)
      - local_time: "8:00 am" (start time of the session)
        session_name: "Registration Opens"
      - local_time: "9:00 am"
        session_name: "Welcome to the Commons: Making Collaboration that Works"
        speakers: (optional; if present at least one speaker id is expected)
          - id: "diane" (a unique id defined in speakers list below)
```

**Speakers**  
Speaker details that are referenced by `id` in the schedule are kept in this form:

```      
speakers:
  - id: "speaker id" (unique)
    name: "John Doe"
    role: "Everyday Ninja"
    company: "Doe Industries" (optional)
    URL: "https://johndoe.org/about-me/" (optional)
    intro: "John is" (optional; displays a pop up on hover with this text)
    photo: "speakers/diane.jpg" (optional)
```

**Sponsors**  
Sponsors are primarily searched in by name in the `/data/participants.yml` list. If the sponsoring company is not yet a Commons participant, they can be defined here, using the same format.

```
sponsors:
  - name: "sponsor" (unique)
    link: "sponsorl_link"
    logo: "sponsor-logos/spensor.png"
```


## Submitting a Pull Request

After you've done your changes and tested them, you're ready to submit a Pull Request.

First, create a local branch on your local machine:

```bash
$ git checkout -b my-feature-branch
```

Then, add, commit, and push your changes:

```bash
$ git add data/participants.yml
$ git add source/img/commons-logos/partner.png
$ git commit -m "docs: add partner-name (closes #123)"
$ git push origin my-feature-branch
```

Finally, submit a [submit a Pull Request](https://github.com/openshift/commons.openshift.org/compare)
