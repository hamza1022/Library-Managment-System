

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
    editBook:async(id, data )=>{
      console.log("edit api called",id)
      const bookName = data.bookName;
      const bookTitle = data.bookTitle;
      const bookPrice = data.bookPrice;

      let token = localStorage.getItem("token");
      try{

        const response = await axios.put(`http://localhost:8080/api/book/update/${id}`,{
          bookName,
          bookTitle,
          bookPrice
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

        const bookName = data.bookName;
        const bookTitle = data.bookTitle;
        const bookPrice = data.bookPrice;
        // const Author = data.Author;
  

        let token = localStorage.getItem("token");

        const response = await axios.post ("http://localhost:8080/api/book/create",{
          bookName,
          bookTitle,
          bookPrice,
          Author:id
        },
        {
          headers:{
            'Authorization': `Bearer ${token}`
            
          }       
        })

        return response.data.data

      }
};

