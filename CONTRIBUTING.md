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

Place the company's logo image in this directory. Edit `participants.yml` and add the new participant.

Example entry:

```
- name: 'Red Hat'
  link: 'https://cloud.redhat.com'
  logo: 'red-hat-logo.svg'
```

Displays as:

![Red Hat entry on participants page](img/participant.png)

The fields are:

- **name** — the participant name.
- **link** — URL to the participant.
- **logo** — image file name. Note: SVG is the preferred format.

### Operators

The operators (displayed on [Community-created Operators](https://commons.openshift.org/sigs/operators/) are in the `src/content/operators` directory.

Place the company's logo image in this directory. Edit `operators.yml` and add the new operator.

Example entry:

```
- title: 'Syndesis'
  link: 'https://syndesis.io/'
  src_link: 'https://github.com/syndesisio/syndesis/tree/master/install/operator'
  logo: 'syndesis.png'
  description: 'The Syndesis Infrastructure Operator for installing and updating Syndesis.'
```

Displays as:

![Syndesis entry on operators page](img/operator.png)

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
- speaker_id: 'jane-doe'
  name: 'Jane Doe'
  role: 'Everyday Ninja'
  url: 'https://doesystems.com/jane/'
  company: 'Doe Systems'
  photo: 'janedoe.jpg'
  intro: 'Jane is...'
```

Displays as:

![Example speaker](img/speaker.png)

The fields are:

- **speaker_id** — a unique ID for this speaker. It will be referenced from a gathering file.
- **name** — The speaker's name.
- **role** — Role or job title.
- **company** — Company name (optional).
- **url** — URL to company or speaker information page (optional).
- **photo** — image file name (optional).
- **intro** — a short introduction to the speaker (optional).

### Sponsors

Sponsor information is referenced from the gatherings file. It first looks for a sponsor in the participants directory, then in `src/content/sponsors` directory.

To add a sponsor (who is not a participant), place the sponsor's logo image in this directory. Edit `sponsors.yml` and add the new sponsor.

Example entry:

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

For example, to have the file `MyPresentation.pdf` available at https://commons.openshift.org/gatherings/slides/MyPresentation.pdf place the file in the `static/gatherings/slides` directory.

Note: for best results, do not use spaces in files names and limit punctuation to period, hyphen, or underscore (. - \_).

### Gatherings

Gatherings information is located under the `src/content/gatherings` directory. Each gathering is in a separate subdirectory. The name of the subdirectory will become the of the URL.

For example, to create a gathering for Chicago on April 18, 2023, create the directory `chicago-23-apr-18`. In that directory create the file `index.mdx`. This file will contain YAML frontmatter with all of the information. The URL for this gathering would be `https://commons.openshift.org/gatherings/chicago-23-apr-18`.

Since this file contains many fields, the information will be presented a section at a time.

#### Basic information

Example:

```
---
title: Chicago Meeting
description: Come join us in Chicago at Wrigley Field.
date: '2023-04-18'
time: '2:30–6 p.m. CDT'
location: Wrigley Field
---
```

Displays on the gatherings summary page as:

![Gathering summary](img/gathering-summary.png)

and at the top of the gathering page as:

![Gathering title area](img/gathering-top.png)

The fields are:

- **title** — title of the gathering.
- **description** — description that displays in the summary (optional).
- **date** — date in YYYY-MM-DD format.
- **time** — time of the gathering

#### Language specification

The `language` field is used to format the date according to a particular language.

Examples:

```
language: 'en-US'
```

Displays as:

![Date in US English](img/en-US.png)

```
language: 'en-UK'
```

Displays as:

![Date in UK English](img/en-UK.png)

```
language: 'pt-BR'
```

Displays as:

![Date in Brazilian Portuguese](img/pt-BR.png)

The filed is:

- **language** — the language used to format the date. Must be a standard [HTML language specifier](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang). Defaults to `en-US` (optional).

#### Introduction

Introduction section example:

```
head_text: >-
  Come join us for a baseball outing and a day of fun.
registration_text: Sign-up now
registration_URL: 'https://example.com/'
registration_text2: Buy tickets
registration_URL2: 'https://example.com/'
registration_text3: Reserve hotel
registration_URL3: 'https://example.com/'
sponsoring_text: You, too, can sponsor this
sponsoring_URL: 'mailto:someone@example.com'
```

Displays as:

![Introduction section for a gathering](img/intro.png)

The fields are:

- **head_text** — the intro text for the gathering (optional). If not specified, displays as: `Where users, partners, customers, contributors and upstream project leads come together to collaborate and work together across the OpenShift Cloud Native ecosystem.`
- **registration_text** — text for the registration button.
- **registration_URL** — link for the registration button.
- **registration_text2** — text for the second registration button (optional).
- **registration_URL2** — link for the second registration button (optional).
- **registration_text3** — text for the third registration button (optional).
- **registration_URL3** — link for the third registration button (optional).
- **sponsoring_text** — text for the sponsoring button (optional). If `sponsoring_URL` is specified but no text, the default is `Apply to be a Sponsor`.
- **sponsoring_URL** — link for the sponsoring button.

#### Event overview

Event overview section example:

```
lead_text: Come with us and watch Cubs baseball
info_text: >-
  Have you always wanted to see a game at Wrigley Field? Now is your chance.
invite_link: 'https://example.com/'
venue: Wrigley Field
venue_URL: 'https://www.mlb.com/cubs/ballpark'
price: $29.95 until Dec. 1, $39.95 after
event_footer_text: Be sure to dress appropriately for the weather.
```

Displays as:

![Event overview section](img/overview.png)

The fields are:

- **lead_text** — lede text of the overview.
- **info_text** — information paragraph.
- **invite_link** — invite a friend link (optional).
- **venue** — venue name.
- **venue_URL** — link to venue (optional).
- **price** — price information.
- **event_footer** — overview footer paragraph.

#### Sponsors

Sponsor section example:

```
sponsors:
  - name: Red Hat
    level: 1
    label: Platinum Sponsor
  - name: IBM
    level: 2
  - name: Github
    level: 2
    label: Gold Sponsors
```

Displays as:

![Sponsors section](img/sponsors.png)

Sponsor section without levels example:

```
sponsors:
  - name: Red Hat
  - name: IBM
  - name: Github
```

Displays as:

![Sponsors section](img/sponsors2.png)

The fields are:

- **sponsors** — the section label (section is optional).
- **name** — the name must match either an entry in participants or sponsors.
- **level** — numeric level for the display hierarchy (optional; default is all sponsors display at the same level).
- **label** — title text for sponsor level. Use plural form if there are multiple sponsors in the same group. Only read from the last sponsor at a particular level (optional).

#### Schedule

Schedule section example:

```
schedule_leadin: The times are approximate for this event. You must follow all health protocols.
videos_text: Watch previous gatherings
schedule:
  - local_time: '2:30 p.m.'
    session_name: 'Gates Open'
    track: Parking Lot
  - local_time: '3:00 p.m.'
    session_name: 'Game Starts'
    track: Bleachers
  - local_time: '4:00 p.m.'
    session_name: '7th Inning Stretch'
    speakers:
      - id: 'jane-doe'
    track: Bleachers
```

Displays as:

![Schedule section](img/schedule.png)

The fields are:

- **schedule_leadin** — opening paragraph (optional). The default text is `Code of Conduct: We follow the Code of Conduct of other events such as KubeCon. Similarly we are dedicated to providing a harassment-free experience for participants at all of our events, whether they are held in person or virtually. All event participants, whether they are attending an in-person event or a virtual event, are expected to behave in accordance with professional standards, with both this Code of Conduct as well as their respective employer's policies governing appropriate workplace behavior and applicable laws.`.
- **videos_text**: button text for link to YouTube gatherings playlists (optional). Defaults to `See sessions from previous gatherings`.
- **schedule**: section label (section is optional).
- **local_time**: start time of session.
- **session_name**: — session title.
- **track**: — track name (optional). If no sessions have a track, sessions display without tab interface. Sessions in the same track display in that tab. With most sessions having tracks, an event without one displays on all tracks. This is useful for breaks.
- **speakers** — section label for session speakers (section is optional).
- **id** — ID of a speaker from `src/content/speakers/speakers.yml`.

#### Speakers

If speakers are specified in the schedule and an entry is found in `src/content/speakers/speakers.yml` that matches, they will be displayed.

Displays as:

![Speakers section](img/speakers.png)

#### Venue

Venue section example:

```
venue_address: 1060 W. Addison St.
google_maps_URL: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.413977857587!2d-87.65752674858008!3d41.94844236888554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3b2e59adf21%3A0x1cea3ee176ddd646!2sWrigley%20Field!5e0!3m2!1sen!2sus!4v1654913073280!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
```

Displays as:

The fields are:

![Venue section](img/venue.png)

The fields are:

- **venue_address** — address of the venue (optional).
- **google_maps_URL** — the URL of a Google map to the venue. On Google, select Share, Embed a map, then copy the code (it should start with `<iframe...`) (optional).

Note: the other fields displayed in this section (`date`, `time`, `venue`, `venue_URL`, and `location`) already defined above.

---

Gathering pages summarizing information about a particular event can be generated automatically, based on information provided in the `/data/gatherings.yml` file. Details of the gathering event, sponsors and speakers are separated into three groups, explained below with in-line (comments in brackets). If not stated otherwise, the attribute is required and cannot be omitted for the page generation. However, if there are too many details omitted, the page may look plain; make sure to always check that the page is built to your liking, with the data provided in `gatherings.yml`.

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

## Submitting a pull request

After your changes are done and tested, you are ready to submit a Pull Request.

First, create a local branch on your machine:

```
git checkout -b my-feature-branch
```

Then add, commit, and push your changes:

```
git add files-that-you-modified
git commit -m "short message describing changes"
git push origin my-feature-branch
```

Finally, [submit a Pull Request](https://github.com/openshift/commons.openshift.org/compare).
