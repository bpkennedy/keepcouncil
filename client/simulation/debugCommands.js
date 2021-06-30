import { placeAtTile } from './map'
import { goToBall } from './movement'
import { sprites } from './index'

export const setPlayerTo = (playerId, coord) => placeAtTile(sprites.find(p => p.id === playerId), coord)
export const sendPlayerToBall = playerId => goToBall(sprites.find(p => p.id === playerId))
