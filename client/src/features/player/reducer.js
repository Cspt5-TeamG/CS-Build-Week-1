import { PLAYER_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../config/constants'

const initialState = {
    position: [0, 0],
}

function respectBoundaries(oldPos, newPos) {
    return newPos[0] >= 0 &&
        newPos[0] <= MAP_WIDTH - PLAYER_SIZE &&
        newPos[1] >= 0 &&
        newPos[1] <= MAP_HEIGHT - PLAYER_SIZE
        ? newPos
        : oldPos
}

function getNewPosition(oldPos, direction) {
    switch (direction) {
        case 'left':
            return respectBoundaries(
                oldPos,
                [oldPos[0] - PLAYER_SIZE, oldPos[1]]
            )

        case 'right':
            return respectBoundaries(
                oldPos,
                [oldPos[0] + PLAYER_SIZE, oldPos[1]]
            )

        case 'up':
            return respectBoundaries(
                oldPos,
                [oldPos[0], oldPos[1] - PLAYER_SIZE]
            )

        case 'down':
            return respectBoundaries(
                oldPos,
                [oldPos[0], oldPos[1] + PLAYER_SIZE]
            )

        default:
            return [oldPos[0], oldPos[1]]
    }
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MOVE_PLAYER':
            return {
                ...state,
                position: getNewPosition(state.position, action.payload),
            }

        default:
            return state
    }
}

export default playerReducer
