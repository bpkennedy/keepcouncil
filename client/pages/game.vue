<template>
  <c-box
    d="flex"
    flex-direction="column"
  >
    <view-title title="Game Stream" />
  </c-box>
</template>

<script lang="js">
import { GAME_VIEW_NAME } from '@/constants'
import { VIEW_LOADED_ACTION } from '~/store'
import ViewTitle from '~/components/ViewTitle.vue'

export default {
  components: {
    ViewTitle,
  },
  mounted () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: GAME_VIEW_NAME })
  },
}
</script>
