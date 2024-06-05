import React, { useState, useRef } from "react";
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

const ModalDashboard = ({ showModal, closeModal, data }) => {

    const { enqueueSnackbar } = useSnackbar();

    const [selectedFile, setSelectedFile] = useState(null);
    const riverNameField = useRef();
    const phField = useRef();
    const bodField = useRef();
    const codField = useRef();
    const colorLevelField = useRef();

    const handleFilePicture = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const onUpdateRiver = async () => {

        try {

            const token = localStorage.getItem("token");

            const updatePayload = new FormData();

            const phValue = phField.current.value === "-" ? 0 : parseFloat(phField.current.value) || 0;
            const bodValue = bodField.current.value === "-" ? 0 : parseFloat(bodField.current.value) || 0;
            const codValue = codField.current.value === "-" ? 0 : parseFloat(codField.current.value) || 0;
            const colorLevelValue = colorLevelField.current.value === "-" ? 0 : parseFloat(colorLevelField.current.value) || 0;

            updatePayload.append('name', riverNameField.current.value);
            updatePayload.append('bod', bodValue);
            updatePayload.append('cod', codValue);
            updatePayload.append('ph', phValue);
            updatePayload.append('colorLevel', colorLevelValue);
            updatePayload.append('quality', parseFloat((
                (bodValue * 0.40) + 
                (codValue * 0.30) + 
                (phValue * 0.20) + 
                (colorLevelValue * 0.10)
            )).toFixed(2));
            if (selectedFile) {
                updatePayload.append('picture', selectedFile);
            }

            const updateRequest = await axios.put(
                `http://localhost:8080/api/v1/rivers/${data.id}`,
                updatePayload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );

            const updateResponse = updateRequest.data;

            enqueueSnackbar(updateResponse.message, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 5000 });

            if (updateResponse.status) {

                window.location.reload("/dashboard")

            }

        } catch (err) {

            enqueueSnackbar(err.message, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' }, autoHideDuration: 5000 });

        }

    };

    return (

        <Modal show={showModal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title style={{ fontSize: '20px', fontWeight: '600' }}>Edit data sungai</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data ? (
                    <>
                        <Row>
                            <Col xs={12} xl={12}>
                                <Form className="form-login">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label style={{ fontWeight: '600' }}>Nama Sungai</Form.Label>
                                        <Form.Control
                                            type="text"
                                            style={{ height: '56px' }}
                                            autoComplete="off"
                                            placeholder={data.name}
                                            defaultValue={data.name}
                                            ref={riverNameField}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} xl={6}>
                                <Form className="form-login">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label style={{ fontWeight: '600' }}>Tingkat PH</Form.Label>
                                        <Form.Control
                                            type="text"
                                            style={{ height: '56px' }}
                                            autoComplete="off"
                                            placeholder={data.ph}
                                            ref={phField}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={12} xl={6}>
                                <Form className="form-login">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label style={{ fontWeight: '600' }}>Tingkat BOD</Form.Label>
                                        <Form.Control
                                            type="text"
                                            style={{ height: '56px' }}
                                            autoComplete="off"
                                            placeholder={data.bod}
                                            ref={bodField}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} xl={6}>
                                <Form className="form-login">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label style={{ fontWeight: '600' }}>Tingkat COD</Form.Label>
                                        <Form.Control
                                            type="text"
                                            style={{ height: '56px' }}
                                            autoComplete="off"
                                            placeholder={data.cod}
                                            ref={codField}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col xs={12} xl={6}>
                                <Form className="form-login">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label style={{ fontWeight: '600' }}>Tingkat Warna</Form.Label>
                                        <Form.Control
                                            type="text"
                                            style={{ height: '56px' }}
                                            autoComplete="off"
                                            placeholder={data.colorLevel}
                                            ref={colorLevelField}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} xl={12}>
                                <Form className="form-login">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                        <Form.Label style={{ fontWeight: '600' }}>Foto Sungai</Form.Label>
                                        <Form.Control
                                            type="file"
                                            autoComplete="off"
                                            onChange={handleFilePicture}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={closeModal}
                    style={{ backgroundColor: 'transparent', color: '#338FFA', border: '1px solid #338FFA' }}
                >
                    Batalkan
                </Button>
                <Button
                    onClick={onUpdateRiver}
                    style={{ backgroundColor: '#338FFA', color: '#FFFFFF', border: '1px solid #338FFA' }}
                >
                    Simpan Perubahan
                </Button>
            </Modal.Footer>
        </Modal>

    );

};

export default ModalDashboard;