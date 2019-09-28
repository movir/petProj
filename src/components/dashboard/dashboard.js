import React from 'react';
//import { connect } from 'react-redux';

import Users from './users';
import CoffeeStorage from './coffee-storage';

const Dashboard = (/*{ usersByIds, usersIds }*/) => (
  <div className="dashboard">
    <h2>DashBoard</h2>
    <Users />
    <CoffeeStorage />
  </div>
);
export default Dashboard;/*connect(state => state)(Dashboard)*/
