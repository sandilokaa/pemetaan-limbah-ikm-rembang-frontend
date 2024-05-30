import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import "../../assets/css/style.css";

const FooterDashboard = () => {

    return (

        <div id="footer">
            <Container fluid style={{ padding: '0 4%' }}>
                <Row style={{padding: '1% 0'}}>
                    <Col xs={12} xl={12} className="d-flex justify-content-center">
                        <div className="d-flex align-items-center">
                            <span>Tim Keyozz © 2024</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    );

};

export default FooterDashboard;