#!/bin/sh

# set default values
if [ -z "$INPUT_USER" ]; then
  INPUT_USER=$(echo $GITHUB_REPOSITORY | cut -d/ -f1 )
fi

if [ -z "$INPUT_PROJECT" ]; then
  INPUT_PROJECT=$(echo $GITHUB_REPOSITORY | cut -d/ -f2- )
fi

# build args
ARG_USER=""
if [ ! -z "$INPUT_USER" ]; then
  ARG_USER="--user $INPUT_USER"
fi

ARG_PROJECT=""
if [ ! -z "$INPUT_PROJECT" ]; then
  ARG_PROJECT="--project $INPUT_PROJECT"
fi

ARG_RELEASE_BRANCH=""
if [ ! -z "$INPUT_RELEASE_BRANCH" ]; then
  ARG_RELEASE_BRANCH="--release-branch $INPUT_RELEASE_BRANCH"
fi

ARG_OUTPUT=""
if [ ! -z "$INPUT_OUTPUT" ]; then
  ARG_OUTPUT="--output $INPUT_OUTPUT"
fi

ARG_BASE=""
if [ ! -z "$INPUT_BASE" ]; then
  ARG_BASE="--base $INPUT_BASE"
fi

ARG_TOKEN=""
if [ ! -z "$INPUT_TOKEN" ]; then
  ARG_TOKEN="--token $INPUT_TOKEN"
fi

ARG_SINCE_TAG=""
if [ ! -z "$INPUT_SINCE_TAG" ]; then
  ARG_SINCE_TAG="--since-tag $INPUT_SINCE_TAG"
fi

ARG_DUE_TAG=""
if [ ! -z "$INPUT_DUE_TAG" ]; then
  ARG_DUE_TAG="--due-tag $INPUT_DUE_TAG"
fi

ARG_EXCLUDE_TAGS=""
if [ ! -z "$INPUT_EXCLUDE_TAGS" ]; then
  ARG_EXCLUDE_TAGS="--exclude-tags $INPUT_EXCLUDE_TAGS"
fi

ARG_DATE_FORMAT=""
if [ ! -z "$INPUT_DATE_FORMAT" ]; then
  ARG_DATE_FORMAT="--date-format $INPUT_DATE_FORMAT"
fi

ARG_EXCLUDE_LABELS=""
if [ ! -z "$INPUT_EXCLUDE_LABELS" ]; then
  ARG_EXCLUDE_LABELS="--exclude-labels $INPUT_EXCLUDE_LABELS"
fi

ARG_FUTURE_RELEASE=""
if [ ! -z "$INPUT_FUTURE_RELEASE" ]; then
  ARG_FUTURE_RELEASE="--future-release $INPUT_FUTURE_RELEASE"
fi

# build changelog
echo "Running: github_changelog_generator $ARG_USER $ARG_PROJECT $ARG_RELEASE_BRANCH $ARG_BASE $ARG_OUTPUT $ARG_TOKEN $ARG_SINCE_TAG $ARG_DUE_TAG $ARG_EXCLUDE_TAGS $ARG_EXCLUDE_LABELS $ARG_DATE_FORMAT $ARG_FUTURE_RELEASE"
github_changelog_generator $ARG_USER $ARG_PROJECT $ARG_RELEASE_BRANCH $ARG_BASE $ARG_OUTPUT $ARG_TOKEN $ARG_SINCE_TAG $ARG_DUE_TAG $ARG_EXCLUDE_TAGS $ARG_EXCLUDE_LABELS $ARG_DATE_FORMAT $ARG_FUTURE_RELEASE
