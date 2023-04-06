import React, { useState, useEffect } from 'react'


import { BackendApi } from '../../api';
import Select from "react-select";
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { Sidebar } from '../layout/sidebar';
import Swal from 'sweetalert2';



const PlaceOrder = () => {
  const navigate = useNavigate()
  let {id} = useParams()
  console.log(id)


  const loggedInUser = useSelector((state) => state.user.value);
  const [selectedBooks, setSelectedBooks] = useState(null)
  const [books, setBooks] = useState([])
  const [book,setBook]= useState({})
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
  const getBookById= (id)=>{
    BackendApi.book.getOneById(id)
    .then((book)=>{
      setBook(book)
      console.log("one book", book)

    })

  }


  useEffect(() => {
    fetchBooks()
    getBookById()
    

  }, [])


  const handleSubmit = () => {
    if (selectedBooks) {
      const bookIds = selectedBooks.map((book) => book._id);

      BackendApi.order.placeOrder(loggedInUser._id, bookIds)
        .then((order) => {

          Swal.fire({
            icon: 'success',
            title: 'You Order has been placed Successfully',
            text: 'Thanks for Shooping',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500
            })
            .then(()=>{
              navigate('/user/order')
              console.log("order create", order)

            })
         

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
        <Sidebar />


        <div style={{ flex: 1, padding: '20px' }}>

          <div>

            <h2>Want to order more books</h2>
          </div>




          <label className="fs-14 fw-500 text-900 mb-1 mt-3">Books</label>

          <Select
            defaultValue={null}
            value={selectedBooks}
            options={books}
            getOptionLabel={(book) => book.name}
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
                                    <h1 className='text-xl font-bold mb-6 text-center'style={{marginTop:40}}> Order Summary</h1>
          <div className="card p-5 float-left" >

                                    <div className='mb-2 flex justify-between'>
                                        <div className=''>Total Books :</div>
                                        <div className='mr-9'>

                                            {/* {items.reduce((a, c) => a + c.quantity , 0)} */}

                                        </div>


                                    </div>
                                    <div className='mb-[50px] flex justify-between'>
                                        <div>Total Amount:</div>
                                        <div className='mr-6'>
                                            {/* {items.reduce((a, c) => a + c.quantity * c.price, 0)} */}
                                        </div>
                                    </div>

                                    

                                    
                                   
                                    <div className='mt-2'>

                                  
                                
                                                </div>
                                </div>



        </div>
      </div>
    </>
  )
}

export default PlaceOrder