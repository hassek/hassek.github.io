---
layout: default
title: Github prune merged branches
date: 2017-07-26 12:00:45
category: git
tags: [github,gitconfig]
---

When working on bigger teams with multiple branches is very common that old branches stay created. To detect those branches easily git comes with the command:

```shell
git fetch -p
git branch --merged

* master
the-everlasting-story
that-guy-that-never-deletes-the-branch
```

Be sure to update your local branches! That's why we are running `git fetch -p` first.

You can also run the same command for branches on the git server

```shell
git branch -r --merged

origin/HEAD --> master
origin/the-everlasting-story
origin/that-guy-that-never-deletes-the-branch
```

Since we know which branches are already merged, we can prune them up easily. For this I created two script to automatically do this:

```shell
git branch --merged | grep -v "master" | parallel -I{} git branch -d {}
git branch -r --merged | grep -v "master" | sed -e "s/origin\\///" \
    | parallel -I{} git push origin :{}
```

Let's break the second one up:

* `git branch -r --merged` will list all the merged branches on the git server
* `grep -v "master"` will remove the master branch from the list, pretty sure we don't want to delete that one.
* `sed -e "s/origin\///"` will remove the `origin/` string from the branches so we can delete them.
* `xargs -I{} git push origin:{}` will delete them on *Github*, if you need to use any other command for your git server, change it here.
