import React from 'react';
import { useDispatch } from 'react-redux';

import './sass/app.sass';
import Cart from './components/Cart/Cart';

export default () => {
  const dispatch = useDispatch();
  function getData() {
    return fetch('http://localhost:4000/add-cart')
      .then((response) => response.json())
      .then((json) => dispatch({ type: 'ADD_DATA', payload: json }))
      .catch((e) => { console.log(e); });
  }
  getData();
  return (
    <div>
      <Cart />
    </div>
  );
};
