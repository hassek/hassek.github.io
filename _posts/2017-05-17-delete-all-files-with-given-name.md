---
layout: default
title: Apply command to all found files
date: 2017-05-17 21:50:45
category: shell
tags: [bash,zsh]
---

If you want to execute a command on all filtered files, it can
be very easily done with the command `find`.

For example, we could change all our files to have the `yml` extension:

```bash
find . -type f -exec mv '{}' '{}'.yml \;
```

Deleting all files with a given name is extremely easy and useful for project cleanups

```bash
find . -name "<filename>" -delete
```

Or the equivalent

```bash
find . -name "<filename>" -exec rm '{}' \;
```

I find this to be very close to the `xargs` command but simpler.
