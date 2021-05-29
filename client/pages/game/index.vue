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
        <c-flex direction="column">
          <c-text as="h3">
            Gameloop
          </c-text>
          <c-button variant-color="green" @click="start">
            Start
          </c-button>
          <c-button variant-color="red" @click="stop">
            Stop
          </c-button>
          <c-box>
            <c-text as="h5">
              FPS
            </c-text>
            <c-input placeholder="FPS" :value="60" @input="setFps($event)" />
          </c-box>
          <c-box>
            <c-text as="h5">
              Set Player To Tile (bottom-left is 0,0)
            </c-text>
            <c-input placeholder="x,y" value="0,0" @input="setPlayerToTile($event)" />
          </c-box>
        </c-flex>
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
    setPlayerToTile (coordString) {
      if (coordString.includes(',')) {
        const { setPlayerTo } = require('../../simulation')
        const x = parseInt(coordString.split(',')[0]) || 0
        const y = parseInt(coordString.split(',')[1]) || 0
        setPlayerTo(0, { x, y })
      }
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
