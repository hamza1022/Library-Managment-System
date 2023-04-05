import React, { useState,useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import { BackendApi } from '../../api';
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from '../layout/sidebar';
import Swal from 'sweetalert2';


const Order = () => {


    const [orders,setOrders]= useState([])
   

    const fetchOrders =  () => {
     BackendApi.order.viewOrder()
        .then((order)=>{    
            setOrders(order)
        })
        .catch((err) => {
          console.log(err)
        })
    
  }
  useEffect(() => {
    fetchOrders()
    console.log(orders)
  
}, [])

const returnBook=(order)=>{
    console.log(order._id)
    BackendApi.order.returnOrder(order._id)
    .then((response)=>{

      Swal.fire({
        icon: 'success',
        title: 'You Order has been Returned Successfully',
        text: 'Thanks for returning your order',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500
        })
        .then(()=>{
          fetchOrders()

        })
       


    }).catch((error)=>{console.log("error", error)})

}


  return (
    <>
   
    <div style={{display :"flex"}}>
    <Sidebar/>

    
    <div style={{ flex: 1, padding: '20px' }}>

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Books</th>
          <th>fineAfterPerDay</th>
          <th>Status</th>
          <th>Fine</th>
          <th>Action</th>
      
        </tr>
      </thead>
      <tbody>
      {
        orders.map((order)=>{
            return (


                <tr key= {order._id}>
                <td>{order.books.map((book) => book.name).join(", ")}</td>
          <td>{order.fineAfterPerDay}</td>
          <td>{order.status}</td>
          <td>{order.fine}</td>
          <td>
          {
            order.status === "Returned" ? <td>{"Returned successfully"}</td> : 
            <button onClick={() =>returnBook(order)}>Return</button>

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

export default Order