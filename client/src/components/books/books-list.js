import React,{useEffect, useState} from 'react'
import  {BackendApi}  from "../../api"
import { Link as RouterLink } from "react-router-dom"
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Card,
    CardContent,
    CardActions,
    Typography,
    TablePagination,
} from "@mui/material"
import classes from "./style.module.css"



const BooksLis = () => {

    const [books, setBooks] = useState([])
    const [borrowedBook, setBorrowedBook] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [activeBookIsbn, setActiveBookIsbn] = useState("")
    const [openModal, setOpenModal] = useState(false)


     
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
    const deleteBook = () => {
        if (activeBookIsbn && books.length) {
            BackendApi.book.deleteBook(activeBookIsbn).then(({ success }) => {
                fetchBooks().catch(console.error)
                setOpenModal(false)
                setActiveBookIsbn("")
            })
        }
    }

    useEffect(() => {
        fetchBooks()
        // console.log(books)
      
    }, [])

  return (
    <>
      <div className={`${classes.pageHeader} ${classes.mb2}`}>
                <Typography variant="h5">Book List</Typography>
               
            </div>
            {books.length > 0 ? (
                <>
                    <div className={classes.tableContainer}>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">Author</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : books
                                    ).map((book) => (
                                        <TableRow key={book._id}>
                                            <TableCell component="th" scope="row">
                                                {book.bookName}
                                            </TableCell>
                                           
                                            <TableCell>{book.bookTitle}</TableCell>
                                            <TableCell align="right">{book.bookPrice}</TableCell>
                                            <TableCell align="right">{book.status}</TableCell>
                                            <TableCell align="right">{book.Author?.name}</TableCell>
                                          
                                            <TableCell>
                                            <Button
                                                        variant="contained"
                                                        component={RouterLink}
                                                        size="small"
                                                        to={`/books/${book.isbn}`}
                                                    >
                                                        View
                                                    </Button>
                                            </TableCell>
                                           
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            onRowsPerPageChange={(e) => {
                                setRowsPerPage(parseInt(e.target.value, 10))
                                setPage(0)
                            }}
                            component="div"
                            count={books.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                        <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
                            <Card className={classes.conf_modal}>
                                <CardContent>
                                    <h2>Are you sure?</h2>
                                </CardContent>
                                <CardActions className={classes.conf_modal_actions}>
                                    <Button variant="contained" onClick={() => setOpenModal(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={deleteBook}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Modal>
                    </div>
                </>
            ) : (
                <Typography variant="h5">No books found!</Typography>
            )}



    </>
    
  )
}

export default BooksLis 