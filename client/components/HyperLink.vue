<template>
  <c-link
    v-if="routeName"
    as="nuxt-link"
    :to="to"
    :class="{'active': $nuxt.$route.name === routeName }"
  >
    {{ display }}
  </c-link>
  <c-link
    v-else
    :href="to"
    :is-external="external"
  >
    {{ display }}
  </c-link>
</template>

<script lang="js">
export default {
  props: {
    display: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    external: {
      type: Boolean,
      default: false,
    },
    routeName: {
      type: String,
      default: undefined,
    },
  },
}
</script>
