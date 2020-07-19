import React from 'react';
import './Button.sass';

export default (prop) => (
  <button
    onClick={prop.onClick}
    type={prop.type ? prop.type : 'button'}
    className="button"
  >
    {prop.text}
  </button>
);
