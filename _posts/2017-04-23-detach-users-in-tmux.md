---
layout: default
title: Detach users in tmux
date: 2017-04-23 12:35:00
category: shell
tags: [tmux]
---
Sometimes in a server there are many users attached to a _tmux_ session,
because screens can be smaller on their terminal, this tends to happen:

![image](https://cloud.githubusercontent.com/assets/778410/24876017/12581284-1df8-11e7-9dff-7daa9848f741.png)

You can detach users that are making this happen by issuing the command `<PREFIX> D`. It will show you their screen size and you can detach them.

<img width="736" alt="screen size" src="https://cloud.githubusercontent.com/assets/778410/24876081/60bd888c-1df8-11e7-9196-5fffed1d91b5.png">

Or you could be a full fledged ______ and kick everyone out when you are attaching to the session with `tmux a -d`.
