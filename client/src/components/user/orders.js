import React, { useState,useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import { BackendApi } from '../../api';
import { UserDashboard } from './user-dashboard';
import { useNavigate, useParams } from "react-router-dom";



const Orders = () => {


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

        console.log("response", response)

    })

}


  return (
    <>
   
    <div style={{display :"flex"}}>
    <UserDashboard/>

    
    <div style={{ flex: 1, padding: '20px' }}>

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Books</th>
          <th>fineAfterPerDay</th>
          <th>Status</th>
          <th>Action</th>
      
        </tr>
      </thead>
      <tbody>
      {
        orders.map((order)=>{
            return (


                <tr key= {order._id}>
                <td>{order.books.map((book) => book.bookName).join(", ")}</td>
          <td>{order.fineAfterPerDay}</td>
          <td>{order.status}</td>
          <td>
          <button onClick={() =>returnBook(order)}>Return</button>
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

export default Orders