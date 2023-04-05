

import axios from 'axios';

export const AuthorApi = {
getAllAuthors: async () => {
        let token = localStorage.getItem("token");
        try {
          const response = await axios.get("http://localhost:8080/api/author/getAuthors",{
            headers:{
                'Authorization': `Bearer ${token}`
                
              } 
          });
          console.log(response.data.data);
          return response.data.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },

 getAuthorById :async(id)=>{

        try {
            const response = await axios.get(`http://localhost:8080/api/author/getOne/${id}`)

            console.log("response", response)
            return response.data.data

        }catch(error){
            throw error

        }

       
    



      },

    deleteAuthor:async(author,options)=>{
      const id = author._id;
     
      try{
        const response = await axios.delete(`http://localhost:8080/api/author/delete/${id}`,options);
        return response.data.data

      }catch(error){
        throw error

      }
    },

    
    editAuthor:async(id, data )=>{
      console.log("edit api called",id)
      const name = data.name;
      const age = data.age;
      const country = data.country;

      let token = localStorage.getItem("token");
      try{

        const response = await axios.put(`http://localhost:8080/api/author/update/${id}`,{
          name,
          age,
          country
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


      addAuthor :async (data)=>{



        console.log(data)

    
        let token = localStorage.getItem("token")

        try {
          const response = await axios.post ("http://localhost:8080/api/author/create",{
            name:data.name,
            age:data.age,
            country:data.country,
          
          },{
            headers:{
              'Authorization': `Bearer ${token}`
              
          }  
          }
        )
  
          return response.data.data
          
        } catch (error) {
          throw error
          
        }
    
       

      }
};

