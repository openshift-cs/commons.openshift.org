# Contributing

If you wish to contribute to this repository please follow the guidelines below.

## Prerequisites

Your system needs to have the following installed to be able to build this website:

- [Node.js](https://nodejs.org/)
- [git](https://git-scm.com/)
- [yarn](https://www.npmjs.com/package/yarn)
- [gatsby-cli](https://www.npmjs.com/package/gatsby-cli)
- [ruby](https://www.ruby-lang.org/en/) (only if you need to update the YouTube video list)

## Cloning the repository

1. [Fork this repository](https://github.com/openshift/commons.openshift.org/fork) into your own GitHub account.
1. Clone the site to your local machine:
   `git clone git@github.com:your-username/commons.openshift.org.git`.
1. Add the upstream remote to follow this repository's changes:
   `git remote add upstream git@github.com:openshift/commons.openshift.org.git`
   `git fetch upstream`

## Building the site locally

1. Run `yarn` to install all of the required packages.
1. Run `yarn run dev` to build and run a development server.

If the site builds successfully, you can access it at [http://localhost:8000](http://localhost:8000).

To clear cache files, run `gatsby clean`. This is sometimes needed to ensure a clean build.

## Updating the site

### Participants

#### Automatic method

Currently the most common task is to add members' information to the website, i.e.,
their logo, name, and URL. You can check if any there's any logo waiting to be added
on this repository's [issues](https://github.com/openshift-cs/commons.openshift.org/issues).

A script in the repository automates the addition of partners to OpenShift Commons. To use the script to add a partner, add an Issue where the body is in the following format:

```
Company: Company name
URL: URL of company's website
Logo: URL of the company's logo (.svg, .jpg, .png, etc. with SVG the preferred format)
```

Capitalization of the fields does not matter, however each need to be on different lines, spelled correctly, and be followed with `:`. A "TBD" can act as a placeholder for any of the three fields. The program will simply skip the issue entirely until the TBD is revised.

#### Manual method

The participants (displayed on [OpenShift Commons Participants](https://commons.openshift.org/participants/) are in the `src/content/participants` directory.

Place the company's logo image in this directory. Edit `participants.yml` and add the new participant. Example entry:

```
- name: 'Red Hat'
  link: 'https://cloud.redhat.com'
  logo: 'red-hat-logo.svg'
```

The fields are:

- **name** — the participant name.
- **link** — URL to the participant.
- **logo** — image file name. Note: SVG is the preferred format.

### Operators

The operators (displayed on [Community-created Operators](https://commons.openshift.org/sigs/operators/) are in the `src/content/operators` directory.

Place the company's logo image in this directory. Edit `operators.yml` and add the new operator. Example entry:

```
- title: 'Syndesis'
  link: 'https://syndesis.io/'
  src_link: 'https://github.com/syndesisio/syndesis/tree/master/install/operator'
  logo: 'syndesis.png'
  description: 'The Syndesis Infrastructure Operator for installing and updating Syndesis.'
```

The fields are:

- **title** — the operator title.
- **link** — URL to the operator information page.
- **src_link** — URL to the operator source code. If not available, use your best judgement. Worst case, use the same URL as **link**.
- **logo** — image file name. Note: SVG is the preferred format.
- **description** — A short description of the operator.

### Speakers

Speaker details are referenced by `id` in the schedule section of a gathering file. The speakers are in the `src/content/speakers` directory.

Place the speakers image in this directory (optional). Edit `speakers.yml` and add the new speaker.

**N.B.: the `id` of a speaker in a gathering file must match the `speaker_id` in this file for the information to be found.**

Example entry:

```
- speaker_id: 'speaker_id'
  name: 'Jane Doe'
  role: 'Everyday Ninja'
  URL: 'https://doesystems.com/jane/'
  company: 'Doe Systems'
  photo: 'janedoe.jpg'
  intro: 'Jane is...'
```

The fields are:

- **speaker_id** — a unique ID for this speaker. It will be referenced from a gathering file.
- **name** — The speaker's name.
- **role** — Role or job title.
- **company** — Company name (optional).
- **URL** — URL to company or speaker information page (optional).
- **photo** — image file name (optional).
- **intro** — a short introduction to the speaker (optional).

### Sponsors

Sponsor information is referenced from the gatherings file. It first looks for a sponsor in the participants directory, then in `src/content/sponsors` directory.

To add a sponsor (who is not a participant), place the sponsor's logo image in this directory. Edit `sponsors.yml` and add the new sponsor. Example entry:

```
- name: 'Red Hat'
  link: 'https://cloud.redhat.com'
  logo: 'red-hat-logo.svg'
```

The fields are:

- **name** — the sponsor name.
- **link** — URL to the sponsor.
- **logo** — image file name. Note: SVG is the preferred format.

### Static files

Images or presentation files that are to be on the website but not processed by Gatsby need to be placed under the `static` directory.

For example, to have the file `RedHat-Talk-Saenko-Jan2021.pdf` available at [https://commons.openshift.org/gatherings/slides/RedHat-Talk-Saenko-Jan2021.pdf](https://commons.openshift.org/gatherings/slides/RedHat-Talk-Saenko-Jan2021.pdf) place the file in the `static/gatherings/slides` directory.

## Adding Gathering Pages and Videos

Gathering pages summarizing information about a particular event can be generated automatically, based on information provided in the `/data/gatherings.yml` file. Details of the gathering event, sponsors and speakers are separated into three groups, explained below with in-line (comments in brackets). If not stated otherwise, the attribute is required and cannot be omitted for the page generation. However, if there are too many details omitted, the page may look plain; make sure to always check that the page is built to your liking, with the data provided in `gatherings.yml`.

**Gatherings**  
Most data about individual event pages is stored here:

```
gatherings:
  - name: "Seattle 2018" (unique; used to build the html page name and the menu link)
    menu: "show" (is not in the site menu, if "show" is not here or the build date of this site is in future
                 compared with the event date below; if this item is absent, a landing page is not built -
                 this allows creating simple name/date/youtube_playlist_id records for past events with
                 exising YouTube playlists)
    language: "English" (optional)
    date: "2018-12-10" (once this is detected to be in past, compared with user's local time, obsolete page sections
                       are "disabled" and a notice is displayed)
    time: "8:00 am - 5:30 pm"
    youtube_playlist_id: "PLaR6Rq6Z4IqcrUvqDVPe5DxNvJp5s8UXC" (optional; an ID of a YouTube video playlist with
                          talks' recordings to be published on the Gatherings -> Videos page; also used to link the
                          playlist directly on the event page, once the event is over)
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
        level: 1 (optional; this can be omitted if all sponsors are to be rendered in the same group, defines group display order)
        label: "Main Sponsor" (optional; sponsor group label; use plural form, if there are multiple sponsors in the same group)
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
    schedule: (required; reordered according to local time)
      - local_time: "8:00 am" (start time of the session; this string is parsed in attempt to order by time)
        session_name: "Registration Opens"
      - local_time: "9:00 am"
        session_name: "Welcome to the Commons: Making Collaboration that Works"
        track: "OpenShift" (optional name of track, used for grouping sessions in tabs)
        speakers: (optional; if present at least one speaker id is expected)
          - id: "diane" (a unique id defined in speakers list below)
    workshops: (optional section; shown as individual schedule tabs)
    - start_time: "1:30 pm" (required)
      end_time: "6:00 pm" (required)
      room: "1" (requried)
      title: "Quay Workshop" (required)
      registration_URL: "https://www.redhat.com/" (optional registration button)
      description: >- (reqruied; multi line text expected; single empty line = line break, double empty line = new paragraph)
        You're gona lear a ton during this workshop.
      speakers: (optional; referecned by id's, same as in the schedule section)
        - id: "august_simonelli"
```

As mentioned in the comment above, this section is also used to reference **YouTube playlists** from past Gatherings. See the `youtube_playlist_id` key description above. The videos are taken from the playlists with relevant details such as video order in the list, video thumbnail, video name and video description; if you need to edit any of these, it should be done in the YouTube playlist itself. When there are any changes made on youTube to a playlist that is already published, the changes will be in effect after the Commons site is re-deployed, as the videos are fetched on build time. Please contact repository maintainers, if you don't feel like waiting for the next site re-build and would like to have the changes deployed as soon as possible.

If a whole landing page does not need to be built for an older gathering, a simple record, such as the following one, would result in publishing videos only from the given YouTube playlist on [the Gatherings Videos page](https://commons.openshift.org/videos.html):

```
gatherings:
  - name: "Austin 2017"
    date: "2017-12-05"
    youtube_playlist_id: "PLaR6Rq6Z4Iqe9xnafdhWdSgD-3qsWTm6K"
```

**Schedule tracks and Workshops**
Specifying a `track` for any session indicates that a multi-track schedule is expected. The tracks will be rendered as individual
tabs of the schedule. If there are tracks defined for some sessions, but some of the sessions do not have the track specified, it
is assumed that such a session belongs into all tracks (that can be used for even reception, registration, coffee breaks, etc.). The
order of individual track tabs is based on order of occurence when the track appears in the schedule for the first time, in the `gatherings.yml`,
irrelevant of the actual time of that session (sessions themselves are ordered chronologically in the rendered schedule though).
The workshops defined under the `workshops` section render as individual tabs right after tracks in the schedule area. The order of
workshop tabs is based on the order of appearance of those workshops in the `gatherings.yml` file.

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
Sponsors are primarily searched by name in the `/data/participants.yml` list. If the sponsoring company is not yet a Commons participant, they can be defined here, using the same format.

```
sponsors:
  - name: "sponsor" (unique)
    link: "sponsorl_link"
    logo: "sponsor-logos/sponsor.png"
```

## Submitting a pull request

After your changes are done and tested, you are ready to submit a Pull Request.

First, create a local branch on your local machine:

```
git checkout -b my-feature-branch
```

Then add, commit, and push your changes:

```
git add files-that-you-modified
git commit -m "short message describing changes"
git push origin my-feature-branch
```

Finally, [submit a Pull Request](https://github.com/openshift/commons.openshift.org/compare)
