
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
      throw error;
    }
  },

  getOneById: async (id) => {
    console.log("get id", id)

    try {
      const response = await axios.get(`http://localhost:8080/api/user/getOne/${id}`)
      return response.data.data

    } catch (error) {
      throw error

    }




  },

  verifyOtp: async ({ email, OTP, type }) => {
    try {
      const otp = OTP
      console.log("API ", otp + email)
      const response = await axios.post(`http://localhost:8080/api/user/verifyOtp/${type}`, {
        email:email,
        otp:OTP
      })
      return response.data.data
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  login: async (body) => {
    const email = body.email;
    const password = body.password;

    try {
      const res = await axios.post("http://localhost:8080/api/user/login", {
        email,
        password
      });
      console.log("api", res.data.data);
      return res.data.data;
    } catch (err) {

      throw  err;
    }
  },
  getAllUsers: async () => {


    let token = localStorage.getItem("token");


    try {
      const response = await axios.get("http://localhost:8080/api/user/getUsers", {
        headers: {
          'Authorization': `Bearer ${token}`

        }
      })
      return response.data.data.filter(user => user.role === 'user');

    } catch (err) {
      throw err
    }

  },
  changeStatus: async (email, status) => {

    let token = localStorage.getItem("token");
    try {

      const response = await axios.put(`http://localhost:8080/api/user/update-status/${email}`, {

        status: status
      }, {
        headers: {
          'Authorization': `Bearer ${token}`

        }

      })
      return response.data.data
    } catch (error) {
      console.error(error);
      return error;
    }

  },
  deleteUser: async (user) => {


    let token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`http://localhost:8080/api/user/delete/${user.email}`, {
        headers: {
          'Authorization': `Bearer ${token}`

        }
      });
      return response.data.data

    } catch (error) {
      throw error

    }
  },
  refreshToken: () => {
    let token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
  getContext: async () => {

    let token = localStorage.getItem("token")
    try {
      const response = await axios.get("http://localhost:8080/api/user/context", {
        headers: {
          'Authorization': `Bearer ${token}`

        }
      })
      return response.data.data

    } catch (error) {
      throw error

    }

  },
  changePassword: async (data) => {
    let token = localStorage.getItem('token')
    try {

      const response = await axios.put("http://localhost:8080/api/user/update-password", {

        oldPassword: data.oldPassword,
        password: data.password
      }, {
        headers: {
          'Authorization': `Bearer ${token}`

        }


      })
      return response.data.data

    } catch (error) {
      throw error

    }

  },
  forgotPassword: async (data) => {
    console.log("email", data.email)

    try {
      const response = await axios.post("http://localhost:8080/api/user/forgot/email", {

        email: data.email,

      })
      return response.data.data

    } catch (error) {
      throw error

    }

  },

  resetPassword: async (body, token) => {

    let email = body.email


    try {
      const response = await axios.post(`http://localhost:8080/api/user/reset-password/${email}`, {

        password: body.password,
        resetPasswordToken: token

      })
      return response.data.data

    } catch (error) {
      throw error

    }

  },
  resendOtp: async (email) => {

    try {

      const response = await axios.post(`http://localhost:8080/api/user/otp/resend/${email}`)
      return response.data.data

    } catch (error) {
      throw error

    }

  }


};

