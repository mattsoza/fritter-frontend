<!-- Simple reusable tagging component -->

<template>
  <article v-if="freet.tags.length">
    <div class="tag">
      #{{ freet.tags[0] }}
    </div>
  </article>
</template>

<script>
  export default {
    name: "TagComponent",
    props: {
      freet: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>
  .tag {
    background-color: #59EB85;
    color: black;
    border-radius: .4em;
    display: inline-block;
    padding: .3em;
  }
</style>