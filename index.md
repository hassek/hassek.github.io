## Signing your data for secure sharing with gpg2

The first step would be to create your secret/public key, to do this
just run `gpg2` and start answering all the questions.

```bash
$ gpg2 --gen-key
gpg (GnuPG/MacGPG2) 2.0.30; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection?
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 2y
Key expires at Sat Apr 20 17:12:01 2019 -04
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: Tomas Henriquez
Email address: xxxxx@xx.com
Comment: gpg2 remember
You selected this USER-ID:
    "Tomas Henriquez (gpg2 remember) <xxxx@xx.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
You need a Passphrase to protect your secret key.

We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key C1F666CC marked as ultimately trusted
public and secret key created and signed.

gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   3  signed:   1  trust: 0-, 0q, 0n, 0m, 0f, 3u
gpg: depth: 1  valid:   1  signed:   0  trust: 0-, 0q, 0n, 0m, 1f, 0u
gpg: next trustdb check due at 2019-04-20
pub   4096R/C1F666CC 2017-04-20 [expires: 2019-04-20]
      Key fingerprint = 72A6 BE3E 6D6B 927F 82F1  02E2 3D2D 1039 C1F6 66CC
uid       [ultimate] Tomas Henriquez (gpg2 remember) <xxxxxx@xxx.com>
sub   4096R/4A71231A 2017-04-20 [expires: 2019-04-20]
```

I don't care sharing this because I already invalidated the key, but is
good to see all the options that I picked:

* _Please select what kind of key you want:_ I choose the default algorithm, unless you have specific requirements, that should do.
* _What keysize do you want?_ - 4096 bits long, why the hell not?
* _Key is valid for?_ - I like it for 2 years, but again, it depends if there are any special requirements.
* Finally there will be a pop-up to pick your _passphrase_, when picking a passphrase take this tips into account:
  * You should never forget your _passphrase_ ever.
  * A _passphrase_ can be as long as you want, it's asking for a phrase and not a word after all.

After we have created our own key, we need others public key to share
our message to them. To do this, we need to download their public keys.

```bash
$ gpg2 --search-keys my-coworker-email@bububibu.com
gpg: searching for "my-coworker-email@bububibu.com" from hkps server hkps.pool.sks-keyservers.net
(1)     Co Worker <my-coworker-email@bububibu.com>
          4096 bit RSA key XXXXXXXX, created: 2017-04-13, expires: 2021-04-13
(2)     Co Worker <my-coworker-email@bububibu.com>
          4096 bit RSA key XXXXXXXX, created: 2017-04-07, expires: 2021-04-07
Keys 1-2 of 2 for "my-coworker-email@bububibu.com".  Enter number(s), N)ext, or Q)uit > q
```
In this case, is common to just pick the most recent one.

**OPTIONAL**: Is a good idea to sign their key, only if you are sure they are the person that claim to be

```bash
d:dev $ gpg2 --edit-key CoWorker

gpg (GnuPG/MacGPG2) 2.0.30; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.


pub  4096R/XXXXXXXX  created: 2017-04-11  expires: 2021-04-11  usage: SC
                     trust: full          validity: unknown
sub  4096R/XXXXXXXX  created: 2017-04-11  expires: 2021-04-11  usage: E
[ unknown] (1). CoWorker <xxxxxxx>

gpg> sign

pub  4096R/XXXXXXXX  created: 2017-04-11  expires: 2021-04-11  usage: SC
                     trust: full          validity: unknown
 Primary key fingerprint: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

     My Coworker <xxxxxxxxxxxxxxxxx>

This key is due to expire on 2021-04-11.
Are you sure that you want to sign this key with your
key "Tomas Henriquez <xxxxxxxxxxxxxxxxxxxxx>" (XXXXXXXX)

Really sign? (y/N) y

You need a passphrase to unlock the secret key for
user: "Tomas Henriquez <xxxxxxxxxxxxxxxxxxxxx>"
4096-bit RSA key, ID XXXXXXXX, created 2017-04-19


gpg> trust
pub  4096R/XXXXXXXX  created: 2017-04-11  expires: 2021-04-11  usage: SC
                     trust: full          validity: unknown
sub  4096R/XXXXXXXX  created: 2017-04-11  expires: 2021-04-11  usage: E
[ unknown] (1). My Coworker <xxxxxxxxxxxxxxxxx>

Please decide how far you trust this user to correctly verify other users' keys
(by looking at passports, checking fingerprints from different sources, etc.)

  1 = I don't know or won't say
  2 = I do NOT trust
  3 = I trust marginally
  4 = I trust fully
  5 = I trust ultimately
  m = back to the main menu

Your decision? 4

pub  4096R/XXXXXXXX  created: 2017-04-11  expires: 2021-04-11  usage: SC
                     trust: full          validity: unknown
sub  4096R/XXXXXXXX  created: 2017-04-11  expires: 2021-04-11  usage: E
[ unknown] (1). My Coworker <xxxxxxxxxxxxxxxxx>

gpg> quit
Save changes? (y/N) y
d:dev $ gpg2 --list-keys
------------------------------------
pub   4096R/192A9CD8 2017-04-11 [expires: 2021-04-11]
uid       [  full  ] CoWorker <xxxxxxx>
sub   4096R/98289174 2017-04-11 [expires: 2021-04-11]
```

Now that we have their public key and we have signed it for trust worthiness we can sign and encrypt our message to them. 
Pick user public keys that you want and you are done

```bash
# -se equals sign + encrypt message
$ gpg2 -se -r my-coworker-email@bububibu.com lewl.pw

You need a passphrase to unlock the secret key for
user: "Tomas Henriquez <thenriquez@ebates.com>"
4096-bit RSA key, ID XXXXXXXX, created 2017-04-19
```
A file called `<file>.pgp` will be created and you can share it with the specified user as you wish.

If you want to read more, the oficial docs are pretty good! Please check [here](https://www.gnupg.org/gph/en/manual/x334.html) and [here](https://www.gnupg.org/gph/en/manual/x56.html) for more information.

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
