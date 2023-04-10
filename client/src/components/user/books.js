import React, { useState,useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import { BackendApi } from '../../api';
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from '../layout/sidebar';





const Books = () => {


    const [books,setBooks]= useState([])
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);


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

      const Buy= (book)=>{
        navigate(`/user/placeorder/${book._id}`)
      }

      



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
    <Sidebar/>

    
    <div style={{ flex: 1, padding: '20px' }}>
  
      <input type="text" value={searchText} onChange={handleChange} />
 
    
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Book Name</th>
          <th>Book Price</th>
          <th>Book Title</th>
          <th>Author</th>
          <th>Status</th>
          <th>Action</th>
      
        </tr>
      </thead>
      <tbody>
      {
        booksToDisplay.map((book)=>{
            return (


            <tr key= {book._id}>
          <td>{book.name}</td>
          <td>{book.price}</td>
          <td>{book.title}</td>
          <td>{book.Author?.name}</td>
          <td>
          {book.status}
          </td>
          <td>
          {
            book.status === "Available" ?  <button onClick={() =>Buy(book)}>Buy</button>
            :  <button style={{color: "red"}}>Buy</button>
          }
         
          </td>
        </tr>

            )

        })
      }
      
    
      </tbody>
    </Table>
        </div>
    </div>
    </>
  )
}

export default Books