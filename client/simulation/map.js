const W = 1// Wall/unwalkable
const O = 0// Open/walkable
const H = 2// Home goal/unwalkable
const A = 3// Away goal/unwalkable
const P = 4// Pivot point (for ai steering)/unwalkable
export const fieldMap = [
  [P, W, W, W, P, W, W, W, W, P, W, W, W, W, P, W, W, W, P],
  [W, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, W],
  [W, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, W],
  [W, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, W],
  [P, H, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, A, P],
  [W, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, W],
  [W, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, W],
  [W, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, W],
  [P, W, W, W, P, W, W, W, W, P, W, W, W, W, P, W, W, W, P],
]

const L = 1// Left Lane
const C = 2// Center Lane
const R = 3// Right Lane
export const laneMap = [
  [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
  [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
  [L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L],
  [C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C],
  [C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C],
  [C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C, C],
  [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R],
  [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R],
  [R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R, R],
]

const COLUMNS = 19
const ROWS = 9

const flipY = y => Math.abs(y - ROWS + 1)
export const getTile = (tilemap, x, y) => tilemap[flipY(y)][x]

export const drawMap = (gameMap, canvas, context) => {
  const tileSize = Math.floor(canvas.width / COLUMNS)
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLUMNS; x++) {
      switch (getTile(gameMap, x, y)) {
        case 0:
          context.fillStyle = '#000000'
          break
        default:
          context.fillStyle = '#f1f1f1'
      }
      context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
    }
  }
}
