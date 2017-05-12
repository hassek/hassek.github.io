---
layout: default
title: Git complex aliases
date: 2017-05-11 12:00:00
category: git
tags: [autocompletion,config]
---

When setting up aliases on git at `~/.gitconfig`, most of them are quite simple to speed up your typing

```
[alias]
  aa = add --all
  br = branch
  ...
```

But with time I wanted to automate repetitive commands and started to build alias functions

```ini
[alias]
  dt = "!f(){ : git branch ; git pull ; git branch -d $1 ; git push origin :$1 ; }; f"
```

These type of aliases are pretty cool! I can delete a branch locally and on origin with just 1 command. The first line with the colon tells git to autocomplete as if I were doing a _git branch_ command, the autocompletion becomes very handy.

What I don't like about these functions is how unreadable they become on more complex functionalities. For those, git scripts are the best, for example, I use my `git-nbr` everyday!

```bash
#!/bin/sh
# Create new branch and setup upstream right away
set -e

git fetch -p
git co -b $1
git push --set-upstream origin $1
```

Just be sure to call it `git-<COMMAND_NAME>` and set it up in your shell path and it will work by calling it as `git <COMMAND_NAME>`.
