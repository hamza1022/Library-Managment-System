import React, { useState, useEffect } from 'react'
import { AdminDashboard } from '../dashboard'

import { useNavigate, useParams } from "react-router-dom";
import { BackendApi } from '../../../api';
import Select from "react-select";

const EditBook = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [authors, setAuthors] = useState([])

  const getAuthors = () => {
    BackendApi.author.getAllAuthors()
      .then((authors) => {
        setAuthors(authors)

      }).catch(err => console.log(err))
  }

  useEffect(() => {

    getAuthors()



  }, [])

  console.log("Selected", selectedAuthor)

  const handleSubmit = (event) => {
    console.log("clicked")

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries())

    BackendApi.book.editBook(id, data, selectedAuthor._id)
      .then((res) => {
        navigate(-1);

        console.log("res retrieved", res)

      })
      .catch((err) => {
        console.log("err", err)

      })



  }
  return (

    <div style={{ display: "flex" }}>
      <AdminDashboard />

      <div style={{ flex: 1, padding: '20px' }}>
        <p>this is edit page</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Book Name</label>
            <input type="text" className="form-control" id="bookName" name='bookName' placeholder="Enter Book name" />
          </div>
          <div className="form-group">
            <label htmlFor="titleInput">Book Title </label>
            <input type="text" className="form-control" id="bookTitle" name='bookTitle' placeholder="Enter Book Title" />
          </div>
          <div className="form-group">
            <label htmlFor="priceInput">Book Price</label>
            <input type="number" className="form-control" id="bookPrice" name='bookPrice' placeholder="Enter Book Price" />
          </div>
          {/* <div className="form-group">
        <label htmlFor="passwordInput">Author</label>
        <input type="text" className="form-control" id="Author"  name='Author' placeholder="Enter Author" />
      </div> */}

          <label className="fs-14 fw-500 text-900 mb-1 mt-3">Author</label>

          <Select
            defaultValue={null}
            value={selectedAuthor}
            options={authors}
            getOptionLabel={(authors) => authors.name}
            getOptionValue={(authors) => authors.name}

            isSearchable={false}
            isClearable={true}
            onChange={(e) => {
              setSelectedAuthor(e);

            }}
          />
          <button type="submit" className="btn btn-primary">Edit</button>
        </form>

      </div>
    </div>
  )
}

export default EditBook