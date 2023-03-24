import React from 'react';
import { useState, useEffect } from "react"
import { Route, Routes, useNavigate, Link } from "react-router-dom"
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
import Author from '../admin/author';
import Book from '../admin/book';
import EditBook from '../admin/edit-book';
import AddBook from '../admin/add-book';
import CreateAuthor from '../admin/authors/create-author';
import EditAuthor from '../admin/authors/edit-author';
import Users from '../admin/users/users';
import { useDispatch, useSelector } from 'react-redux'



export const  AppLayout = ()=>{

  const naviagte =useNavigate()
  const loggedInUser = useSelector((state) => state.user.value);
  const [anchorElUser, setAnchorElUser] = useState(null)

    const [openLoginDialog, setOpenLoginDialog] = useState(false)

    const handleLoginSubmit = (username, password) => {
        // loginUser(username, password)
        setOpenLoginDialog(false)
    }
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    naviagte('/admin/dashboard')
      setAnchorElUser(null)
  }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }

    const handleLogout = () => {
      window.localStorage.removeItem("token");
      naviagte('/')
      handleCloseUserMenu()
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
                                <Button
                                    onClick={() => {
                                        setOpenLoginDialog(true)
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button>
                            )}
                        </Box>
         
        </Toolbar>
      </AppBar>
      <Routes>
                <Route path="/books" exact element={<Bookslist />} />
                <Route path = "/admin/dashboard" exact element={<AdminDashboard />} />
                <Route path = "/register" exact element={<SignUp/>} />
                <Route path = "/registration/otp/:id" exact element={<Otp/>} />
                <Route path = "/admin/dashboard/book/edit/:id" exact element={<EditBook/>} />
                <Route path = "/admin/dashboard/author/edit/:id" exact element={<EditAuthor/>} />
                <Route path = "/admin/dashboard/books" exact element={<Book/>} />
                <Route path = "/admin/dashboard/authors" exact element={<Author/>} />
                <Route path = "/admin/dashboard/book/create" exact element={<AddBook/>} />
                <Route path = "/admin/dashboard/users" exact element={<Users/>} />
                <Route path = "/admin/dashboard/author/create" exact element={<CreateAuthor/>} />
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