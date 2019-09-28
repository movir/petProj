import React from 'react';
import { connect } from 'react-redux';

const Users = ({ name, balance, id }) => (
  <div className={'user'}>
    <span>{name}</span> <span>{balance}</span>
    <button onClick={()=>console.log('coffee')}>☕</button>
  </div>
);

const UsersList = ({ usersByIds, usersIds }) => (
  <div className="users">
    <div className="users-balance">Users total balance {balanceCount(usersByIds)}</div>
    <ul className={'users-list'}>
      {usersIds.map(id => (
        <li key={id}>
          <Users {...usersByIds[id]} />
        </li>
      ))}
    </ul>
  </div>
);

export default connect(({ usersByIds, usersIds }) => ({ usersByIds, usersIds }))(UsersList);

function balanceCount(users) {
  return users && Object.values(users).reduce((sum, { balance }) => sum + balance, 0);
}
