import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const onProfileImageChange = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("files", file);

    let token = localStorage.getItem("token");

    axios
      .patch("http://localhost:8080/api/user/profileImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setImageUrl(response.data.imageUrl); // save the image URL in state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>
        <h1>Profile</h1>
      </div>

      <div className="uploadBox h-40">
        <div className="icon">
          <span className="iconify " data-icon="akar-icons:cloud-upload"></span>
        </div>
        <div className="fs-14 fw-500 text-800">
          Add Profile{" "}
          <input onChange={onProfileImageChange} type="file" />
        </div>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Profile image"
          style={{ width: "200px", height: "200px" }}
        />
      )}
    </>
  );
};

export default Profile;
