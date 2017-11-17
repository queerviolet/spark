import React, { Component } from 'react';
// import {ui, uiConfig} from '../fire'


export const Dashboard = ({ logout }) => {
  return (
    <div>
      <div>
        <button onClick={logout}>Log Out</button>
      </div>
      <h1>User Dashboard</h1>
    </div>
  )
}

export default Dashboard
