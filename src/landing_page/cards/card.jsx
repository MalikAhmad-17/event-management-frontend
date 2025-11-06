import React from 'react';
import './Card.css';

const Card = ({logo, title, text}) => {

  return (
    <div className="card">
      <img
        src={logo}  alt="Logo"  className="card-logo"
      />
      <h2 className="card-title">{title}</h2>
      <p className="card-text"> {text}  </p>
    </div>
  );
};



export default Card;
