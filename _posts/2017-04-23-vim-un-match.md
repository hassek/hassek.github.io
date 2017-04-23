---
layout: default
title: Vim un-match
date: 2017-04-23 12:24:00
category: vim
tags: [search,regex]
---
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
could match words that are not followed by some other pattern:

```
/foo\(bar\)\@!
```

This will find all cases of _foo_ not followed by _bar_.
