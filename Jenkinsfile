#!/usr/bin/env groovy

pipeline {
  agent any

  options {
    skipDefaultCheckout true
  }

  environment {
    APP_NAME = "commons-${env.BRANCH_NAME.toLowerCase().replaceAll(~/[^a-z0-9-]/, '')}"
  }

  stages {
    stage('Checkout Source') {
      // Only checkout source on PRs
      when {
        changeRequest()
        beforeAgent true
      }
      steps {
        checkout scm
      }
    }
    stage('Build PR for Staging') {
      // Only perform a deployment for Pull Requests
      when {
        changeRequest()
        beforeAgent true
      }
      steps {
        sh "printenv | sort "
      }
    }
    stage('Teardown Staged PR') {
      // Only perform a teardown once a PR has been merged
      when {
        not { changeRequest() }
        //beforeAgent true
      }
      steps {
        sh "printenv | sort"
      }
    }



    /*stage('test') {
      steps {
        sh "echo Yo, starting here"
        sh "echo ${openshiftVerifyDeployment(depCfg: "${env.APP_NAME}", verifyReplicaCount: "true")}"
        sh "echo Done, ending here"
      }
    }
    stage('Deploy Template') {
      when {
        expression {
          openshiftVerifyDeployment(depCfg: "${env.APP_NAME}", verifyReplicaCount: "true")
        }
      }
      steps {
        sh "oc process -f openshift/templates/commons.yaml -p NAME='${env.APP_NAME}' | oc create -f -"
      }
    }

    stage('Build Project') {
      steps {
        sh "oc start-build stg1-${env.APP_NAME} --from-repo=."
      }
    }*/
  }
}
