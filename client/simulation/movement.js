import { globalCanvas } from '~/simulation/index'

const axis = {
  x: 'width',
  y: 'height',
}
export const boundMovementToWalls = (gameObject) => {
  for (const [key, value] of Object.entries(axis)) {
    if (gameObject[key] < 0) {
      gameObject[`d${key}`] *= -1
      gameObject[key] = 0
    } else if (gameObject[key] + gameObject[value] >= globalCanvas[value]) {
      gameObject[`d${key}`] *= -1
      gameObject[key] = globalCanvas[value] - gameObject[value]
    }
  }
}

// eslint-disable-next-line no-console
export const goToBall = () => console.log('goToBall')
