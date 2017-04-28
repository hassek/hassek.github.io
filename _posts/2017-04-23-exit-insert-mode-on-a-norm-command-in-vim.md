---
layout: default
title: Exit insert mode on a `norm!` command in vim
date: 2017-04-23 12:30:00
category: vim
tags: [command]
---
When you want to do some format changes in _vim_ via the `norm!` command, instead of doing them in 2 different commands, you can actually exit insert mode inside `norm!` by doing `Ctrl-V` and then `<ESC>`.

Let's say I want to get all these emails into a list so I can do a query with them
```
pewpew.lazor@gmail.com
null.personality@outlook.com
your.grandpa@aol.com
angry.at.life@hotmail.com
```

The general format is `:[range]g/<pattern>/<cmd>`. By default the range is the whole file.

We can execute this command `:g/^/norm!I"\?A",` to get what we want; let's break it down:

`:g` This specifies that we want to execute a command.

`/^/` Match all lines (since all lines do have a beginning of line).

`norm!` Means we will execute a _normal!_ Command, which means _vim_ will run things you would do to edit a file and execute them on matched lines.

`I"\?A",` `I` means go to the beginning of the line in _insert mode_ and insert the `"` character, then comes the `Ctrl-V` + `<ESC>` that looks like `\?` to exit _insert
mode_, `A` goes to the end of the line and enters _insert mode_ and finally add `",` characters.

Now the file would be like this:

```
"pewpew.lazor@gmail.com",
"null.personality@outlook.com",
"your.grandpa@aol.com",
"angry.at.life@hotmail.com",
```

To finish, just run `J` on all lines and add the brackets at the
beginning and end of the line and you are ready to do that query!

```
("pewpew.lazor@gmail.com", "null.personality@outlook.com", "your.grandpa@aol.com", "angry.at.life@hotmail.com",)
```
