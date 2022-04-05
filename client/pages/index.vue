<template>
  <c-dark-mode>
    <c-box
      d="flex"
      flex-direction="column"
    >
      <view-title title="Dashboard View" />
    </c-box>
  </c-dark-mode>
</template>

<script lang="js">
import ViewTitle from '~/components/ViewTitle.vue'

export default {
  components: {
    ViewTitle,
  },
}
</script>
