import React from 'react';
import {connect} from 'react-redux';

export default connect(({currentUser}) => ({...currentUser}))(
    ({name, balance = 0}) => (
        <div className="currentUser">
            <span>{name}</span> <span>{balance}</span>
        </div>
    )
);
