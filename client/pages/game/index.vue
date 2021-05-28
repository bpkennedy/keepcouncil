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
    <card>
      <c-box slot="passed">
        <c-text as="h3">
          Debug Tools
        </c-text>
        <c-box
          d="flex"
          flex-direction="row"
        >
          <c-button variant-color="green" @click="start">
            Start
          </c-button>
          <c-button variant-color="red" @click="stop">
            Stop
          </c-button>
          <c-input placeholder="FPS" :value="60" @input="setFps($event)" />
        </c-box>
      </c-box>
    </card>
    <card />
  </c-box>
</template>

<script lang="js">
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
    this.$nextTick(() => {
      this.delayedSimulationStart()
    })
  },
  methods: {
    start () {
      const { start } = require('../../simulation')
      start()
    },
    stop () {
      const { stop } = require('../../simulation')
      stop()
    },
    setFps (event) {
      const { setFps } = require('../../simulation')
      const minNum = event < 0 ? 0 : event
      const maxNum = minNum > 60 ? 60 : minNum
      setFps(maxNum)
    },
    delayedSimulationStart () {
      const { initGame } = require('../../simulation')
      initGame(this.canvasId)
    },
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
