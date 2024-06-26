import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Table,
    Pagination,
    Image,
    Button
} from "react-bootstrap";
import axios from "axios";
import moment from "moment-timezone";

import EditIcon from "../../assets/images/icon/edit-icon.png";
import ModalDashboard from "../modal/ModalDashboard";
import ModalNote from "../modal/ModalNote";
import RevisionIcon from "../../assets/images/icon/revision.png";

import "../../assets/css/style.css";

const TableDashboard = () => {

    /* ================ Get Current User ================ */

    const [admin, setAdmin] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    useEffect(() => {

        const validateLogin = async () => {

            try {

                const token = localStorage.getItem("token");

                const currentAdminRequest = await axios.get(
                    `http://localhost:8080/api/v1/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentAdminResponse = currentAdminRequest.data;

                if (currentAdminResponse.status) {

                    setAdmin(currentAdminResponse.data.currentUser);

                }

            } catch (err) {

                console.log(err);

            }

        };

        validateLogin();

        setIsRefresh(false);

    }, [isRefresh]);

    /* ================ Get Current User ================ */


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


    /* ================ Pagination ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = riverData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(riverData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    /* ================ Pagination ================ */


    /* ================ Open Modal Edit ================ */

    const [show, setShow] = useState(false);
    const [selectedRiver, setSelectedRiver] = useState(null);

    const handleClose = () => {
        setShow(false);
        setSelectedRiver(null)
    }

    const handleShow = (river) => {
        setShow(true);
        setSelectedRiver(river);
    }

    /* ================ End Open Modal Edit ================ */


    /* ================ Open Modal Edit ================ */

    const [showModalRevision, setShowModalRevision] = useState(false);
    const [selectedRevision, setSelectedRevision] = useState(null);

    const handleCloseRevision = () => {
        setShowModalRevision(false);
        setSelectedRevision(null)
    }

    const handleShowRevision = (river) => {
        setShowModalRevision(true);
        setSelectedRevision(river);
    }

    /* ================ End Open Modal Edit ================ */


    /* ================ Format Date ================ */

    const formatDate = (dateString) => {
        const date = moment(dateString).tz('Asia/Jakarta');
        return date.format('D-M-YYYY HH:mm');
    };

    /* ================ End Format Date ================ */

    return (

        <Row>
            <Col xs={12} xl={12}>
                <div style={{ padding: '2%', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                    <Table style={{ margin: 'auto 0', fontSize: '13px' }} responsive>
                        <thead className="table-header">
                            <tr>
                                <th>Nama Sungai</th>
                                <th>PH</th>
                                <th>BOD</th>
                                <th>COD</th>
                                <th>Warna</th>
                                <th>Kualitas</th>
                                <th>Approval</th>
                                {admin.role === 'smes' && (
                                    <th>File Validasi</th>
                                )}
                                <th>Last Edit</th>
                                {admin.role === 'smes' && (
                                    <th>Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {currentItems.map((river) =>
                                <tr key={river.id}>
                                    <td>{river.name}</td>
                                    <td>{river.ph === "0" ? '-' : river.ph}</td>
                                    <td>{river.bod === "0" ? '-' : river.bod} mg/L</td>
                                    <td>{river.cod === "0" ? '-' : river.cod} mg/L</td>
                                    <td>{river.colorLevel === "0" ? '-' : river.colorLevel} TCU</td>
                                    <td>
                                        <span
                                            style={
                                                {
                                                    color: river.quality < 90.2 || river.quality > 90.8 ? '#F44336' : '#4CAF50',
                                                    backgroundColor: river.quality < 90.2 || river.quality > 90.8 ? '#FFE9E7' : '#EAFBE9',
                                                    padding: '4% 6%',
                                                    borderRadius: '5px'
                                                }
                                            }
                                        >
                                            {river.quality < 90.2 || river.quality > 90.8 ? 'Tercemar' : 'Tidak Tercemar'}
                                        </span>
                                    </td>
                                    <td>
                                        {
                                            river.Decision.decision === "approved" ? 'Approved' :
                                                river.Decision.decision === "not approved" ?
                                                    (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            Revision
                                                            <Image
                                                                src={RevisionIcon}
                                                                style={{ marginLeft: '4%', cursor: 'pointer' }}
                                                                onClick={() => handleShowRevision(river)}
                                                            />
                                                        </div>
                                                    ) :
                                                    river.Decision.decision === "under review" ? 'Under Review' :
                                                        null
                                        }
                                    </td>
                                    {admin.role === 'smes' && (
                                        <td>
                                            {
                                                river.validationFile !== null ? (
                                                    <div>
                                                        <Button
                                                            onClick={() => window.open(`http://localhost:8080/${river.validationFile}`)}
                                                            target="_blank"
                                                            style={{
                                                                border: 'none',
                                                                color: '#FFFFFF',
                                                                backgroundColor: '#338FFA',
                                                                cursor: 'pointer',
                                                                borderRadius: '5px',
                                                                marginRight: '4%',
                                                                fontSize: '13px'
                                                            }}
                                                        >
                                                            Review
                                                        </Button>
                                                    </div>
                                                ) : "-"
                                            }
                                        </td>
                                    )}
                                    <td>{formatDate(river.Decision.updatedAt)}</td>
                                    {admin.role === 'smes' && (
                                        <td>
                                            <Image
                                                src={EditIcon}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleShow(river)}
                                            />
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination className="custom-pagination" style={{ marginTop: '2%' }}>
                        {pageNumbers.map(number => (
                            <Pagination.Item
                                key={number}
                                active={number === currentPage}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </Col>
            <ModalDashboard
                showModal={show}
                closeModal={handleClose}
                data={selectedRiver}
            />
            <ModalNote
                showModal={showModalRevision}
                closeModal={handleCloseRevision}
                data={selectedRevision}
            />
        </Row>

    );

};

export default TableDashboard;