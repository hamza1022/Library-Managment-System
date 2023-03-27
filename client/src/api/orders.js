
import axios from 'axios';
export const OrderApi = {
 

//   getOneById: async (id) => {
//     console.log("get id", id)


//     const response = await axios.get(`http://localhost:8080/api/user/getOne/${id}`)
//     return response

//   },



  
//   getAllUsers:async()=>{


//     let token = localStorage.getItem("token");


//     try{
//       const response = await axios.get("http://localhost:8080/api/user/getUsers",{
//         headers:{
//           'Authorization': `Bearer ${token}`
          
//         } 
//       })
//       return response.data.data

//     }catch(err){
//       throw err
//     }

//   },

placeOrder :async (userId,booksId)=>{


    let token = localStorage.getItem("token");

    try{

        
        const response = await axios.post ("http://localhost:8080/api/order/create",{
            
            customer:userId,
            books:booksId
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
viewOrder :async ()=>{
    let token = localStorage.getItem("token");

    try {
        const response = await  axios.get ("http://localhost:8080/api/order/view",
    {
        headers:{
            'Authorization': `Bearer ${token}`
            
        }       
    })

    console.log("api response", response.data.orders)
    return response.data.orders
        
    } catch (error) {

        throw error
        
    }
},
returnOrder: async(id)=>{

    let token = localStorage.getItem("token");
    try{

        const response = await axios.put("http://localhost:8080/api/order/return",{
      orderId:id
        },
        {
          headers:{
            'Authorization': `Bearer ${token}`
            
          }       
        }
        );
        return response.data.data

      }catch(err){
        throw err

      }

}

};

