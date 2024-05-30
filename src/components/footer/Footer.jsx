import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import "../../assets/css/style.css";

const FooterGeneral = () => {

    return (

        <div id="footer">
            <Container>
                <Row>
                    <Col xs={12} xl={12} className="d-flex justify-content-center">
                        <p>Tim Keyozz © 2024</p>
                    </Col>
                </Row>
            </Container>
        </div>

    );

};

export default FooterGeneral;