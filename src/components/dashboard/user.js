import React from 'react';

const User = ({name, balance}) => (
    <div className={'user'}>
        <span>{name}</span> <span>{balance}</span>
    </div>
);
export default User;
