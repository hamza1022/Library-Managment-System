import React, { useState,useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import { BackendApi } from '../../../api';
import { Sidebar } from '../../layout/sidebar';


const Orders = () => {


    const [orders,setOrders]= useState([])
   

    const fetchOrders =  () => {
        BackendApi.order.allOrders()
        .then((order)=>{ 
               
            setOrders(order)
            console.log("orders",order)
        })
        .catch((err) => {
          console.log(err)
        })
    
  }
  useEffect(() => {
    fetchOrders()
    console.log(orders)
  
}, [])



  return (
    <>
   
    <div style={{display :"flex"}}>
    <Sidebar/>

    
    <div style={{ flex: 1, padding: '20px' }}>

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Books</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Fine</th>
      
        </tr>
      </thead>
      <tbody>
      {
        orders.map((order)=>{
            return (


                <tr key= {order._id}>
                <td>{order.books?.map((book) => book.name).join(", ")}</td>
                <td>{order.customer?.name}</td>
          
          <td>{order.status}</td>
          <td>{order.fine}</td>
    
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