import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import InputControl from '../InputControl/InputControl';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../Firebase"


function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    setLoading(true);

    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async(res) => {
        setSubmitButtonDisabled(false);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setLoading(false);
        setErrorMsg(err.message);
      });
  }
  
  return (
    <div>
      <div className="container">
        <div className='innerBox'>
          <h1 className='heading'>
            Login
          </h1>
          <InputControl
            label='Email'
            placeholder='Enter Email Address'
            onchange={(event) => setValues((prev) => ({...prev, email: event.target.value}))}
          />
          <InputControl
            label='Password'
            placeholder='Enter Password'
            onchange={(event) => setValues((prev) => ({...prev, pass: event.target.value}))}
          />
          <div className='footer'>
            <b className='error'>{errorMsg}</b>
            <button disabled={submitButtonDisabled} onClick={handleSubmission}>
              {loading ? "Loading..." : "Login"}
            </button>
            <p>
              Already have an account?{' '}
              <span>
                <Link to="/signup"><h1>Signup</h1></Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
