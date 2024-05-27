import React from 'react';
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';

import '../../assets/css/style.css';

const MySideBar = () => {

    return (

        <Sidebar style={{ height: '100vh', border: 'none' }}>
            <Menu>
                <MenuItem className="company-name"> COCOTE MELON </MenuItem>
                <MenuItem> Home </MenuItem>
                <MenuItem> Dashboard </MenuItem>
                <SubMenu label="Action">
                    <MenuItem> Update River Data </MenuItem>
                    <MenuItem> Decision River Data </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>

    );

};

export default MySideBar;