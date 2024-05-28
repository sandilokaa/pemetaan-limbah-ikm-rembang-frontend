import React from "react";
import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";

import HomeLayout from "../../layouts/home/HomeLayout";
import MapWrapped from "../../components/map/MapWrapped";

import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

const Home = () => {

    return (

        <HomeLayout>

            <div id="home-main-content">
                <div className="home-bg"></div>
                <Container>
                    <Row>
                        <Col xs={12} xl={6}>
                            <h1>Sistem Informasi Geografis <br/> Sungai Tercemar di Kabupaten Rembang</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} xl={6}>
                            <p>Update perkembangan data sungai tercemar <br /> di kabupaten Rembang, Jawa Tengah</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} xl={6}>
                            <Button href="#map-content" className="btn-river-mapping">
                                Lihat Denah Sungai
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div id="map-content">
                <Container>
                    <Row>
                        <Col xs={12} xl={12}>
                            <h1>Daftar Sungai Tercemar</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} xl={12}>
                            <div style={{ height: '600px' }}>
                                <MapWrapped />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </HomeLayout>

    );
    
};

export default Home;