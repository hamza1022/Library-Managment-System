

import axios from 'axios';

export const BookApi = {
    getAllBooks: async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/book/getBooks");
          console.log(response.data.data);
          return response.data.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

    deleteBook:async(book,options)=>{
      const id = book._id;
     
      try{
        const response = await axios.delete(`http://localhost:8080/api/book/delete/${id}`,options);
        return response.data.data

      }catch(error){
        throw error

      }
    },
    editBook:async(id, data,authorid )=>{

      console.log("edit api called",data)
      const name = data.name;
      const title = data.title;
      const price = data.price;
      

      let token = localStorage.getItem("token");
      try{

        const response = await axios.put(`http://localhost:8080/api/book/update/${id}`,{
          name,
          title,
          price,
          Author:authorid
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

      },
      addBook :async (data,id)=>{
        console.log("id",id)

        const name = data.name;
        const title = data.title;
        const price = data.price;
    
  

        let token = localStorage.getItem("token");

        const response = await axios.post ("http://localhost:8080/api/book/create",{
          name,
          title,
          price,
          Author:id
        },
        {
          headers:{
            'Authorization': `Bearer ${token}`
            
          }       
        })

        return response.data.data

      },
      searchBook:async(value)=>{
        console.log("value", value)
        console.log("search api called")


        try{
          const response = await axios.get(`http://localhost:8080/api/book/search?q=${value}`);
          return response.data.data
  
        }catch(error){
          throw error
  
        }



      },
      getOneById: async (id) => {
        console.log("get id", id)
    
        try {
          const response = await axios.get(`http://localhost:8080/api/book/getOne/${id}`)
          return response.data.data
    
        } catch (error) {
          throw error
    
        }
    
    
    
    
      },
};

