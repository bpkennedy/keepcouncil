import { init, GameLoop } from 'kontra'
import { drawMap, fieldMap, adjustCanvasSize, responsiveTileSize } from './map'
import { Player } from '~/simulation/Player'
import { Ball } from '~/simulation/Ball'

export let globalCanvas = null
export let globalContext = null
let globalSceneId = null
let loop = null
let sprites = null
let fps = 60

export const initGame = (sceneId) => {
  globalSceneId = sceneId
  const { canvas, context } = init(globalSceneId)
  globalCanvas = canvas
  globalContext = context
  adjustCanvasSize()

  const homePlayers = [createTestPlayer({ color: 'red' })]
  const awayPlayers = []
  const ball = createBall()
  sprites = [...homePlayers, ...awayPlayers, ball]

  loop = GameLoop(loopConfiguration({
    sprites,
  }))

  start()
}

export const stop = () => loop.stop()
export const start = () => loop.start()
export const setFps = (num) => {
  fps = num
  resetGame()
}
export const setPlayerTo = (playerId, coord) => {
  const player = sprites.find(p => p.id === playerId)
  player.placeAtTile(coord)
}

const resetGame = () => {
  stop()
  globalContext.clearRect(0, 0, globalCanvas.width, globalCanvas.height)
  globalCanvas = null
  globalContext = null
  loop = null
  sprites = null
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

// const createRandomPlayers = ({ count, color }) => {
//   const spriteTileSize = responsiveTileSize(globalCanvas)
//   return new Array(count).fill().map(() => new Player({
//     x: Math.random() * (globalCanvas.width - spriteTileSize),
//     y: Math.random() * (globalCanvas.height - spriteTileSize),
//     dx: Math.random() * 4 - 2,
//     dy: Math.random() * 4 - 2,
//     color,
//   }))
// }

const createTestPlayer = ({ color }) => {
  return new Player({ color })
}

const createBall = () => {
  return new Ball()
}
