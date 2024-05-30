import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Image
} from "react-bootstrap";
import {
    Sidebar,
    Menu,
    MenuItem
} from 'react-pro-sidebar';
import axios from 'axios';

import DashboardIcon from "../../assets/images/icon/dashboard.png";
import AprovalIcon from "../../assets/images/icon/aproval.png";

import '../../assets/css/style.css';

const MySideBar = () => {


    /* ================ Get Current User ================ */

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [admin, setAdmin] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentAdminRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentAdminResponse = currentAdminRequest.data;

                if (currentAdminResponse.status) {

                    setAdmin(currentAdminResponse.data.currentUser);

                }

            } catch (err) {

                setIsLoggedIn(false);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* ================ Get Current User ================ */


    /* ================ Active Side Bar ================ */

    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/dashboard')) {
            setActiveItem('dashboard');
        } else if (path.includes('/add-data')) {
            setActiveItem('addData');
        } else if (path.includes('/approval')) {
            setActiveItem('approval');
        }
    }, [location]);

    const handleClick = (item, path) => {
        setActiveItem(item);
        navigate(path);
    };

    /* ================ Active Side Bar ================ */
    

    return isLoggedIn ? (

        <Sidebar id='side-bar-content' style={{ height: '100%', border: 'none' }}>
            <Menu className='menu-content' style={{ height: '100%', border: 'none', backgroundColor: '#FFFFFF' }}>
                <MenuItem className="company-name">
                    <h1>SiCemar</h1>
                </MenuItem>
                <MenuItem 
                    className={`dashboard-content ${activeItem === 'dashboard' ? 'active' : ''}`}
                    onClick={() => handleClick('dashboard', '/dashboard')}
                >
                    <div className='d-flex align-items-center'>
                        <Image className='icon' src={DashboardIcon} />
                        <span style={{ marginLeft: '6%' }}> Dashboard </span>
                    </div>
                </MenuItem>
                {admin.role === 'government' && (
                    <MenuItem
                    className={`approval-data-content ${activeItem === 'approval' ? 'active' : ''}`}
                    onClick={() => handleClick('approval', '/approval')}
                >
                    <div className='d-flex align-items-center'>
                        <Image className='icon' src={AprovalIcon} />
                        <span style={{ marginLeft: '6%' }}> Approval </span>
                    </div>
                </MenuItem>
                )}
            </Menu>
        </Sidebar>

    ) : (navigate('/login'));

};

export default MySideBar;