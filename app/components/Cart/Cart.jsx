import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.sass';

import Button from '../Button/Button';

export default () => {
  const dispatch = useDispatch();
  const [subItems, setSubItems] = useState([]);
  const data = useSelector((state) => state.data);
  const cartText = useRef();

  const formatDate = (milliseconds) => {
    const d = new Date(milliseconds);
    const currDate = d.getDate();
    const currMonth = d.getMonth() + 1;
    const currYear = d.getFullYear();
    return `${currYear}-${currMonth}-${currDate}`;
  };

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

  const setVersion = (e) => {
    const url = 'http://localhost:4000/add-cart/';
    const { value, id } = e.target.parentNode.parentNode.firstChild;
    const version = { id, value };
    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(version),
    }).then((response) => {
      if (response.status) {
        dispatch({ type: 'ADD_VERSION', payload: version });
      }
    });
  };

  const showOldVersions = (e) => {
    const { id } = e.target.parentNode.parentNode.firstChild;
    if (subItems.find((el) => el === id)) {
      const indexDelete = subItems.findIndex((el) => el === id);
      const arr = subItems.slice();
      arr.splice(indexDelete, 1);
      setSubItems([...arr]);
      return;
    }
    setSubItems([...subItems, id]);
  };

  return (
    <div>

      <h1 className="cart_title container">
        My cookbook
      </h1>

      <div className="cart_add container">
        <textarea
          className="cart_add-area"
          ref={cartText}
          placeholder="Add a new recipe here"
        />
        <Button onClick={setNewItem} text="Add a recipe" />
      </div>

      <div className="carts container">
        <ul className="carts-main_list">
          {data ? data.map((item) => (

            <li key={item._id} className="carts-main_item">

              <div className="carts-date">
                {`Date of creation - ${formatDate(item.date)}` }
              </div>

              <ul className={`carts-sub_list${subItems.find((e) => e === item._id) ? ' carts-sub_list-open' : ''}`}>

                {item.versions.map((el, iter) => (
                  <li className="carts-sub_item">

                    {iter === item.versions.length - 1
                      ? (
                        <textarea
                          className="carts-text_area"
                          defaultValue={el}
                          key={iter}
                          id={item._id}
                        />
                      )
                      : (
                        <div key={iter} className="carts-text">
                          {el}
                        </div>
                      )}

                    {iter === item.versions.length - 1
                      ? (
                        <div className="carts-wrap_buttons">
                          <Button onClick={setVersion} text="Save changes" />
                          {item.versions.length > 1 ? (
                            <Button onClick={showOldVersions} text="Show / hide old versions" />
                          ) : ''}
                        </div>
                      ) : ''}

                  </li>
                ))}

              </ul>
            </li>

          )) : null}
        </ul>
      </div>

    </div>
  );
};
