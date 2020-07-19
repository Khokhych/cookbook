import React from 'react';

export default (props) => {
  const { milliseconds } = props;
  const formatDate = (milliseconds) => {
    const d = new Date(milliseconds);
    const currMinutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const currHours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const currDate = d.getDate();
    const currMonth = d.getMonth() + 1;
    const currYear = d.getFullYear();
    return `${currYear}-${currMonth}-${currDate}  ${currHours}:${currMinutes}`;
  };
  return (
    <div className="carts-date">
      {`Date of creation - ${formatDate(milliseconds)}`}
    </div>
  );
};