import Loginnav from '../loginsignup/loginnav'
import './browseevents.css' 
import Card2 from '../landing_page/cards/card2'
import c1img from '../assets/card1.jpg'
import c2img from '../assets/card2.jpg'
import c3img from '../assets/card3.jpg'
import React from 'react'

function Browseevents() {
  return (
    <div className='browseevents'>
        <Loginnav/> 
        <div className='browsehead'>
            <h3>Discover Events</h3>
            <p>Find your next amazing experience </p>
        </div>

      <div className="browseevsection">
          <div className="leftsectionfilter">
            <p>Filter</p>
            <label>Search</label>
            <input type="text" />
            <label>Category</label> <br/>
            <select>
                <option>All</option>
                <option>Technology</option>
                <option>Marketing</option>
                <option>Music</option>
                <option>Business</option>
                <option>Health</option>
                <option>Food</option>
                <option>Arts</option>
            </select> <br/>
            <input type="Checkbox"/> &nbsp;
            <label>Free Events Only</label>
          </div>

        <div className="rightsectionev container">
            <Card2 className='browsecards'
            image={c1img}
            p="Technology"
            heading="Music Festival 2025..."
            date="📅 Nov 10, 2025"
            address="📍 San Francisco, USA"
            registered="2200/5000 Registered"
            btncard2="View Details"
            />
            <Card2 className='browsecards'
            image={c2img}
            p="Technology"
            heading="Music Festival 2025..."
            date="📅 Nov 10, 2025"
            address="📍 San Francisco, USA"
            registered="2200/5000 Registered"
            btncard2="View Details"
            />
            <Card2 className='browsecards'
            image={c3img}
            p="Technology"
            heading="Music Festival 2025..."
            date="📅 Nov 10, 2025"
            address="📍 San Francisco, USA"
            registered="2200/5000 Registered"
            btncard2="View Details"
          />
          <Card2 className='browsecards'
            image={c1img}
            p="Technology"
            heading="Music Festival 2025..."
            date="📅 Nov 10, 2025"
            address="📍 San Francisco, USA"
            registered="2200/5000 Registered"
            btncard2="View Details"
          />
          <Card2 className='browsecards'
            image={c2img}
            p="Technology"
            heading="Music Festival 2025..."
            date="📅 Nov 10, 2025"
            address="📍 San Francisco, USA"
            registered="2200/5000 Registered"
            btncard2="View Details"
            />
            <Card2 className='browsecards'
            image={c3img}
            p="Technology"
            heading="Music Festival 2025..."
            date="📅 Nov 10, 2025"
            address="📍 San Francisco, USA"
            registered="2200/5000 Registered"
            btncard2="View Details"
            />

        </div>
    </div>
    </div>
  )
}

export default Browseevents