## Repeat every _X_ seconds a query on Postgres shell

Sometimes you want to repeat a query constantly to see updated data, here is a way to do it on the postgresql shell

```
# Execute query
SELECT count(*) FROM table;

# Tell postgres to repeat it every X seconds
\watch 5
```

And that's it!

## Exit insert mode on a `norm!` command in vim

Sometimes you want to do some format changes in vim, instead of doing
them in 2 different commands, you can actually exit insert mode to keep
going by doing `Ctrl-V` and then `<ESC>`.

Let's say I want to get all these emails into a list so I can do a query
with them
```
pewpew.lazor@gmail.com
null.personality@outlook.com
your.grandpa@aol.com
angry.at.life@hotmail.com
```

The general format is `:[range]g/<pattern>/<cmd>`. By default the range is
the whole file.

We can execute this command `:g/^/norm!I"\?A",` to get what we want; let's break it down:

`:g` This specifies that we want to execute a command.

`/^/` Match all lines (since all lines do have a beginning of line).

`norm!` Means we will execute a _normal!_ Command, which means vim will run things you would do to edit a file and execute them on matched lines.

`I"\?A",` `I` means go to the beginning of the line in _insert mode_ and
insert the `"` character, then comes the `Ctrl-V` + `<ESC>` that looks like `\?` to exit _insert
mode_, `A` goes to the end of the line and enters _insert mode_ and
finally add `",` characters.

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

## detach all other users in tmux

Sometimes in a server there are many users attached to a tmux session,
because screens can be smaller on their terminal, this tends to happen:

![image](https://cloud.githubusercontent.com/assets/778410/24876017/12581284-1df8-11e7-9dff-7daa9848f741.png)

You can detach users that are making this happen by issuing the command `<PREFIX> D`. It will show you their screen size and you can detach them.

<img width="736" alt="screen size" src="https://cloud.githubusercontent.com/assets/778410/24876081/60bd888c-1df8-11e7-9196-5fffed1d91b5.png">

Or you could be a full fledged ______ and kick everyone out when you are attaching to the session with `tmux a -d`.

## delete all s3 branches in aws

With _awscli_ you can access your aws account and manage everything from
there. I needed to remove all buckets from S3 so I did this:

```
aws s3 ls | cut -d " " -f 3 | xargs -I{} aws s3 rm s3://{} --dryrun --recursive
```

Let's break it down:

* `aws s3 ls` will show all the bucket names with their creation time (i.e. "2011-10-18 17:48:34 mah_bucket")
* `cut -d " " -f 3` will split the result and get the 3rd column, which is the name
* `xargs -I{} aws s3 rm s3://{} --dryrun --recursive` deletes all the buckets recursively

In this case, notice I added the flag `--dryrun` so we can test it
knowing it will do exactly what we want before executing it.

After deleting all objects in the buckets, let's delete the buckets!

```
aws s3 ls | cut -d " " -f 3 | xargs -I{} aws s3 rb s3://{}
```

Boom! Done!

## Git diff current branch file against another branch on vim fugitive

```
:Gdiff <branch>:%
```
`%` expands to the file name on vim.

## Python list flattening

To flatten a list in a simple way we can use the `operator.concat` and a reduce function.

```python
In [1]: import operator

In [2]: my_list = [[1, 2], [3, 4, 5]]

In [3]: print reduce(operator.concat, my_list)
[1, 2, 3, 4, 5]
```

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
