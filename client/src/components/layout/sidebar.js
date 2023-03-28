import React, { useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export const Sidebar = () => {

	const navigate = useNavigate();
	const loggedInUser = useSelector((state) => state.user.value);
	



	return (
		<div style={{ display: 'flex' }}>
        <div style={{ 
            width: '200px',
            backgroundColor: '#f2f2f2',
            padding: '20px',
            height:'100vh'
          }}>
         <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>

          <NavLink
							to={"/admin/dashboard/books"}
							className="pointer"  style={{ display: 'block', marginBottom: '10px', color: '#000' }}>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
							<span className="side-link">Books</span>
						</NavLink>
          <NavLink
							to={"/admin/dashboard/authors"}
							className="pointer"
                            style={{ display: 'block', marginBottom: '10px', color: '#000' }}
							>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
							<span className="side-link">Authors </span>
						</NavLink>
                        <NavLink
							to={"/admin/dashboard/users"}
							className="pointer"
                            style={{ display: 'block', marginBottom: '10px', color: '#000' }}
							>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
							<span className="side-link">Users </span>
						</NavLink>

						<NavLink
							to={"/admin/dashboard/orders"}
							className="pointer"
                            style={{ display: 'block', marginBottom: '10px', color: '#000' }}
							>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
							<span className="side-link">Orders </span>
						</NavLink>
          
          
        </ul>
        </div>
       
      </div>
	);
};
