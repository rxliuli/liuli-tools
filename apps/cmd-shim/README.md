# @liuli-util/cmd-shim

## Introduction

A cli that links the monorepo cli module to the global cli.

## Use

```sh
npm i -g @liuli-util/cmd-shim
cd <module>
cmd-shim
```

## Motivation

Why not use npm/yarn links?

Mainly because in monorepo, one module may depend on another private module, and using `npm link` would cause an error because the private module could not be found. network/members) project.
