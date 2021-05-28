import { init, GameLoop } from 'kontra'
import { drawMap, fieldMap, adjustCanvasSize, responsiveTileSize } from './map'
import { Player } from '~/simulation/Player'

export let globalCanvas = null
export let globalContext = null
let globalSceneId = null
let loop = null
let fps = 60

export const initGame = (sceneId) => {
  globalSceneId = sceneId
  const { canvas, context } = init(globalSceneId)
  globalCanvas = canvas
  globalContext = context
  adjustCanvasSize()

  const homePlayers = createPlayers({ count: 10, color: 'red' })
  const awayPlayers = createPlayers({ count: 10, color: 'blue' })

  loop = GameLoop(loopConfiguration({
    sprites: [...homePlayers, ...awayPlayers],
  }))

  start()
}

export const stop = () => loop.stop()
export const start = () => loop.start()
export const setFps = (num) => {
  fps = num
  stop()
  globalContext.clearRect(0, 0, globalCanvas.width, globalCanvas.height)
  globalCanvas = null
  globalContext = null
  initGame(globalSceneId)
}

const loopConfiguration = ({ sprites }) => ({
  fps,
  update () {
    for (let i = sprites.length; i > 0; i--) {
      sprites[sprites.length - i].update(globalCanvas)
    }
  },
  render () {
    drawMap(fieldMap, responsiveTileSize(globalCanvas), globalContext)
    for (let i = sprites.length; i > 0; i--) {
      sprites[sprites.length - i].render()
    }
  },
})

const createPlayers = ({ count, color }) => {
  const spriteTileSize = responsiveTileSize(globalCanvas)
  return new Array(count).fill().map(() => new Player({
    x: Math.random() * (globalCanvas.width - spriteTileSize),
    y: Math.random() * (globalCanvas.height - spriteTileSize),
    dx: Math.random() * 4 - 2,
    dy: Math.random() * 4 - 2,
    color,
  }))
}
