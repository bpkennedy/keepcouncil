import { Sprite } from 'kontra'
import { responsiveTileSize, getTilePos } from './map'
import { globalCanvas } from './index'

export class Player extends Sprite.class {
  constructor (props) {
    super(props)
    this.id = props.id || 0
    this.x = props.x || 0
    this.y = props.y || 0
    this.color = props.color || 'red'
    this.width = props.width || responsiveTileSize()
    this.height = props.height || responsiveTileSize()
    this.dx = props.dx || 0
    this.dy = props.dy || 0
    this.placeAtTile({ x: 0, y: 0 })
  }

  placeAtTile ({ x, y }) {
    const { realX, realY } = getTilePos(x, y)
    this.x = realX
    this.y = realY
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
