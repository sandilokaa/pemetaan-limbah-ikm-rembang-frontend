import React from "react";

import MySideBar from "../../components/sidebar/SideBar";
import NavbarDashboard from "../../components/navbar/NavbarDashboard";
import FooterDashboard from "../../components/footer/FooterDashboard";

const DashboardLayout = ({ navbarDashboard, children }) => {

    return (

        <div style={{ display: 'flex' }}>
            <div>
                <MySideBar />
            </div>
            <div style={{ width: '100%', backgroundColor: '#FAFAFA' }}>
                <div style={{ backgroundColor: '#2A78EE' }}>
                    <NavbarDashboard />
                </div>
                <div>
                    {children}
                </div>
                <div style={{ backgroundColor: '#FFFFFF' }}>
                    <FooterDashboard />
                </div>
            </div>
        </div>

    );

};

export default DashboardLayout;