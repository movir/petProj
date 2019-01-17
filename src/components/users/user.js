import React from 'react';
import {connect} from 'react-redux';

export default connect(({currentUser}) => ({...currentUser}))(
    ({name, balance = 0}) => (
        <div className="currentUser">
            {console.log(name, balance)}
            <span>{name}</span> <span>{balance}</span>
        </div>
    )
);
