import { Sprite } from 'kontra'
import { responsiveTileSize } from './map'
import { globalCanvas } from './index'

export class Ball extends Sprite.class {
  constructor (props) {
    super(props)
    this.anchor = { x: 0.5, y: 0.5 }
    this.x = (globalCanvas.width / 2)
    this.y = (globalCanvas.height / 2)
    this.color = 'white'
    this.width = responsiveTileSize()
    this.height = responsiveTileSize()
    this.dx = 0
    this.dy = 0
  }

  update () {
    super.update()

    if (this.x < 0) {
      this.dx *= -1
      this.x = 0
    } else if (this.x + this.width >= globalCanvas.width) {
      this.dx *= -1
      this.x = globalCanvas.width - this.width
    }

    if (this.y < 0) {
      this.dy *= -1
      this.y = 0
    } else if (this.y + this.height >= globalCanvas.height) {
      this.dy *= -1
      this.y = globalCanvas.height - this.height
    }
  }

  draw () {
    super.draw()
  }
}
