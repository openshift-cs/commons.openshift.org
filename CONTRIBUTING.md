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

Firstly, open up any the `data/participants.yml`file with any editor:

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
# Choose PNG format, enable "Save backgroung color" and add some compression level
```

Finally, after you've succesfully tested the changes, using our [development guidelines](https://github.com/openshift/commons.openshift.org#development), submit a Pull Request using the guidelines bellow.

## Submiting a Pull Request

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
