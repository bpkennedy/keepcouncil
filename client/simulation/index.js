import { init, GameLoop } from 'kontra'
import { drawMap, fieldMap, adjustCanvasSize, responsiveTileSize } from './map'
import { Player } from '~/simulation/Player'

export let globalCanvas = null
export let globalContext = null

export const initGame = (sceneId) => {
  const { canvas, context } = init(sceneId)
  globalCanvas = canvas
  globalContext = context
  adjustCanvasSize()

  const fps = 60
  const homePlayers = createPlayers({ count: 10, color: 'red' })
  const awayPlayers = createPlayers({ count: 10, color: 'blue' })

  const loop = GameLoop(loopConfiguration({
    fps,
    sprites: [...homePlayers, ...awayPlayers],
  }))

  loop.start()
}

const loopConfiguration = ({ fps, sprites }) => ({
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
