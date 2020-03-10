export const MAP_WIDTH = 400
export const MAP_HEIGHT = 400
export const PLAYER_SIZE = 40

// API
export const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || `http://localhost:8000/api`

export const REGISTRATION_ENDPOINT = `${BASE_API_URL}/registration/`
export const LOGIN_ENDPOINT = `${BASE_API_URL}/login/`
export const INITIALIZE_GAME_ENDPOINT = `${BASE_API_URL}/adv/init/`
export const MOVE_ENDPOINT = `${BASE_API_URL}/adv/move/`
export const ROOMS_ENDPOINT = `${BASE_API_URL}/adv/rooms/`

// Movements
const NORTH = 'n'
const EAST = 'e'
const SOUTH = 's'
const WEST = 'w'

export const MOVEMENTS = { NORTH, EAST, SOUTH, WEST }
