<!-- Stripped freet component used to show a freet 
    while you're making a comment but with no editing option -->

<template>
  <article class="freet">
    <header>
      <h3 class="author">
        @{{ freet.author }}
      </h3>
    </header>
    <p
      class="content"
    >
      {{ freet.content }}
    </p>
    <p class="info">
      Posted at {{ freet.dateModified }}
      <i v-if="freet.edited">(edited)</i>
    </p>
  </article>
</template>

<script>

export default {
  name: "StrippedFreetComponent",
  props: {
    freet: {
      type: Object,
      required: true
    }
  }
}

</script>