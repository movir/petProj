import React, { Component } from 'react';
import { connect } from 'react-redux';

const StorageItem = ({ name, amount, image }) => (
  <div className={'coffee'}>
    <img src={image} alt="" height={'25px'} />
    <span>{name} </span> &mdash;&nbsp;
    <span>{amount} (pcs.)</span>
  </div>
);
const StorageItemConnected = connect(({ coffeesByIds }, { coffeeId, ...props }) => ({
  name: coffeesByIds && coffeesByIds[coffeeId] && coffeesByIds[coffeeId].name,
  image: coffeesByIds && coffeesByIds[coffeeId] && coffeesByIds[coffeeId].image,
  ...props,
}))(StorageItem);

export default connect(({ coffeeStorageByIds, coffeeStorageIds }) => ({
  coffeeStorageByIds,
  coffeeStorageIds,
}))(({ coffeeStorageByIds, coffeeStorageIds }) => (
  <div className={'coffee-rest'}>
    <div>coffee full amount {coffeeCount(coffeeStorageByIds)}</div>
    <ul className="coffee-list">
      {coffeeStorageIds.filter(isNotEmpty(coffeeStorageByIds)).map(id => (
        <li key={id}>
          <StorageItemConnected {...coffeeStorageByIds[id]} />
        </li>
      ))}
      <li onClick={()=>{}}>+ add coffee</li>
    </ul>
  </div>
));

function coffeeCount(coffees) {
  return coffees ? Object.values(coffees).reduce((sum, { amount }) => sum + Number(amount) || 0, 0) : 0;
}

function isNotEmpty(collectionById) {
  return id => collectionById && collectionById[id] && Number(collectionById[id].amount);
}
