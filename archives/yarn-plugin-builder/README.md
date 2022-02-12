# @liuli-util/yarn-plugin-builder

## Use

1. install `@liuli-util/yarn-plugin-builder` 2.
2. replace the `builder` command in the script with `yarn-plugin-builder`

## FAQ

### Motivation

@yarnpkg/builder is the official tool for packaging yarn plugins, but it has two annoying problems

1. slow performance based on webpack (v3 is using esbuild to improve this)
2. it doesn't respect the project's own organization name and gets forcibly moved to the _@yarnpkg/_ organization

So I created this cli to fix both of these issues.
