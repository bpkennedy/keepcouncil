<template>
  <c-stack
    align="center"
    direction="row"
    h="5rem"
  >
    <c-image
      :src="require('@/assets/keepCouncilLogoVector.svg')"
      h="3rem"
      w="3rem"
    />
    <c-text
      as="h1"
      font-size="2xl"
      font-family="EuropaBold"
      size="lg"
      class="no-space h1-line-height"
    >
      KeepCouncil
    </c-text>
    <spacer />
    <nav-link
      display="Home"
      route="/"
      route-name="index"
    />
  </c-stack>
</template>

<script lang="js">
import NavLink from './NavLink.vue'
import Spacer from './Spacer.vue'

export default {
  components: {
    NavLink,
    Spacer,
  },
}
</script>
