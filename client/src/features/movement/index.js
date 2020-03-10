import store from '../../config/store'
import { MOVEMENTS } from '../../config/constants'
import { handleDirectionMove } from '../player/reducer'

function handleKeyDown(e) {
  switch (e.keyCode) {
    case 40:
      handleDirectionMove(MOVEMENTS.NORTH)(store.dispatch, store.getState)
      return
    case 37:
      handleDirectionMove(MOVEMENTS.WEST)(store.dispatch, store.getState)
      return
    case 39:
      handleDirectionMove(MOVEMENTS.EAST)(store.dispatch, store.getState)
      return
    case 38:
      handleDirectionMove(MOVEMENTS.SOUTH)(store.dispatch, store.getState)
      return
    default:
      console.log(e.keyCode)
  }
}

export default function handleMovement(wrappedComponent) {
  window.addEventListener('keydown', e => {
    handleKeyDown(e, wrappedComponent)
  })

  return wrappedComponent
}
