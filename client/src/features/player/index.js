import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './player_walk.png'
function mapDispatchToProps(dispatch) {
    return {
        move: (direction) => {
            dispatch({ type: 'MOVE_PLAYER', payload: direction })
        }
    }
}

function mapStateToProps(state) {
    return {
        position: state.player.position
    }
}

function Player(props) {
    return (
        <div
            style={{
                position: 'relative',
                top: props.position[1],
                left: props.position[0],
                backgroundImage: `url('${walkSprite}')`,
                backgroundPosition: '0 0',
                width: '40px',
                height: '40px',
            }}
        >&nbsp;</div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)