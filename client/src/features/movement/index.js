import store from '../../config/store'

function handleDirctionMove(e, direction) {
    console.log(`Moving ${direction}!`)
    store.dispatch({ type: "MOVE_PLAYER", payload: direction })
    e.preventDefault()
}

function handleKeyDown(e) {
    switch (e.keyCode) {
        case 40:
            handleDirctionMove(e, 'down')
            return
        case 37:
            handleDirctionMove(e, 'left')
            return
        case 39:
            handleDirctionMove(e, 'right')
            return
        case 38:
            handleDirctionMove(e, 'up')
            return
        default:
            console.log(e.keyCode)
    }
}

export default function handleMovement(wrappedComponent) {
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e, wrappedComponent)
    })

    return wrappedComponent
}
