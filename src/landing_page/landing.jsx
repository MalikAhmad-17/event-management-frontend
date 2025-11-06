import React from 'react'
import './landing.css'
import Loginnav from '../loginsignup/loginnav'
import Card from './cards/card'
import Card2 from './cards/card2'
import { useNavigate } from "react-router-dom";
import Event1 from '../eventspage/event1'
import Browseevents from '../browse_events/browseevents'

import { WiDirectionRight } from 'react-icons/wi';

import { BsCalendar4, BsPeople, BsFillLightningChargeFill} from 'react-icons/bs';
// import {people} from '../assets/people.ico';
// import calender from '../assets/calender';
// import electric from '../assets/electric'; 

import { FaStar } from 'react-icons/fa';

import c21img from '../assets/card1.jpg'
import c22img from '../assets/card2.jpg'
import c23img from '../assets/card3.jpg'



function Landing() { 
  const calener4= <BsCalendar4/>
   const navigate = useNavigate();

  return (
    <div>
        <Loginnav/>
        <div className='landingheader'>
            <h2>Discover Amazing Events Near You</h2>
            <div className="landingbtns">
            <p>Join thousands of people attending exciting events. From tech conferences to music festivals, find your next experience.</p>
            <button onClick={() => navigate("/browseevents")}  
            className="browse-btn">Browse Events <WiDirectionRight /> </button>
             {/* <button
                onClick={() => navigate("/loginsignup")}
                className="landing-btn">
                Go to Login / Signup
              </button> */}
            <button  onClick={() => navigate("/loginsignup")}  
            className="start-btn">Get Started</button>
            </div>
        </div> 

{/* Second Landing Section  */} 

        <div className="secondlandingsection">
          <div className="whychoose">
            <h2>Why Choose EventEase?</h2>
            <p>The all-in-one platform for discovering, organizing, and managing events</p>
          </div>
        </div>

      <div className="card-container">
        <Card
        logo= {BsCalendar4}
        title='Easy Event Discovery'
        text='Find events that match your interests with powerful filters and search'
        /> 
        <Card
        logo={BsPeople}
        title='Seamless Registration'
        text='Quick and secure registration process with instant ticket delivery'
        /> 
        <Card
        logo={BsFillLightningChargeFill}
        title='Organizer Tools'
        text='Powerful tools for creating and managing events with real-time analytics'
        /> 
      </div>

{/* Third Section  */}
      <div className="thirdsection">
        <div className="thirdfet">
          <span className='fetevents'>
            <h3>Featured Events</h3>
            <button onClick={() => navigate("/browseevents")} 
            className='viewevents'>View All Events <WiDirectionRight/> </button>
          </span>
        <p>Don't miss these upcoming events</p>
        </div>
      </div>

    <div className="card2-container">
      <Card2 
        image={c21img}
        p="Technology"
        heading="Tech Innovation Summit..."
        date="📅 Nov 10, 2025"
        address="📍 San Francisco, USA"
        registered="1200/2000 Registered"
        btncard2="View Details"  
      />
      <Card2
        image={c22img}
        p="Technology"
        heading="Digital Marketing..."
        date="📅 Nov 10, 2025"
        address="📍 San Francisco, USA"
        registered="1200/2000 Registered"
        btncard2="View Details"
      />
      <Card2
        image={c23img}
        p="Technology"
        heading="Music Festival 2025..."
        date="📅 Nov 10, 2025"
        address="📍 San Francisco, USA"
        registered="2200/5000 Registered"
        btncard2="View Details"
      />
  </div>

{/* Fourth Section  */}

    <div className="stats-container">
          <div className="stat-item">
            <h2>10K+</h2>
            <p>Events Created</p>
          </div>

          <div className="stat-item">
            <h2>50K+</h2>
            <p>Happy Attendees</p>
          </div>

          <div className="stat-item">
            <h2>500+</h2>
            <p>Organizers</p>
          </div>

          <div className="stat-item">
            <h2>
              4.8 
            </h2>
            <p> 
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
              <FaStar className="star-icon" />
            </p>
            
          </div>
    </div>
  
{/* Fifth Section  */}

<div className='fifthsec'>
  <h3>Ready to Create Your Event? </h3>
  <p>Join our community of organizers and start hosting amazing events today</p>
  <button className='fif-btn'>Become an Organiser</button>
</div>


              {/* <Event1/> */}
              {/* <Browseevents/> */}
    </div>
  )
}

export default Landing