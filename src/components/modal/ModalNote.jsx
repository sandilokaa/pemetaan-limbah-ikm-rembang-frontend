import React, { useRef } from "react";
import {
    Row,
    Col,
    Modal
} from "react-bootstrap";

import "../../assets/css/style.css";

const ModalNote = ({ showModal, closeModal, data }) => {

    return (

        <Modal show={showModal} onHide={closeModal} size="md">
            <Modal.Header closeButton style={{ border: 'none' }}>
                <Modal.Title style={{ fontSize: '20px', fontWeight: '600' }}>Detail Revisi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data ? (
                    <Row key={data.id}>
                        <Col xs={12} xl={12}>
                            <p>{data.Decision.information}</p>
                        </Col>
                    </Row>
                ) : (
                    <> <p>Loading...</p> </>
                )}
            </Modal.Body>
        </Modal>

    );

};

export default ModalNote;