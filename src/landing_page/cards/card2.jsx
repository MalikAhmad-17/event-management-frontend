import React from 'react';
import Event1 from '../../eventspage/event1';

import { useNavigate } from "react-router-dom";
import './Card2.css';

const Card2 = ({ image, p, heading, date, address, registered, btncard2 }) => {
  return (
    <div className="card2"> 
      <img src={image} alt="Event" className="card2img" />
      <p className="tag">{p}</p>
      <h3 className="card2-heading">{heading}</h3>
      <p className="date">{date}</p>
      <p className="address">{address}</p>
      <p className="registered">{registered}</p>
      <button  onClick={() => navigate("/Event1")} 
      className="btn-card2">{btncard2}</button>
    </div>
  );
};

export default Card2;
