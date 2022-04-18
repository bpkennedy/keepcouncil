<template>
  <c-box
    position="absolute"
    top="0"
    left="0"
    user-select="none"
    pointer-events="none"
    class="full-width full-height"
  >
    <c-spinner
      v-show="loading"
      position="absolute"
      left="48vw"
      top="40vh"
      z-index="9"
      speed="0.65s"
      empty-color="gray.50"
      color="gray.400"
      size="6rem"
      thickness="4px"
    />
    <c-text
      as="h1"
      font-size="2xl"
      font-family="EuropaBold"
      size="lg"
      position="absolute"
      left="0"
      right="0"
      top="54vh"
      z-index="9"
      text-align="center"
    >
      {{ loadingMessage }}
    </c-text>
  </c-box>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['loading', 'loadingMessage']),
  },
}
</script>
