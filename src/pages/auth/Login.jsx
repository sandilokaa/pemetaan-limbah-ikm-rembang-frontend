import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Form,
    Image,
    InputGroup
} from "react-bootstrap";

import LoginBackground from "../../assets/images/background/login-bg.png";
import OpenEyeIcon from "../../assets/images/icon/eye-open.png";
import ClosedEyeIcon from "../../assets/images/icon/eye-closed.png";

import "../../assets/css/style.css";

const LoginAdmin = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (

        <div id="login-content">
            <Container>
                <Row>
                    <Col xs={12} xl={{ span: 10, offset: 1 }}>
                        <Card>
                            <Card.Body className="p-0">
                                <Row>
                                    <Col xs={12} xl={6} className="login-bg-content">
                                        <Image src={LoginBackground} className="w-100 h-100" style={{ borderRadius: '10px 0 0 10px' }} />
                                    </Col>
                                    <Col xs={12} xl={6} className="login-form-content">
                                        <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                            <h1>Login</h1>
                                            <p>Silahkan masuk untuk akses dashboard</p>
                                            <Form className="form-login">
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                    <Form.Label style={{ fontWeight: '600' }}>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="mail@heylaw.id" />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                    <Form.Label style={{ fontWeight: '600' }}>Password</Form.Label>
                                                    <div className="password-container">
                                                        <Form.Control
                                                            type={showPassword ? 'text' : 'password'}
                                                            placeholder="Min 8 characters"
                                                            className="password-input"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="toggle-button"
                                                            onClick={togglePasswordVisibility}
                                                        >
                                                            <Image src={showPassword ? OpenEyeIcon : ClosedEyeIcon} style={{height:'20px', width: '20px'}}/>
                                                        </button>
                                                    </div>
                                                </Form.Group>
                                            </Form>
                                            <Button className="btn-login-page">Masuk</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

    );

};

export default LoginAdmin;