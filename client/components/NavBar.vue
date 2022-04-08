<template>
  <c-stack
    align="center"
    direction="row"
  >
    <c-link
      as="nuxt-link"
      to="/"
    >
      <c-image
        :src="require('@/assets/keepCouncilLogoVector.svg')"
        h="3rem"
        w="3rem"
      />
    </c-link>
    <c-link
      as="nuxt-link"
      to="/"
      class="undecorative-link"
    >
      <c-text
        as="h1"
        font-size="2xl"
        font-family="EuropaBold"
        size="lg"
      >
        KeepCouncil
      </c-text>
    </c-link>
    <spacer />
    <c-button>
      <nav-link
        display="Create"
        route="/create"
        route-name="create"
      />
    </c-button>
  </c-stack>
</template>

<script>
import NavLink from './NavLink.vue'
import Spacer from './Spacer.vue'

export default {
  components: {
    NavLink,
    Spacer,
  },
}
</script>

<style lang="scss">
.offset-a-bit {
  margin-right: 2rem;
}
</style>
