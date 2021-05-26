import { init, GameLoop } from 'kontra'
import { drawMap, fieldMap, offsetCanvasHeight, responsiveTileSize } from './map'
import { Player } from '~/simulation/Player'

export const initGame = (sceneId) => {
  const { canvas, context } = init(sceneId)
  offsetCanvasHeight(context)

  const players = []
  const spriteTileSize = responsiveTileSize(canvas)
  for (let i = 0; i < 20; i++) {
    players.push(new Player({
      canvas,
      width: spriteTileSize,
      height: spriteTileSize,
      x: Math.random() * (canvas.width - spriteTileSize),
      y: Math.random() * (canvas.height - spriteTileSize),
      dx: Math.random() * 4 - 2,
      dy: Math.random() * 4 - 2,
      color: 'red',
    }))
  }

  const loop = GameLoop({
    fps: 60,
    update () {
      players.forEach((player) => {
        player.update()

        if (player.x < 0) {
          player.dx *= -1
          player.x = 0
        } else if (player.x + player.width >= canvas.width) {
          player.dx *= -1
          player.x = canvas.width - player.width
        }

        if (player.y < 0) {
          player.dy *= -1
          player.y = 0
        } else if (player.y + player.height >= canvas.height) {
          player.dy *= -1
          player.y = canvas.height - player.height
        }
      })
    },
    render () {
      drawMap(fieldMap, responsiveTileSize(canvas), context)
      players.forEach(sprite => sprite.render())
    },
  })

  loop.start()
  return canvas
}
