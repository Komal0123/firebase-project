import React, { useState } from 'react'

import {auth} from "../../Firebase"
import { createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import InputControl from '../InputControl/InputControl';
import {Link , useNavigate }from "react-router-dom"
import Signup_Module from './Signup_Module.css';
function Signup() {
  const navigate=useNavigate();
  const [values, setValues]=useState({
    name:'',
    email:'',
    pass:''
  })
  const [errorMsg, setErrorMsg]=useState("");
  const [submitButtonDisabled,setsubmitButtonDisabled]=useState(false);
  const handleSubmission=()=>{
    if(!values.name|| !values.email|| !values.pass ){
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
    setsubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass).then(async(res)=>{
      setsubmitButtonDisabled(false);

    const user=res.user;
    await updateProfile(user,{displayName:values.name,})
   navigate("/")
    })
    .catch((err)=>{
      setsubmitButtonDisabled(false);
      setErrorMsg(err.message)
    }
    
    )
   
  }
  
  return (
    <div>
      <div className="container">
        <div className='innerBox'>
          <h1 className='heading'>
           Sign up
          </h1>
          <InputControl label='Name' placeholder='Enter Your Name' onChange={
           (event)=>setValues((prev)=>({
...prev,name: event.target.value
            }))

            
          }/>
          <InputControl label='Email' placeholder='Enter Email Address'onChange={
            (event)=>setValues((prev)=>({
...prev, email: event.target.value
            }))

            
          }/>
          <InputControl label='Password' placeholder='Enter Password' onChange={
            (event)=>setValues((prev)=>({
...prev,pass:event.target.value
            }))

            
          }/>
          <div className='footer'>
            <b className="error">{errorMsg}</b>
            <button onClick={handleSubmission} disabled={submitButtonDisabled}
            >Signup</button>
            <p>
              Already have an account?{''}
              <span>
                
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup