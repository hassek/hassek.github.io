---
layout: post
title: git merges - ours or theirs
date: 2018-09-06 19:19 +0200
category: git
tags: [merge,checkout]
---

There are ways to make some merge or rebase decisions simpler with git, get either our changes or their changes.
This is not recommended unless you are really sure, and other times, your file is encrypted and you can't really handle diffs in the file properly for that I like to do this approach:

1. Copy the current un-encrypted file in memory on a new file
2. rebase or merge the wanted branch
3. execute a checkout `git checkout --ours <file>`
4. View the file (un-encrypting it) and issue a diff against the other file
5. Solve the differences

If you are very sure you just want what the other branch have, there are git strategies now `git rebase --strategy-option=theirs` for example.
