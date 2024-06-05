import React, { useState, useEffect } from "react";
import {
    Container,
    Nav,
    Navbar,
    Button
} from "react-bootstrap";

import "../../assets/css/style.css";

const NavbarGeneral = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled)
            }
        }
        
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrolled]);

    return (

        <Navbar expand="lg" className={scrolled ? "navbar-scrolled" : "navbar"} fixed="top">
            <Container>
                <Navbar.Brand onClick={() => window.location.href = '/'} className={scrolled ? "navbar-brand-scrolled" : "navbar-brand"}>SiCemar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => window.location.href = '/'} className={scrolled ? "nav-link-scrolled" : "nav-link"}>Home</Nav.Link>
                    </Nav>
                    <Button className={scrolled ? "btn-auth-scrolled" : "btn-auth"} onClick={() => window.location.href = '/login'}>Masuk</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );

};

export default NavbarGeneral;