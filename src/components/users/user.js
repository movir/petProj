import React from 'react';
import {connect} from 'react-redux';

export default connect(({currentUser}) => ({...currentUser}))(
    ({name, balance}) => (
        <div className="currentUser">
            {console.log(name, balance)}
            <span>{name}</span> <span>{balance}</span>
        </div>
    )
);
