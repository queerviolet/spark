import React, { Component } from 'react';
// import {ui, uiConfig} from '../fire'


export const HomePage = ({login}) => {
  return (
    <div>
      <div>
        <button onClick={login}>Log In</button>
      </div>
      <h1>Trip Planner</h1>
    </div>
  )
}

export default HomePage
