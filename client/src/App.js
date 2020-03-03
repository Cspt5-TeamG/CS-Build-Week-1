import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Player from './features/player'
import handleMovement from './features/movement'
import { MAP_HEIGHT, MAP_WIDTH } from './config/constants'
import './App.css'
import ArrowKeys from "./arrowkeys.png"
import Login from './components/Login';
import Signup from './components/Signup';


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
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/login" component={Signup} />
      </Switch>
      <img className="arrowsKeys" src={ArrowKeys} alt="Arrow keys" />
    </div>
  )
}


export default handleMovement(App);
