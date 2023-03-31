import React, { useContext } from 'react';
import { useState, useEffect } from "react"
import { Route, Routes, useNavigate,Navigate, Link } from "react-router-dom"
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

import SignUp from "../registration/signUp"
import { Sidebar } from "./sidebar";
import Otp from '../registration/otp'
import Login from '../Auth/login';
import Author from '../admin/authors/author';
import Book from '../admin/books/book';
import EditBook from '../admin/books/edit-book';
import AddBook from '../admin/books/add-book';
import CreateAuthor from '../admin/authors/create-author';
import EditAuthor from '../admin/authors/edit-author';
import Users from '../admin/users/users';
import { useDispatch, useSelector } from 'react-redux'

import Authors from '../user/authors';
import Books from '../user/books';
import PlaceOrder from '../user/placeOrder';
import Order from '../user/orders';
import Orders from '../admin/orders/orders';
import Profile from '../user/profile';
import { BackendApi } from '../../api';
import { SetUser , logout} from '../../store/user';
import { Paths } from '../constants/paths';
import Forgot from '../Auth/forgot';
import Reset from '../Auth/reset';





export const AppLayout = () => {

    
    
  const dispatch = useDispatch();

    const naviagte = useNavigate()
    const loggedInUser = useSelector((state) => state.user.value);
    console.log("logged user from redux",loggedInUser)
  
    const [anchorElUser, setAnchorElUser] = useState(null)

    useEffect(() => {

        
        if(localStorage.getItem('token') ){
            BackendApi.user.getContext()
            .then((user)=>{
              if(user.status === "active" || user.isOtpVerified === "true"){
                dispatch(SetUser(user))
  
  
              }
            })
  
  
          }
    }, [])
    





    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
  


    const handleLogout = () => {
       dispatch(logout())
        naviagte('/')
        handleCloseUserMenu()
    }




    return (

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
                    <Box
                        sx={{
                            flexGrow: 0,
                        }}
                    >
                        {loggedInUser ? (
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar> {loggedInUser.name} </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Dashboard</Typography>
                                    </MenuItem>

                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button>
                                Login
                            </Button>
                        )}
                    </Box>

                </Toolbar>
            </AppBar>
            <Routes>
       <>
            {loggedInUser.role === "admin" && (
                <>
                    <Route path="/admin/dashboard/book/edit/:id" exact element={<EditBook />} />
                    <Route path="/admin/dashboard" exact element={<Sidebar />} />
                    <Route path="/admin/dashboard/author/edit/:id" exact element={<EditAuthor />} />
                    <Route path="/admin/dashboard/books" exact element={<Book />} />
                    <Route path="/admin/dashboard/orders" exact element={<Orders />} />
                    <Route path="/admin/dashboard/authors" exact element={<Author />} />
                    <Route path="/admin/dashboard/book/create" exact element={<AddBook />} />
                    <Route path="/admin/dashboard/users" exact element={<Users />} />
                    <Route path="/admin/dashboard/author/create" exact element={<CreateAuthor />} />
                </>
            )}
            {loggedInUser.role === "user" && (
                <>
                    <Route path="/user/dashboard" exact element={<Sidebar />} />
                    <Route path="/user/authors" exact element={<Authors />} />
                    <Route path="/user/books" exact element={<Books />} />
                    <Route path="/user/placeorder" exact element={<PlaceOrder />} />
                    <Route path="/user/order" exact element={<Order />} />
                    <Route path="/user/profile" exact element={<Profile />} />
                </>
            )}
            {Object.keys(loggedInUser).length === 0 && (
  <Route path="*" element={<Navigate to={Paths[loggedInUser?.role]} />} />
)}
            
            <Route path="/" exact element={<Login />} />
                    <Route path="/registration/otp/:id/:type" exact element={<Otp />} />
                    <Route path="/reset-password/:passwordRestToken" exact element={<Reset />} />
                    <Route path="/forgot" exact element={<Forgot />} />
                    <Route path="/register" exact element={<SignUp />} />
            
                    <Route path="*" element={<Navigate to={"/"} />} />
           
        </>
    
</Routes>



        </Box>


    )




}