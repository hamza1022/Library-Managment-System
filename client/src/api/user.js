
import axios from 'axios';
export const UserApi = {
  signUp: async (data) => {
    try {
      const name = data.name;
      const email = data.email;
      const phoneNumber = data.phoneNumber;
      const address = data.address;
      const password = data.password;
      const response = await axios.post("http://localhost:8080/api/user/signUp", {
        name,
        address,
        email,
        password,
        phoneNumber
      })
      console.log(response.data.data)

      return response.data.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  getOneById: async (id) => {
    console.log("get id", id)


    const response = await axios.get(`http://localhost:8080/api/user/getOne/${id}`)
    return response

  },

  verifyOtp: async ({ email, OTP }) => {
    try {
      const otp = OTP
      console.log("API ", otp + email)
      const response = await axios.post("http://localhost:8080/api/user/verifyOtp", {
        email,
        otp
      })
      return response.data.data
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  login: async (data) => {

    console.log("login api called",)
    const email = data.email;
    const password = data.password;
  
    try {
      const res = await axios.post("http://localhost:8080/api/user/login", { 
        email,
        password
      });
      console.log("api" ,res.data.data);
      return res.data.data;
    } catch (err) {
      console.error("err",err);
      throw err;
    }
  },
  getAllUsers:async()=>{


    let token = localStorage.getItem("token");


    try{
      const response = await axios.get("http://localhost:8080/api/user/getUsers",{
        headers:{
          'Authorization': `Bearer ${token}`
          
        } 
      })
      return response.data.data

    }catch(err){
      throw err
    }

  },
  changeStatus : async(email,status)=>{

    let token = localStorage.getItem("token");
    try {
    
      const response = await axios.put(`http://localhost:8080/api/user/update-status/${email}`, {
      
        status:status
      },{
        headers:{
          'Authorization': `Bearer ${token}`
          
        } 

      })
      return response.data.data
    } catch (error) {
      console.error(error);
      return error;
    }

  }
  


};

