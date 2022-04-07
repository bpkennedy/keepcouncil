<template>
  <c-box>
    <hyper-link
      :display="display"
      :to="route"
      :route-name="routeName"
    />
  </c-box>
</template>

<script>
import HyperLink from './HyperLink.vue'

export default {
  components: { HyperLink },
  props: {
    display: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    routeName: {
      type: String,
      required: true,
    },
  },
}
</script>
