import React, { useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";


export const Sidebar = () => {

	const navigate = useNavigate();


	const handleLogout = () => {
		// navigate("/auth");
		// dispatch(purgeAuth());
	};
	const homeNav = (e) => {
		// e.stopPropagation();
		// if (document.body.classList.contains("home-sm")) {
		// 	document.body.classList.remove("home-sm");
		// }
		// setActive(false);
	};

	return (
		<div className="h-100">
			<div className="top-content ">
				<ul>
					<li>
						<div className="sm-user d-lg-none d-flex flex-column align-items-center justify-content-center">
							<div className="sm-profile mb-2">
								{/* <img src={loggedInUser?.profileImage} alt="" /> */}
							</div>
							{/* <div className="fs-13 fw-500 text-700 logged-in-user-name">{loggedInUser?.firstName}</div> */}
						</div>
					</li>

					<li>
						<NavLink
							to="/"
							className="pointer"
							onClick={(e) => {
								homeNav(e);
							}}>
							<span className="side-ic">
								<span className="iconify" data-icon="material-symbols:dashboard-customize"></span>
							</span>
							<span className="side-link">Jobs</span>
						</NavLink>
					</li>
					
					<li>
						<NavLink
							to={"/calendar"}
							className="pointer"
							onClick={(e) => {
								homeNav(e);
							}}>
							<span className="side-ic">
								<span className="iconify" data-icon="uim:calender"></span>
							</span>
							<span className="side-link">Calendar</span>
						</NavLink>
					</li>
					<li>
						<NavLink
							to={"/settings"}
							className="pointer"
							onClick={(e) => {
								homeNav(e);
							}}>
							<span className="side-ic">
								<span className="iconify" data-icon="uiw:setting"></span>
							</span>
							<span className="side-link">Settings</span>
						</NavLink>
					</li>

					{/* {loggedInUser.role === "subAdmin" && (
						<>
							<li>
								<NavLink
									end
									to={"/admin"}
									className="pointer text-center"
									onClick={(e) => {
										homeNav(e);
									}}>
									<span className="side-ic">
										<span className="iconify" data-icon="flat-color-icons:manager"></span>
									</span>
									<span className="side-link">Handymen</span>
								</NavLink>
							</li>
						</>
					)} */}

					{/* {loggedInUser.role === "admin" && (
						<>
							<li>
								<NavLink
									end
									to={"/admin"}
									className="pointer text-center"
									onClick={(e) => {
										homeNav(e);
									}}>
									<span className="side-ic">
										<span className="iconify" data-icon="flat-color-icons:manager"></span>
									</span>
									<span className="side-link">Handymen</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/admin/handyman-manager"}
									className="pointer text-center"
									onClick={(e) => {
										homeNav(e);
									}}>
									<span className="side-ic">
										<span className="iconify" data-icon="flat-color-icons:manager"></span>
									</span>
									<span className="side-link">Handymen Managers</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/admin/managers"}
									className="pointer "
									onClick={(e) => {
										homeNav(e);
									}}>
									<span className="side-ic">
										<span className="iconify" data-icon="flat-color-icons:manager"></span>
									</span>
									<span className="side-link">Managers</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/admin/companies"}
									className="pointer "
									onClick={(e) => {
										homeNav(e);
									}}>
									<span className="side-ic">
										<span className="iconify" data-icon="ri:building-2-fill"></span>
									</span>
									<span className="side-link">Companies</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/admin/categories"}
									className="pointer "
									onClick={(e) => {
										homeNav(e);
									}}>
									<span className="side-ic">
										<span className="iconify" data-icon="mdi:category-plus"></span>
									</span>
									<span className="side-link">Categories</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/admin/locations"}
									className="pointer "
									onClick={(e) => {
										homeNav(e);
									}}>
									<span className="side-ic">
										<span className="iconify" data-icon="material-symbols:my-location-outline-rounded"></span>
									</span>
									<span className="side-link">Locations</span>
								</NavLink>
							</li>
						</>
					)} */}

					<li>
						<NavLink
							to={"/auth"}
							className="pointer"
							onClick={(e) => {
								handleLogout();
									homeNav(e);
							}}>
							<span className="side-ic">
								<span className="iconify" data-icon="ant-design:logout-outlined"></span>
							</span>
							<span className="side-link">Log Out</span>
						</NavLink>
					</li>

				</ul>
			</div>
		</div>
	);
};
