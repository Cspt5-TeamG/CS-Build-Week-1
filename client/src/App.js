import React from 'react';
import Player from './features/player'
import handleMovement from './features/movement'
import { MAP_HEIGHT, MAP_WIDTH } from './config/constants'
import './App.css'
import ArrowKeys from "./arrowkeys.png"
import Login from './components/Login';



function App() {
  return (
    <div
      className="map"
      style={{
        height: MAP_HEIGHT,
        width: MAP_WIDTH,
      }}
    >
      <Player />
      {/* <Login /> */}
      <img className="arrowsKeys" src={ArrowKeys} alt="Arrow keys" />
    </div>
  )
}


export default handleMovement(App);
