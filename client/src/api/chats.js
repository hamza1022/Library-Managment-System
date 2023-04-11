
import axios from 'axios';
export const OrderApi = {
 

sendMsg :async (byId,toId, text )=>{
    console.log("api hits")
    console.log("id", "book id " , byId, toId)


    let token = localStorage.getItem("token");

    try{

        
        const response = await axios.post ("http://localhost:8080/api/chat/create-msg",{
            
            by:byId,
            to:toId,
            msg:text
        },
        {
            headers:{
                'Authorization': `Bearer ${token}`
                
            }       
        })
        return response.data.data
    }catch(err){
        throw err

    }
        

}  ,
viewMsg :async ()=>{
    let token = localStorage.getItem("token");

    try {
        const response = await  axios.get ("http://localhost:8080/api/chat/get-msgs",
    {
        headers:{
            'Authorization': `Bearer ${token}`
            
        }       
    })

    console.log("api response", response.data.chats)
    return response.data.chats
        
    } catch (error) {

        throw error
        
    }
},


};

