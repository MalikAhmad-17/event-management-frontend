import './loginsignup.css'
import Loginnav from './loginnav'
import React, { useState } from "react";

function Loginsignup() {
  const [isLogin, setisLogin]= useState(true);

  const [selectedRole, setSelectedRole] = useState("");
  const roles = ["User", "Organiser", "Admin"];

  return (
    <div className='loginpage'> 
      <Loginnav/>
{/* <h2 className='logh2'>EventEase</h2> */}

   
      <div className="loginpage-container">
       
        <div className="form-container">
           <div className='loghead'> 
            <h2>Welcome</h2>
        <p className='wel'>Sign in to your account or create a new one</p> 
    </div> 
          <div className="form-toggle">
            <button className={isLogin ? 'active' : ''} onClick={()=>setisLogin(true)}>Login</button> 
            <button className={!isLogin ? 'active' : ''} onClick={()=> setisLogin(false)}>SignUp</button> 
            </div>


          {isLogin ? <> 
          <div className="form"> 
            <h2>Login Form</h2>
            <label htmlFor="I am a">I am a</label>
            <div className='switchbtn'>
                {/* <button>User</button>
                <button>Organizer</button>
                <button>Admin</button> */}

              
              <div className="container3buttons">
                <div className="button-group">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`role-button ${
                        selectedRole === role ? "active" : ""
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                {selectedRole && (
                  <div className="formask-container">
                    <h3>{selectedRole} Login</h3>

                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" />

                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" />
                  <button className='login-btn'>Login</button>
                </div>
                )} 
            </div> 


            </div>

            {/* <label>Email</label>
            <input type="email" placeholder='Email/id'/>
            <label htmlFor="">Password</label>
            <input type="password" placeholder='******' /> */}
           
            <a href='#'>Forgot Password</a>
            <p>Not a Member? <a href="#" onClick={()=> setisLogin(flase)}>SignUp Now</a> </p>
          </div>
            </> : 
            <>
            <div className="form">
              <h2>Signup Form</h2>
              <label>Email</label>
              <input type="email" placeholder='Email/id'/>
              <label htmlFor="">Password</label>
              <input type="password" placeholder='******' />
              <input type="password" placeholder='Confirm Password'/>
              <button>Signup</button>
            </div>
            </>}
  

         
           

        </div>
      </div>


 

 

    </div>
  )
}

export default Loginsignup