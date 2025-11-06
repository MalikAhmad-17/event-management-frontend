import react from 'react';
import { useState } from 'react'
import './App.css'
import Loginsignup from './loginsignup/loginsignup'
import Landing from './landing_page/landing'
import Event1 from './eventspage/event1';
import Browseevents from './browse_events/browseevents';
import Card2 from './landing_page/cards/card2';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


// import { BsCalendar4, BsPeople, BsFillLightningChargeFill} from 'react-icons/bs';

function App() {

  return (
    <>      

 <Router>
      <Routes>
        {/* When URL is "/" → show Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* When URL is "/login" → show Login Page */}
        <Route path="/loginsignup" element={<Loginsignup />} />
        <Route path="/browseevents" element={<Browseevents />} />
        <Route path="/event1" element={< Card2/>} />
       
      </Routes>
    </Router>


      {/* <Landing/> */}
      {/* <Loginsignup/> */}
      
     
    </>
  )
}

export default App
