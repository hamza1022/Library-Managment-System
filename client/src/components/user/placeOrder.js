import React, { useState, useEffect } from 'react'


import { BackendApi } from '../../api';
import { UserDashboard } from './user-dashboard';
import Select from "react-select";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const PlaceOrder = () => {
  const navigate = useNavigate()


  const loggedInUser = useSelector((state) => state.user.value);
  const [selectedBooks, setSelectedBooks] = useState(null)
  const [books, setBooks] = useState([])
  console.log("Selected", selectedBooks)



  const fetchBooks = () => {
    BackendApi.book.getAllBooks()
      .then((books) => {
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


  const handleSubmit = () => {
    if (selectedBooks) {
      const bookIds = selectedBooks.map((book) => book._id);

      BackendApi.order.placeOrder(loggedInUser._id, bookIds)
        .then((order) => {
          navigate("user/order")
          console.log(order)

        })
        .catch((err) => { console.log(err) })


      console.log(bookIds);
    } else {
      console.log("No books selected.");
    }
  };


  return (
    <>

      <div style={{ display: "flex" }}>
        <UserDashboard />


        <div style={{ flex: 1, padding: '20px' }}>

          <div>

            <h1>Buy Books</h1>
          </div>




          <label className="fs-14 fw-500 text-900 mb-1 mt-3">Books</label>

          <Select
            defaultValue={null}
            value={selectedBooks}
            options={books}
            getOptionLabel={(book) => book.bookName}
            getOptionValue={(book) => book._id}
            isSearchable={false}
            isClearable={true}
            onChange={(selected) => {
              setSelectedBooks(selected);
            }}
            isMulti
          />
          <div className="col-lg-6">
            <button
              className="btnPrimary pointer mt-4 h-56 w-100 br-16"
              onChange={(e) => {
                setSelectedBooks(e);

              }}
              onClick={(e) => {
                handleSubmit(e)
              }}
            >
              Place Order
            </button>
          </div>



        </div>
      </div>
    </>
  )
}

export default PlaceOrder