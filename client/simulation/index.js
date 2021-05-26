import { init, Sprite, GameLoop } from 'kontra'
import { drawMap, fieldMap, offsetCanvasHeight, responsiveTileSize } from './map'

export const initGame = (sceneId) => {
  const { canvas, context } = init(sceneId)
  offsetCanvasHeight(context)

  const sprites = []
  const spriteTileSize = responsiveTileSize(canvas)
  for (let i = 0; i < 20; i++) {
    sprites.push(Sprite({
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
      sprites.forEach((sprite) => {
        sprite.update()

        if (sprite.x < 0) {
          sprite.dx *= -1
          sprite.x = 0
        } else if (sprite.x + sprite.width >= canvas.width) {
          sprite.dx *= -1
          sprite.x = canvas.width - sprite.width
        }

        if (sprite.y < 0) {
          sprite.dy *= -1
          sprite.y = 0
        } else if (sprite.y + sprite.height >= canvas.height) {
          sprite.dy *= -1
          sprite.y = canvas.height - sprite.height
        }
      })
    },
    render () {
      drawMap(fieldMap, responsiveTileSize(canvas), context)
      sprites.forEach(sprite => sprite.render())
    },
  })

  loop.start()
  return canvas
}
