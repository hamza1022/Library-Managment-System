import React, { useEffect, useState } from 'react';

import { BackendApi } from "../../api"

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import OTPInput from "otp-input-react";


const Otp = () => {

  const { id } = useParams();
  const navigate = useNavigate()

  console.log("id", id);

  const [user, setUser] = useState({})
  const [OTP, setOTP] = useState("");

  console.log("otp", OTP)

  const getUser = async () => {

    if (id){

      await BackendApi.user.getOneById(id)
      .then((result) => {
        setUser(result.data.data)
      })
      .catch((err) => {

        console.log(err)
        
      })
      
    }
    console.log("id is undefined")
  }

  useEffect(() => {
    getUser()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("otp in handl", OTP)
    await BackendApi.user.verifyOtp({
      OTP: OTP,
      email: user.email
    })
    .then((result) => {
        console.log("otp verified successfully");
        console.log(result);
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  console.log(user)

  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className="d-flex justify-content-center align-items-center container">
          <div className="card py-5 px-3">
            <h5 className="m-0">Registration verification</h5>
            <span className="mobile-text">
              Code is just send to your registered Email{' '}
              <b className="text-danger">{user.email}</b>
            </span>
            <div style={{ marginTop: 50, paddingLeft: 135 }}>
              <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
              <button type="submit">Verify</button>

            </div>

            <div className="text-center mt-5">
              <span className="d-block mobile-text">Don't receive the code?</span>
              <span className="font-weight-bold text-danger cursor">Resend</span>
            </div>
          </div>
        </div>


      </form>
    </>
  );

}

export default Otp