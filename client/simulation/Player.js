import { Sprite } from 'kontra'
import { responsiveTileSize } from './map'

export class Player extends Sprite.class {
  constructor (props) {
    super(props)
    this.x = props.x || 0
    this.y = props.y || 0
    this.color = props.color || 'red'
    this.width = responsiveTileSize(props.canvas)
    this.height = responsiveTileSize(props.canvas)
    this.dx = props.dx || 0
    this.dy = props.dy || 0
  }

  draw () {
    super.draw()
  }
}
