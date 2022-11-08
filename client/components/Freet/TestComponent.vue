<template>
  <article>
    <div>
      I'm just a simple test component!
    </div>
    <FreetComponent freet="freet" />
  </article>
</template>

<script>

export default {
  name: "TestComponent",
  props: {
    freet: {
      type: Object,
      required: true
    }
  }
}
</script>