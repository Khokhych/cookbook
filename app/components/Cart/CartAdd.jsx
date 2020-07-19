import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';

export default () => {
  const cartText = useRef();
  const dispatch = useDispatch();

  const setNewItem = () => {
    if (!(cartText.current.value).length) {
      return;
    }
    const { value } = cartText.current;
    cartText.current.value = '';
    const url = 'http://localhost:4000/add-cart';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipe: value,
      }),
    }).then((response) => response.json())
      .then((json) => dispatch({ type: 'ADD_CART', payload: json }))
      .catch((e) => { console.log(e); });
  };
  return (
    <div className="cart_add container">
      <textarea
        className="cart_add-area"
        ref={cartText}
        placeholder="Add a new recipe here"
      />
      <p className="desc">
        To add the field must not be empty
      </p>
      <Button onClick={setNewItem} text="Add a recipe" />
    </div>
  );
};