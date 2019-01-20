import React, {Component} from 'react'
import {connect} from  'react-redux'
import CoffeeItem from './coffee-item';

export default connect(
    ({coffeeStorage, coffeeStorageIds})=>({coffeeStorage, coffeeStorageIds})
)(
    ({coffeeStorage, coffeeStorageIds}) => (
        <div className={'coffee-rest'}>
            <div>coffee full amount {coffeeCount(coffeeStorage)}</div>
            <ul className="coffee-list">
                {coffeeStorageIds.map((id) => (<li key={id}><StorageItem {...coffeeStorage[id]}/></li>))}
            </ul>
        </div>
    )
);

class StorageItem extends Component {
    componentDidMount() {
        //setUp listener on 
    }
}


function coffeeCount(coffees) {
    return coffees ? Object.values(coffees).reduce((sum, {amount}) => (sum + amount), 0) : 0;
}
