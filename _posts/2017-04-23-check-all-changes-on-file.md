---
layout: default
title: Check all changes on a file
date: 2017-04-23 13:15:00
category: git
tags: [fugitive,unimpaired]
---
If you want to look for a specific change in an area of a file you are working on or even the whole file,
 This can be done with fugitive, a _vim_ plugin for git, which makes it extremely useful.

To do this you need to use the `Glog` command, it will search for all changes on the file and set it up in your _quickfix_ list.

![fugitive_glog](https://cloud.githubusercontent.com/assets/778410/25282592/f5681798-267e-11e7-8105-100e1afe84e6.gif)

To move from change to change, the plugin `unimpaired.vim` adds some default key binds that are very useful

unimpaired|vim|action
--- | --- | ---
[q|:cprev|Jump to previous quickfix item
]q|:cnext|Jump to next quickfix item
[Q|:cfirst|Jump to first quickfix item
]Q|:clast|Jump to last quickfix item

For more information look [here](http://vimcasts.org/episodes/fugitive-vim-exploring-the-history-of-a-git-repository/)
