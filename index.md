## Vim un-match

Sometimes I want to delete lines that doesn't match a particular
pattern, for those you can do a regex

```
/^\(.*WORD\)\@!.*$
```

Breaking it down

`^` means start of the line
`\(.*WORD\)` it's the _atom_ word been searched
`\@!` it's the important command that **negates** the atom word (it's not
exactly a negation, please do a _:help @!_ for more info).
`.*$` everything else until the end of line.

Now I could do this to delete them:

```
:%g/^\(.*WORD\)\@!.*$/norm!dd
```

There are other very interesting use cases for this, for example, you
could match words that are not followed by something else:

```
/foo\(bar\)\@!
```

This will find all cases of _foo_ not followed by _bar_.


## Biggest disk space offenders
When you want to cleanup your server you usually want to find the
biggest offenders in your system, the command line tool `ncdu` is just
the tool for that on Linux!

For mac the `storage management` tool is amazing also.


## Delete *up to* a character in vim
By using `dt<char>` you can delete up to a character in vim.
So

```
I am here to Stay!
```
by using `dtS` since the start of the line will end up in

```
Stay!
```

## Show alias definition
if you write the command `alias` it will print all the aliases definitions on your __.bashrc__ or __.zshrc__ file

## IPython use previous command

By using the `_` you can use the previous command!

![image](https://cloud.githubusercontent.com/assets/778410/22393578/5f62353e-e4df-11e6-8462-95c23ef5fed6.png)

## IPython immediate execution

When I use IPython sometimes I want to just press enter and execute my code instead of creating a new line. To do that I can simply do `Alt-<Enter>` instead.

![ipython_goodies](https://cloud.githubusercontent.com/assets/778410/22355060/bfc21fde-e3fe-11e6-93fe-c1baf7fd9942.gif)
