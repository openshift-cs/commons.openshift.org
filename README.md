# OpenShift Commons

[![Build Status](https://travis-ci.org/openshift/commons.openshift.org.svg?branch=master)](https://travis-ci.org/openshift/commons.openshift.org)

This repo contains the sources for the [OpenShift Commons](https://commons.openshift.org/).

## Development

Firstly install the necessary packages on your machine:

    bundle install

To develop on your local machine run the middleman server and you
should be able to preview your changes at http://localhost:4567

    bundle exec middleman server

## Deployment

To deploy your changes to http://commons.openshift.org/ you need to have your
ssh key set up with the current Openshift app (or be on osdevelopers), and then execute:

    bundle exec middleman deploy

This makes sure that `middleman build` is also executed and **all the current** changes on the folder will be deployed (including uncommitted ones).


## Environment variables

**`YT_API_KEY`** - A valid YouTube API key is **required** by `fetch_gathering_videos.rb` to create the `/data/gathering_videos.yml` list (referencing YouTube playlists in `/data/gatherings.yml` is mentioned in `CONTRIBUTING.md`). Note that Middleman build would fail, if the `/data/gathering_videos.yml` is not present. If deploying locally, make sure to run the `fetch_gathering_videos.rb` script before Middleman build. When deploying on OpenShift, this is already included in the `.s2i/bin/assemble` script (the `YT_API_KEY` environment variable must be defined in the build configuration, available during the "assemble" phase).
A valid YouTube API key can be obtained per https://developers.google.com/youtube/v3/getting-started