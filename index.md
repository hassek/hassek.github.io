---
layout: default
title: Home
---
<div class="posts">
  {% for post in site.posts %}
    <article class="post">

      <h1>{{ post.title }}</h1>

      <div class="entry">
        {{ post.content }}
      </div>
    <div>
    <span>
    <span>#{{ post.category }}</span>
    {% for tag in post.tags %}
        <span>#{{ tag }}</span>
    {% endfor %}
    </span>
    <span style="float: right;">{{ post.date | date: "%Y-%m-%d" }}</span>
    </div>
    </article>
  {% endfor %}
</div>
