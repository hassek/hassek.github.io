---
layout: post
title: Adding nice fonts to vim on terminal
date: 2018-05-24 19:42 +0200
category: vim
---

Adding nicer fonts to your terminal vim is not as easy as one would think but here is a good path to follow to make it happen on a mac

```
brew tap caskroom/fonts
brew cask install font-hack-nerd-font
```

On your `.vimrc`
```
set encoding=utf8
let g:airline_powerline_fonts = 1
```

And then change it on iTerm2

![image](https://user-images.githubusercontent.com/778410/40502518-824d37ec-5f8b-11e8-8934-00a272501982.png)

This has been shamelessly ripped off from [here](https://github.com/ryanoasis/vim-devicons/issues/198)
