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

import DashboardIcon from "../../assets/images/icon/dashboard.png";
import AddDataIcon from "../../assets/images/icon/add-data.png";
import AprovalIcon from "../../assets/images/icon/aproval.png";

import '../../assets/css/style.css';

const MySideBar = () => {

    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

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

    return (

        <Sidebar id='side-bar-content' style={{ height: '100vh', border: 'none' }}>
            <Menu className='menu-content' style={{ height: '100vh', border: 'none', backgroundColor: '#FFFFFF' }}>
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
                <MenuItem
                    className={`add-data-content ${activeItem === 'addData' ? 'active' : ''}`}
                    onClick={() => setActiveItem('addData')}
                >
                    <div className='d-flex align-items-center'>
                        <Image className='icon' src={AddDataIcon} />
                        <span style={{ marginLeft: '6%' }}> Tambah Sungai </span>
                    </div>
                </MenuItem>
                <MenuItem
                    className={`approval-data-content ${activeItem === 'approval' ? 'active' : ''}`}
                    onClick={() => handleClick('approval', '/approval')}
                >
                    <div className='d-flex align-items-center'>
                        <Image className='icon' src={AprovalIcon} />
                        <span style={{ marginLeft: '6%' }}> Approval </span>
                    </div>
                </MenuItem>
            </Menu>
        </Sidebar>

    );

};

export default MySideBar;