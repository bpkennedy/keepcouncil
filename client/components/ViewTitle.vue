<template>
  <c-text
    as="h1"
    font-size="2xl"
    font-family="EuropaBold"
    size="lg"
    class="no-space h1-line-height"
  >
    {{ title }}
  </c-text>
</template>

<script lang="js">
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
