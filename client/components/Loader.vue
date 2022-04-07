<template>
  <c-box
    position="absolute"
    top="-4rem"
    left="-2rem"
    user-select="none"
    pointer-events="none"
    class="full-width full-height"
  >
    <c-spinner
      v-show="loading"
      position="absolute"
      left="50%"
      top="50%"
      color="white"
      size="xl"
      thickness="4px"
      z-index="9"
    />
  </c-box>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['loading']),
  },
}
</script>
