import axios from 'axios';
import React, { useState } from 'react'

const UploadPhoto= () => {
    const defaultBody = {
		profileImage: "",
    }
    const [body, setBody] = useState(defaultBody);
	

    let token = localStorage.getItem('token')

    const onProfileImageChange = (e) => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append("files", file);
      
      
      
        axios
          .patch("http://localhost:8080/api/user/profileImage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          })
          .then((res) => {
            console.log(res)
          
            setBody({ ...body, profileImage: res.data.url });
          });
      };
      

  return (
    <div className="fs-14 fw-500 text-800">
    Add Profile{" "}
    <input
        onChange={(e) => {
            onProfileImageChange(e);
            e.target = null;
        }}
        type="file"
    />
</div>
  )
}

export default UploadPhoto