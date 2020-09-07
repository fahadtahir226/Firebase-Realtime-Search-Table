import React, { Component } from 'react';
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Transactions from './Components/Transactions';
import Users from './Components/Users';

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="container-fluid " >
          <div id="users" style={{padding: 10}}>
            <Users />
          </div>
          <div id="transactions"  style={{padding: 10}}>
            <Transactions />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;