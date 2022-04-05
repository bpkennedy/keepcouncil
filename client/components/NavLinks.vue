<template>
  <c-box
    d="flex"
    align-items="center"
    justify-content="space-evenly"
    width="100%"
    height="100%"
    :max-width="['100%', '100%', '20rem', '20rem', '20rem']"
    mx="4"
    :class="{'bottom-max-width': bottom }"
  >
    <nav-link
      route="/"
      route-name="index"
      icon-name="meteor"
    />
  </c-box>
</template>

<script lang="js">
import NavLink from './NavLink.vue'

export default {
  components: {
    NavLink,
  },
  props: {
    bottom: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.bottom-max-width {
  max-width: 100%;
}
</style>
