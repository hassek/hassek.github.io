---
layout: default
title: "zsh history tweaking"
date: 2017-08-08 12:00:00
category: shell
tags: [zsh,history]
---

One of the things I love about tools like `zsh`, `tmux` and `vim` is the amount of configuration that can be set on them to suit your needs. Today I spend some time to enhance my history configuration in `zsh` and it has paid off.

Let's start with how much I want to save:

```cfg
HISTSIZE=1000000       # Set the amount of lines you want saved
SAVEHIST=1000000       # This is required to actually save them, needs to match with HISTSIZE
HISTFILE=~/.zhistory   # Save them on this file
```

This is a very big history file, be sure it matches your computer capabilities since all of it is saved in memory.

At first this was fine but I notice a few things:

* My history was not set into the file until I closed the _zsh_ shell.
* There was a big amount of duplicate commands.

To fix this I added these variables:

```cfg
setopt EXTENDED_HISTORY          # Write the history file in the ":start:elapsed;command" format.
setopt INC_APPEND_HISTORY        # Write to the history file immediately, not when the shell exits.
setopt SHARE_HISTORY             # Share history between all sessions.
setopt HIST_EXPIRE_DUPS_FIRST    # Expire duplicate entries first when trimming history.
setopt HIST_IGNORE_DUPS          # Don\'t record an entry that was just recorded again.
setopt HIST_IGNORE_ALL_DUPS      # Delete old recorded entry if new entry is a duplicate.
setopt HIST_FIND_NO_DUPS         # Do not display a line previously found.
setopt HIST_IGNORE_SPACE         # Don\'t record an entry starting with a space.
setopt HIST_SAVE_NO_DUPS         # Don\'t write duplicate entries in the history file.
setopt HIST_REDUCE_BLANKS        # Remove superfluous blanks before recording entry.
```

All of these options should be saved in your `~/.zshrc` file for them to work.

Finally I wanted to comment about plugins that do a lot for you, like the famous [oh-my-zsh](http://ohmyz.sh/), because they have so much setup already, you will probably end up using a very small set of it, I personally prefer the approach of *I have a problem, let's search/build a fix* on which you have time to learn and understand what suits you best.
