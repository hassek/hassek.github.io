---
layout: default
title: Home
---
<div class="header categories">
    <div>
    {% for cat in site.categories %}
        <a class="topic-category" href="#0">{{ cat[0] }}</a>
    {% endfor %}
    </div>
    {% comment %}
    <div>
    commented tags from top
    {% for tag in site.tags %}
        <a class="topic-tag" href="#0">{{ tag[0] }}</a>
    {% endfor %}
    </div>
    {% endcomment %}
</div>
<div class="posts">
  {% for post in site.posts %}
    <article id="{{ post.title | slugify }}" class="post {% for tag in  post.tags %}{{ tag }} {% endfor %}{{ post.category }}">
      <div class="title">
        <h2>
          {{ post.title }}
          <a title='permalink' class="topic-slug" href="#{{ post.title | slugify }}"><i class="linkify icon"></i></a>
        </h2>
      </div>
      <div class="entry">
        {{ post.content }}
      </div>
      <div class="tags">
        <a class="tag topic-category" href="#0">{{ post.category }}</a>
        {% for tag in post.tags %}
          <a class="tag topic-tag" href="#0">{{ tag }}</a>
        {% endfor %}
        <span style="float: right;">{{ post.date | date: "%Y-%m-%d" }}</span>
      </div>
    </article>
  {% endfor %}
</div>
