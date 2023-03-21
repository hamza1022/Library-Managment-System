import React from 'react';
import { useState, useEffect } from "react"
import { Route, Routes, Navigate, Link } from "react-router-dom"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material"

import MenuIcon from '@mui/icons-material/Menu';
import Bookslist from '../books/books-list'
import { AdminDashboard } from "../admin/dashboard";
import { LoginDialog } from "../signUp/dialog";
import  SignUp from "../registration/signUp"
import { Sidebar } from "./sidebar";
import Otp from '../registration/otp'
import Login from '../Auth/login';



export const  AppLayout = ()=>{

    const [openLoginDialog, setOpenLoginDialog] = useState(false)

    const handleLoginSubmit = (username, password) => {
        // loginUser(username, password)
        setOpenLoginDialog(false)
    }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }



return(

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Library Managment System
          </Typography>
         
        </Toolbar>
      </AppBar>
      <Routes>
                <Route path="/books" exact element={<Bookslist />} />
                <Route path = "/admin/dashboard" exact element={<AdminDashboard />} />
                <Route path = "/register" exact element={<SignUp/>} />
                <Route path = "/registration/otp/:id" exact element={<Otp/>} />
                <Route path = "/" exact element={<Login/>} />

            

            </Routes>
            <LoginDialog
                open={openLoginDialog}
                handleSubmit={handleLoginSubmit}
                handleClose={handleLoginClose}
            />
    </Box>

    
)




}