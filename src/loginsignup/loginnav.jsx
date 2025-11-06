import React from 'react'
import './loginnav.css'
import { BsCalendar4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Browseevents from '../browse_events/browseevents';

function Loginnav() {
  const navigate = useNavigate();
  return (
    
    <div>
        <nav className="navbar">
          {/* <i className='fa-regular fa-calender'></i> */}
          <span className="logocal">
            <BsCalendar4 /> Event Ease
            {/* <div class="lognav">Event Ease</div> */}
          </span>
        
            <div className="nav-links">
            <a href="#" onClick={() => navigate("/browseevents")}   class="nav-item">Browse Events</a>
            <button onClick={() => navigate("/loginsignup")}>Login</button>
            <button onClick={() => navigate("/loginsignup")}>Signup</button>
            </div>
        </nav>
    </div>
  )
}

export default Loginnav