---
layout: default
---

# Artistry

<section >
  <dl class="grid">
  {% for sketch in site.sketches %}
    <dt><a class="grid-item" href="{{ sketch.url }}"> {{sketch.title}}</a></dt>
    <dd>{{ sketch.description }}</dd>
    {% endfor %}

  </dl>
</section>
