import React from 'react';
import {connect} from 'react-redux';

import User from './user';
import CoffeeItem from './coffee-item'

const Dashboard = ({users, usersIds, coffees, coffeeIds}) => (
    <div className="dashboard">
        <h2>DashBoard</h2>
        {users && <div className="users">
            <div className="users-balance">Users full balance {balanceCount(users)}</div>
            <ul className={'users-list'}>
                {usersIds.map((id) => (<li key={id}><User {...users[id]}/></li>))}
            </ul>
        </div>}
        {coffees && <div className={'coffee-rest'}>
            <div>coffee full amount {coffeeCount(coffees)}</div>
            <ul className="coffee-list">
                {coffeeIds.map((id) => (<li key={id}><CoffeeItem {...coffees[id]}/></li>))}
            </ul>
        </div>}
    </div>
);
export default connect(
    state => state
)(Dashboard);

function coffeeCount(coffees = {}) {
    return Object.values(coffees).reduce((sum, {amount}) => (sum + amount), 0);
}
function balanceCount(users = {}) {
    return Object.values(users).reduce((sum, {balance}) => (sum + balance), 0);
}
