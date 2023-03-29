import { createSlice } from "@reduxjs/toolkit";
import { BackendApi } from "../api";



export const userSlice = createSlice ({
    name: "Users",
    initialState:{
        value:{

        }

    },

    reducers:{
        SetUser(state,action){

            console.log("id from payload", action.payload)

            state.value = action.payload;
			window.localStorage.setItem("token", action.payload.token);
            BackendApi.user.refreshToken()

        },
        logout(state,action){
            state.value = {};
			window.localStorage.removeItem("token");
        }
        

    }
})
export const {SetUser,logout} = userSlice.actions
export default userSlice.reducer