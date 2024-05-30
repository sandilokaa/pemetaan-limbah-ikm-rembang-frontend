import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Image
} from "react-bootstrap";
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker
} from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

import "leaflet/dist/leaflet.css";

import iconUrl from "../../assets/images/icon/marker.png";

const MapWrapped = () => {

    /* ================ Get River Data ================ */

    const [riverData, setRiverData] = useState([]);

    const rembangRiverData = async () => {

        try {

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/rivers`
            );

            const getDataResponse = await getDataRequest.data.data.getedAllRivers;

            console.log(getDataResponse);

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


    /* ================ Set Icon ================ */

    const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: [20, 25],
        iconAnchor: [22, 38],
        popupAnchor: [-3, -38]
    });

    /* ================ End Set Icon ================ */

    return (

        <MapContainer
            center={[-6.7036, 111.3416]}
            zoom={11}
            scrollWheelZoom={false}
            style={
                {
                    height: '100%',
                    width: '100%'
                }
            }
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {riverData.map((river) =>
                <Marker
                    key={river.id}
                    position={
                        [
                            river.latitude,
                            river.longitude
                        ]
                    }
                    icon={customIcon}
                >
                    <Popup>
                        <div style={{ width: '205px' }}>
                            <Row className='p-0 m-0'>
                                <Col xs={12} xl={12} className='p-0'>
                                    <Image src={`http://localhost:8080/${river.picture}`} style={{ width: '100%', height: '120px', marginTop: '4%', borderRadius: '8px' }}/>
                                </Col>
                            </Row>
                            <Row className='p-0 m-0' style={{ marginTop: '10%'}}>
                                <Col xs={12} xl={12} className='p-0 mt-3'>
                                    <p style={{ margin: 'auto 0', fontWeight: '600', fontSize: '16px' }}>{river.name}</p>
                                </Col>
                            </Row>
                            <Row className='p-0 m-0'>
                                <Col xs={6} xl={6} className='p-0 mt-3'>
                                    <p className='text-muted' style={{ margin: 'auto 0' }}>PH</p>
                                </Col>
                                <Col xs={6} xl={6} className='d-flex justify-content-end p-0 mt-3'>
                                    <p style={{ margin: 'auto 0' }}>{river.ph}</p>
                                </Col>
                            </Row>
                            <Row className='p-0 m-0'>
                                <Col xs={6} xl={6} className='p-0 mt-3'>
                                    <p className='text-muted' style={{ margin: 'auto 0' }}>BOD</p>
                                </Col>
                                <Col xs={6} xl={6} className='d-flex justify-content-end p-0 mt-3'>
                                    <p  style={{ margin: 'auto 0' }}>{river.bod} mg/L</p>
                                </Col>
                            </Row>
                            <Row className='p-0 m-0'>
                                <Col xs={6} xl={6} className='p-0 mt-3'>
                                    <p className='text-muted' style={{ margin: 'auto 0' }}>COD</p>
                                </Col>
                                <Col xs={6} xl={6} className='d-flex justify-content-end p-0 mt-3'>
                                    <p style={{ margin: 'auto 0' }}>{river.cod} mg/L</p>
                                </Col>
                            </Row>
                            <Row className='p-0 m-0'>
                                <Col xs={6} xl={6} className='p-0 mt-3'>
                                    <p className='text-muted' style={{ margin: 'auto 0' }}>Tingkat Warna</p>
                                </Col>
                                <Col xs={6} xl={6} className='d-flex justify-content-end p-0 mt-3'>
                                    <p style={{ margin: 'auto 0' }}>{river.colorLevel} TCU</p>
                                </Col>
                            </Row>
                            <Row className='p-0 m-0'>
                                <Col xs={6} xl={6} className='p-0 mt-3'>
                                    <p className='text-muted' style={{ margin: 'auto 0' }}>Kualitas Sungai</p>
                                </Col>
                                <Col xs={6} xl={6} className='d-flex justify-content-end p-0 mt-3'>
                                    <p style={{ margin: 'auto 0' }}>{river.colorLevel}</p>
                                </Col>
                            </Row>
                        </div>
                    </Popup>
                </Marker>
            )}
        </MapContainer>

    );
};

export default MapWrapped;