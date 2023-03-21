

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
      }
      
};

