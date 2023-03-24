import React, { useState,useEffect } from 'react'


import { BackendApi } from '../../api';
import { UserDashboard } from './user-dashboard';
import Select from "react-select";



const Order = () => {

 
    const [selectedBooks,setSelectedBooks] =useState(null)
    const [books,setBooks]= useState([])
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    console.log("Selected",selectedBooks)


    function handleChange(event) {
        const newSearchText = event.target.value;
        setSearchText(newSearchText);
    
        if (newSearchText === "") {
          setSearchResults([]);
        } else {
        
            BackendApi.book.searchBook(newSearchText)
            .then((book)=>{
                setSearchResults(book)
    
            })
            .catch((error)=>{console.log(error)})
            }
        }
      
 
 
    
     

      const booksToDisplay = searchText === "" ? books : searchResults;


    const fetchBooks =   () => {
        BackendApi.book.getAllBooks()
        .then((books)=>{
          console.log(books)

            setBooks(books)
        })
        .catch((err) => {
          console.log(err)
        })
    
  }
  useEffect(() => {
    fetchBooks()
    console.log(books)
  
}, [])


  return (
    <>
   
    <div style={{display :"flex"}}>
    <UserDashboard/>

    
    <div style={{ flex: 1, padding: '20px' }}>
  
  


      <label className="fs-14 fw-500 text-900 mb-1 mt-3">Books</label>
									
                                    <Select
                                        defaultValue={null}
                                        value={setSelectedBooks}
                                        options={books}
                                        getOptionLabel={(books) => books.bookName}
                                getOptionValue={(books) => books.bookName}
                            
                                isSearchable={false}
                                isClearable={true}
                                        onChange={(e) => {
                                            setSelectedBooks(e);
                                        
                                        }}
                                        isMulti
                                    />
 
    
         
        </div>
    </div>
    </>
  )
}

export default Order