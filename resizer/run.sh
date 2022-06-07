#!/bin/bash
cd $COMMONS_PATH/resizer
javac -cp \* ImageResizer.java
curl -s -H "Authorization: token $GIT_TOKEN" https://api.github.com/repos/openshift-cs/commons.openshift.org/issues \
  | java -cp .:\* ImageResizer
