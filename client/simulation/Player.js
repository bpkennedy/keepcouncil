import { Sprite } from 'kontra'
import { responsiveTileSize, placeAtTile } from './map'
import { boundMovementToWalls } from './movement'

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
    placeAtTile(this, { x: 0, y: 0 })
  }

  update (ctx) {
    super.update()
    boundMovementToWalls(this)
  }

  draw () {
    super.draw()
  }
}
