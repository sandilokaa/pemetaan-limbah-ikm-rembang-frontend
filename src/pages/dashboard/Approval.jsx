import React from "react";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import MapWrapped from "../../components/map/MapWrapped";
import TableApproval from "../../components/table/TableApproval";

import "../../assets/css/style.css";

const Approval = () => {

    return (

        <DashboardLayout>

            <div id="map-dashboard-content">
                <Container fluid style={{ padding: '0 4%' }}>
                    <Row>
                        <Col xs={12} xl={12}>
                            <h1>Approval</h1>
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

            <div id="table-dashboard-content">
                <Container fluid style={{ padding: '0 4%' }}>
                    <TableApproval/>
                </Container>
            </div>

        </DashboardLayout>

    );

};

export default Approval;