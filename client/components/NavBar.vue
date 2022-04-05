<template>
  <c-box
    :h="{ base: '5rem' }"
    :max-height="{ base: '5rem' }"
    w="100%"
    d="flex"
    align-items="center"
    :class="{'bottom-nav': bottom }"
  >
    <c-box
      v-if="!bottom"
      flex="1"
    >
      <c-stack>
        <view-title title="KeepCouncil" />
      </c-stack>
    </c-box>
    <nav-links :bottom="bottom" />
  </c-box>
</template>

<script lang="js">
import ViewTitle from './ViewTitle.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: {
    NavLinks,
    ViewTitle,
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
.h1-line-height {
  line-height: 1.5rem;
}

.no-space {
  margin: 0;
  padding: 0;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  border-top: 1px solid #cbd5e0;
}
</style>
