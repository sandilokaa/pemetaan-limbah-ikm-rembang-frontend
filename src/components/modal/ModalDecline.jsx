import React, { useRef } from "react";
import {
    Row,
    Col,
    Modal,
    Button,
    Form
} from "react-bootstrap";
import axios from "axios";
import { useSnackbar } from 'notistack';

import "../../assets/css/style.css";

const ModalDecline = ({ showModal, closeModal, data }) => {

    const { enqueueSnackbar } = useSnackbar();

    console.log(data);

    const governmentNameField = useRef();
    const informationField = useRef();

    const onUpdateDecision = async () => {

        try {

            const token = localStorage.getItem("token");

            const decisionPayload = {
                governmentName: governmentNameField.current.value,
                information: informationField.current.value,
                decision: 'not approved'
            }

            const updateRequest = await axios.put(
                `http://localhost:8080/api/v1/decisions/${data}`,
                decisionPayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            const updateResponse = updateRequest.data;

            enqueueSnackbar(updateResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 5000 });

            if (updateResponse.status) {

                window.location.reload("/approval")

            }

        } catch (err) {

            enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 5000 });

        }

    };

    return (

        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title style={{ fontSize: '20px', fontWeight: '600' }}>Form Keterangan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={12} xl={12}>
                        <Form className="form-not-approved">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label style={{ fontWeight: '600' }}>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    style={{ height: '56px' }}
                                    autoComplete="off"
                                    ref={governmentNameField}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} xl={12}>
                        <Form className="form-not-approved">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                <Form.Label style={{ fontWeight: '600' }}>Keterangan</Form.Label>
                                <Form.Control
                                    autoComplete="off"
                                    as="textarea"
                                    rows={4}
                                    ref={informationField}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={closeModal}
                    style={{ backgroundColor: 'transparent', color: '#338FFA', border: '1px solid #338FFA' }}
                >
                    Batalkan
                </Button>
                <Button
                    style={{ backgroundColor: '#338FFA', color: '#FFFFFF', border: '1px solid #338FFA' }}
                    onClick={onUpdateDecision}
                >
                    Simpan Perubahan
                </Button>
            </Modal.Footer>
        </Modal>

    );

};

export default ModalDecline;