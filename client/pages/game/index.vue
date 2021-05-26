<template>
  <c-box
    d="flex"
    flex-direction="column"
  >
    <view-title title="Game Stream" />
    <card>
      <c-box
        slot="passed"
        d="flex"
        flex-direction="column"
      >
        <canvas
          :id="canvasId"
          oncontextmenu="return false;"
        />
      </c-box>
    </card>
    <card />
  </c-box>
</template>

<script lang="js">
import { initGame } from '../../simulation'
import { GAME_VIEW_NAME } from '~/constants'
import { VIEW_LOADED_ACTION } from '~/store'
import ViewTitle from '~/components/ViewTitle.vue'
import Card from '~/components/Card.vue'

export default {
  components: {
    ViewTitle,
    Card,
  },
  data: () => ({
    canvasId: 'game',
  }),
  mounted () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: GAME_VIEW_NAME })
    initGame(this.canvasId)
  },
}
</script>

<style lang="scss">
#game {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
