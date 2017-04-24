---
layout: default
title: Home
---
<div class="header categories">
    <div>
    {% for cat in site.categories %}
        <a href="#0">#{{ cat[0] }}</a>
    {% endfor %}
    </div>
    <div>
    {% for tag in site.tags %}
        <a href="#0">#{{ tag[0] }}</a>
    {% endfor %}
    </div>
</div>
<div class="posts">
  {% for post in site.posts %}
    <article class="post {% for tag in  post.tags %}{{ tag }} {% endfor %}{{ post.category }}">
      <h1>{{ post.title }}</h1>

      <div class="entry">
        {{ post.content }}
      </div>
      <div class="tags">
        <a class="tag" href="#0">#{{ post.category }}</a>
        {% for tag in post.tags %}
          <a class="tag" href="#0">#{{ tag }}</a>
        {% endfor %}
        <span style="float: right;">{{ post.date | date: "%Y-%m-%d" }}</span>
      </div>
    </article>
  {% endfor %}
</div>
