# OpenShift Commons

[![Build Status](https://travis-ci.org/openshift/commons.openshift.org.svg?branch=master)](https://travis-ci.org/openshift/commons.openshift.org)

This repo contains the sources for the [OpenShift Commons](https://commons.openshift.org/) website. The site was built using [Gatsby](https://www.gatsbyjs.com/), a React-based framework. The styling was done using [Tailwind CSS](https://tailwindcss.com/), a utility-first CSS framework.

## Contributing

See information on [contributing](CONTRIBUTING.md).

## Environment variables

**`YT_API_KEY`** - A valid YouTube API key is **required** by `fetch_gathering_videos.rb` to create the `/data/gathering_videos.yml` list (referencing YouTube playlists in `/data/gatherings.yml` is mentioned in `CONTRIBUTING.md`). Note that Middleman build would fail, if the `/data/gathering_videos.yml` is not present. If deploying locally, make sure to run the `fetch_gathering_videos.rb` script before Middleman build. When deploying on OpenShift, this is already included in the `.s2i/bin/assemble` script (the `YT_API_KEY` environment variable must be defined in the build configuration, available during the "assemble" phase).

A valid YouTube API key can be obtained per https://developers.google.com/youtube/v3/getting-started
