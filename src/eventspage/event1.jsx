import './event1.css';
import Card2 from '../landing_page/cards/card2'
import c21img from '../assets/card1.jpg'

function Event1(){
   

    return(
        <>
        
        <div className="evheader1">
            <img src={c21img} className='card2img' alt="" />
            <h3>Tech Innovation Summit 2025</h3>
        </div>
        <div className="evdis1 container-fluid">
            <div className='aboutevent1 container'>
                <h3>About This Event</h3>
                <p>Join us for the biggest tech innovation summit of the year. Network with industry leaders, explore cutting-edge technologies, and gain insights into the future of tech.</p>
            </div>
            
            
            <h4>Event Details</h4>
           
                <div className='evcard1 container'>                 
                    <dd>📅 Date & Time</dd>
                    <dd>  Nov 10, 2025</dd> 
                    <dd>📍 Location</dd>
                    <dd>San Francisco Convention Center, CA</dd>
                    <dd>Organizer</dd>
                    <dd>Tech Events Inc.</dd>           
                </div>    
               <div className="price1">
                    $<h4>$99</h4>
                    <span className="capacity">
                        <p>Capacity</p>
                        <p>387/500</p>
                        <input type="range" value='70%' /> <br/>
                        <button>Register Now</button>
                    </span>
                    

               </div>
            

        </div>


        </>
    )
}

export default Event1 
