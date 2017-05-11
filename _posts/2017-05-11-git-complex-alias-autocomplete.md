---
layout: default
title: Git complex alias autocomplete
date: 2017-05-11 12:00:00
category: git
tags: [autocompletion,config]
---

When setting up aliases on git, most of them are quite simple aliases to
speed up your typing like:

```ini
[alias]
  aa = add --all
  br = branch
  ...
```

With time I wished for automation of things I tend to repeat a lot and
looked at alias functions:

```ini
[alias]
  dt = "!f(){ : git branch ; git pull ; git branch -d $1 ; git push origin :$1 ; }; f"
```

These type of aliases are pretty cool! I can delete a branch locally and on origin right away. The first line with the colon tells git to autocomplete as if I were doing a _git branch_ command.

What I don't like, is how unreadable it becomes when I want to setup a more complex script. For those, automation git scripts are the best, I use my `git-nbr` everyday!

```bash
#!/bin/sh
# Create new branch and setup upstream right away
set -e

git fetch -p
git co -b $1
git push --set-upstream origin $1
```

Just be sure to call it `git-<COMMAND_NAME>` and set it up in your shell path and it will work by calling it as `git <COMMAND_NAME>`.
