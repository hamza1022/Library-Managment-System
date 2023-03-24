import React from 'react';
import { NavLink } from 'react-router-dom';


export const UserDashboard = ()=>{
    return(

        <div style={{ display: 'flex' }}>
        <div style={{ 
            width: '200px',
            backgroundColor: '#f2f2f2',
            padding: '20px',
            height:'100vh'
          }}>
         <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>

          <NavLink
							to={"/user/books"}
							className="pointer"  style={{ display: 'block', marginBottom: '10px', color: '#000' }}>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
							<span className="side-link">Books</span>
						</NavLink>
          <NavLink
							to={"/user/authors"}
							className="pointer"
                            style={{ display: 'block', marginBottom: '10px', color: '#000' }}
							>
                            
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
							<span className="side-link">Authors </span>
						</NavLink>
                        <NavLink
							to={"/user/orders"}
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

       
    )
}