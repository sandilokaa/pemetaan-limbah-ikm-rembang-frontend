import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Button
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AvatarProfile from "../../assets/images/icon/avatar.png";
import ArrowDownIcon from "../../assets/images/icon/arrow-down.png";

import "../../assets/css/style.css";

const NavbarDashboard = () => {

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

                console.log(currentAdminResponse);

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


    /* ================ Dropdown Logout ================ */

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const onLogout = () => {

        localStorage.removeItem('token');

        window.location.href = '/';

    };

    /* ================ Dropdown Logout ================ */

    return isLoggedIn ? (

        <Container fluid style={{ padding: '0 4%' }}>
            <Row style={{ height: '80px' }}>
                <Col xs={12} xl={12} className="d-flex justify-content-end">
                    <div className="d-flex align-items-center" style={{zIndex: '999'}}>
                        <Image src={AvatarProfile} style={{ marginRight: '10px', maxWidth: '50px' }} />
                        <span style={{ maxWidth: 'calc(100% - 60px)', color: '#FFFFFF', marginRight: '10px' }}>{admin.name === "pemerintahrembang" ? "Pemerintah Rembang" : admin.name === "IKMrembang" ? "IKM Rembang" : null}</span>
                        <Image
                            src={ArrowDownIcon}
                            style={{ maxWidth: 'calc(100% - 60px)', cursor: 'pointer' }}
                            onClick={toggleDropdown}
                        />
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                backgroundColor: '#FFFFFF',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                                zIndex: 100,
                                width: '180px',
                                padding: '10px',
                                borderRadius: '4px'
                            }}>
                                <div
                                    style={{
                                        padding: '10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Button 
                                        style={{width: '100%', backgroundColor:'#EE2A2A', border: '#EE2A2A'}}
                                        onClick={onLogout}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>

    ) : (navigate("/login"));

};

export default NavbarDashboard;