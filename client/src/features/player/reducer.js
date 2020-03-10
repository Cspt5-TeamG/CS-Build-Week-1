import {
  PLAYER_SIZE,
  MAP_HEIGHT,
  MAP_WIDTH,
  MOVE_ENDPOINT,
  MOVEMENTS,
} from '../../config/constants'

const initialState = {
  isLoggedIn: false,
  authToken: null,
  position: [0, 0],
}

async function getNewPosition(state, direction) {
  const { authToken } = state.player
  const response = await fetch(MOVE_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({ direction }),
    headers: {
      Authorization: `Token ${authToken}`,
      'Content-Type': 'application/json',
    },
  })

  const { room, error_msg, players } = await response.json()
  if (error_msg) {
    alert(error_msg)
    return state.player.position
  } else {
    const newPosition = [
      room.coordinates.x * PLAYER_SIZE,
      room.coordinates.y * PLAYER_SIZE,
    ]
    return newPosition
  }
}

export const handleDirectionMove = direction => async (dispatch, getState) => {
  const state = getState()
  dispatch({ type: 'MOVE_PLAYER_START' })
  if (!state.player.isLoggedIn) {
    return alert('Must log in before playing!')
  }
  console.log(`Moving ${direction}!`)
  const newPosition = await getNewPosition(state, direction)
  dispatch({ type: 'MOVE_PLAYER', payload: newPosition })
}

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER_START':
      return { ...state }
    case 'MOVE_PLAYER':
      return {
        ...state,
        position: action.payload,
      }
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        authToken: action.payload,
      }
    default:
      return state
  }
}

export default playerReducer
