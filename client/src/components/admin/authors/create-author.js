import React, { useState } from 'react'

import { useNavigate } from "react-router-dom";
import { BackendApi } from '../../../api';
import { Sidebar } from '../../layout/sidebar';
import Swal from 'sweetalert2';



const CreateAuthor = () => {
    const navigate = useNavigate()

  const [error, setError]= useState("")
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [countryError, setCountryError] = useState("");


    const handleNameChange = (e) => {
      setName(e.target.value);
    };
    const handleAgeChange = (e) => {
      setAge(e.target.value);
    }
    const handleCountryChange = (e) => {
      setCountry(e.target.value);
    }

  
    const handleNameBlur = () => {
      if (name.length <= 0) {
        setNameError("name is required");
      } else {
        setNameError("");
      }
    };
  
    const handleAgeBlur = () => {
  
      if(age.length <= 0 ){
        setAgeError("age is required");
        
      }
  
      else {
        setAgeError("");
      }
    };
    const handleCountryBlur = () => {
  
      if(country.length <= 0 ){
        setCountryError("Country is required");
        
      }
  
      else {
        setCountryError("");
      }
    };
  
    const checkDisable = () => {
      if (name.length <= 0 || age.length <= 0 || country.length <= 0) {
        return true;
      }
     
      return false;
    };

    const handleSubmit =()=>{

      let data = {
        name,
        age, 
        country
      }
    
          BackendApi.author.addAuthor(data)
          .then((res)=>{
            console.log(res)

            // Swal.fire({
            //   icon: 'success',
            //   title: 'Author Created Successfull',
              
            //   showCancelButton: false,
            //   showConfirmButton: false,
            //   timer: 1500
            //   }).then(()=>{
           
            //     navigate(-1);
               
          
            //   })
            
            
          })
          .catch((err)=>{
            setError(err.response?.data?.message)
            
          })
        



    }

    
  return (
    <div style={{display :"flex"}}>
    <Sidebar/>

    <div style={{ flex: 1, padding: '20px' }}>
    <p>Create Author</p>
    <div>
			<div className="auth-overlay">
				<div className="container">
					<div className="auth-form">
          <form onSubmit={handleSubmit}>
  <div className="form-group">
  <label htmlFor="country">Name<span style={{color: "red"}}>*</span></label>
    <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      value={name}
      onChange={handleNameChange}
      onBlur={handleNameBlur}
    />
    {nameError && (
      <div className="text-danger">{nameError}</div>
    )}
  </div>
  <div className="form-group">
  <label htmlFor="country">Age<span style={{color: "red"}}>*</span></label>
    <input
      type="number"
      className="form-control"
      id="age"
      name="age"
      value={age}
      onChange={handleAgeChange}
      onBlur={handleAgeBlur}
    />
    {ageError && (
      <div className="text-danger">{ageError}</div>
    )}
  </div>
  <div className="form-group">
  <label htmlFor="country">Country<span style={{color: "red"}}>*</span></label>


    <input
      type="text"
      className="form-control"
      id="country"
      name="country"
      value={country}
      onChange={handleCountryChange}
      onBlur={handleCountryBlur}
    />
    {countryError && (
      <div className="text-danger">{countryError}</div>
    )}
  </div>
  {error?.length > 0 && (
								<div className="alert alert-danger fs-12">
									{error}
								
								</div>
							)}
  <button type="submit" disabled={checkDisable()} className="btn btn-primary">
    Add
  </button>
</form>
						
					</div>
					      
      
				</div>
			</div>
		</div>

    </div>
    </div>
  )
}

export default CreateAuthor