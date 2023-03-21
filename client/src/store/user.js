import { createSlice,current } from "@reduxjs/toolkit";



export const userSlice = createSlice ({
    name: "Users",
    initialState:{
        value:{

        }

    },

    reducers:{
        setUser(state,action){

            state.value = action.payload;
			window.localStorage.setItem("token", action.payload.token);

        }
        

    }
})
export const {setUser} = userSlice.actions
export default userSlice.reducer