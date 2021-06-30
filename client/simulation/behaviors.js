import { sprites } from './index'

// eslint-disable-next-line no-console
export const pursue = () => console.log('pursue')
export const locateBall = () => sprites.find(p => p.id === 'b')
