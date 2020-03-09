export const MAP_WIDTH = 800
export const MAP_HEIGHT = 420
export const PLAYER_SIZE = 10

// API-specific
export const BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL || `http://localhost:8000/api`

export const REGISTRATION_ENDPOINT = `${BASE_API_URL}/registration/`
export const LOGIN_ENDPOINT = `${BASE_API_URL}/login/`
export const INITIALIZE_GAME_ENDPOINT = `${BASE_API_URL}/adv/init/`
export const ROOMS_ENDPOINT = `${BASE_API_URL}/adv/rooms/`
