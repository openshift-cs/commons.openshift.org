# OpenShift Commons

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
