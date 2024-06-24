import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Image
} from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/pagination';

import DropletIcon from "../../assets/images/icon/droplet.png";

import "../../assets/css/swiper.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

const RiverSwiper = () => {

    /* ================ Get River Data ================ */

    const [riverData, setRiverData] = useState([]);

    const rembangRiverData = async () => {

        try {

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/rivers`
            );

            const getDataResponse = await getDataRequest.data.data.getedAllRivers;

            setRiverData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        rembangRiverData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================ End Get River Data ================ */

    return (

        <Container>
            <Row>
                <Col xs={12} xl={12}>
                    <Swiper
                        pagination={{
                            clickable: true,
                        }}
                        spaceBetween={20}
                        slidesPerView={6}
                        modules={[Pagination]}
                        className="swiper"
                    >
                        <Row>
                            {riverData.map((river) => {
                                return (
                                    <Col xs={12} xl={2} key={river.id}>
                                        <SwiperSlide>
                                            <Card style={{ height: '100%' }}>
                                                <Card.Body>
                                                    <Card.Title
                                                        style={{ fontSize: '14px', fontWeight: '600' }}
                                                    >
                                                        <Row>
                                                            <Col xs={12} xl={12}>
                                                                <Image src={DropletIcon} style={{ marginRight: '6%' }} />
                                                                {river.name}
                                                            </Col>
                                                        </Row>
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <Row className="mt-4">
                                                            <Col xs={12} xl={12}>
                                                                <span
                                                                    style={
                                                                        {
                                                                            color: '#FFFFFF',
                                                                            backgroundColor: river.quality < 90.2 || river.quality > 90.8 ? '#D9464D' : '#4CAF50',
                                                                            padding: '3% 5%',
                                                                            borderRadius: '5px'
                                                                        }
                                                                    }
                                                                >
                                                                    {river.quality < 90.2 || river.quality > 90.8 ? 'Tercemar' : 'Tidak Tercemar'}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-4">
                                                            <Col xs={8} xl={8}>
                                                                <p className="text-muted">PH</p>
                                                            </Col>
                                                            <Col xs={4} xl={4} className="d-flex justify-content-end">
                                                                <p style={{fontWeight: '600'}}>{river.ph === "0" ? '-' : river.ph}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={8} xl={8}>
                                                                <p className="text-muted">BOD</p>
                                                            </Col>
                                                            <Col xs={4} xl={4} className="d-flex justify-content-end">
                                                                <p style={{fontWeight: '600'}}>{river.bod === "0" ? '-' : river.bod}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={8} xl={8}>
                                                                <p className="text-muted">COD</p>
                                                            </Col>
                                                            <Col xs={4} xl={4} className="d-flex justify-content-end">
                                                                <p style={{fontWeight: '600'}}>{river.cod === "0" ? '-' : river.cod}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={8} xl={8}>
                                                                <p className="text-muted">Warna Sungai</p>
                                                            </Col>
                                                            <Col xs={4} xl={4} className="d-flex justify-content-end">
                                                                <p style={{fontWeight: '600'}}>{river.colorLevel === "0" ? '-' : river.colorLevel}</p>
                                                            </Col>
                                                        </Row>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </SwiperSlide>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Swiper>
                </Col>
            </Row>
        </Container>

    );

};

export default RiverSwiper;