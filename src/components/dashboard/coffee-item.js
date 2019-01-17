import React from 'react';

const Coffee = ({name, amount}) => (
    <div className={'coffee'}>
        <span>{name}</span> <span>{amount}</span>
    </div>
);
export default Coffee;
