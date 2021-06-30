import { Sprite } from 'kontra'
import { responsiveTileSize, placeAtTile } from './map'
import { boundMovementToWalls } from './movement'
import { globalCanvas } from './index'

export class Ball extends Sprite.class {
  constructor (props) {
    super(props)
    this.id = 'b'
    this.anchor = { x: 0, y: 0 }
    this.x = (globalCanvas.width / 2)
    this.y = (globalCanvas.height / 2)
    this.color = 'white'
    this.width = responsiveTileSize()
    this.height = responsiveTileSize()
    this.dx = 0
    this.dy = 0
    placeAtTile(this, { x: 9, y: 4 })
  }

  update () {
    super.update()
    boundMovementToWalls(this)
  }

  draw () {
    super.draw()
  }
}
