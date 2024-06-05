import React from 'react';
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

const NormalBoundary = () => {

    return (

        <div style={{
            position: 'absolute',
            width: '20%',
            top: '10px',
            right: '10px',
            backgroundColor: '#FFFFFF',
            padding: '15px 10px',
            borderRadius: '5px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            zIndex: '1000'
        }}>
            <Container>
                <Row>
                    <Col xs={12} xl={12}>
                        <h6 style={{fontWeight: '600', margin: 'auto 0', fontSize: '18px'}}>Batasan Normal</h6>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={12} xl={8}>
                        <p style={{margin: 'auto 0'}} className='text-muted'>PH</p>
                    </Col>
                    <Col xs={12} xl={4} className='d-flex justify-content-end'>
                        <p style={{fontWeight: '600', margin: 'auto 0'}}>6 - 9</p>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={12} xl={8}>
                        <p style={{margin: 'auto 0'}} className='text-muted'>BOD</p>
                    </Col>
                    <Col xs={12} xl={4} className='d-flex justify-content-end'>
                        <p style={{fontWeight: '600', margin: 'auto 0'}}>60</p>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={12} xl={8}>
                        <p style={{margin: 'auto 0'}} className='text-muted'>COD</p>
                    </Col>
                    <Col xs={12} xl={4} className='d-flex justify-content-end'>
                        <p style={{fontWeight: '600', margin: 'auto 0'}}>150</p>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col xs={12} xl={8}>
                        <p style={{margin: 'auto 0'}} className='text-muted'>Warna Sungai</p>
                    </Col>
                    <Col xs={12} xl={4} className='d-flex justify-content-end'>
                        <p style={{fontWeight: '600', margin: 'auto 0'}}>200</p>
                    </Col>
                </Row>
            </Container>
        </div>

    );

};

export default NormalBoundary;