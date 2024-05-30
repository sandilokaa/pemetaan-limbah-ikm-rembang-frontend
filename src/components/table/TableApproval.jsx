import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Table,
    Pagination,
    Image
} from "react-bootstrap";
import axios from "axios";
import { useSnackbar } from 'notistack';

import AcceptIcon from "../../assets/images/icon/accept.png";
import DeclineIcon from "../../assets/images/icon/decline.png";

import "../../assets/css/style.css";

const TableApproval = () => {


    /* ================ Get Decision Data ================ */

    const [decisionData, setDecisionData] = useState([]);

    const rembangDecisionData = async () => {

        try {

            const token = localStorage.getItem("token");

            const getDataRequest = await axios.get(
                `http://localhost:8080/api/v1/decisions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Access-Control-Allow-Origin": "*"
                    },
                }
            );

            const getDataResponse = await getDataRequest.data.data.getedAllDecisions;

            console.log(getDataResponse);

            setDecisionData(getDataResponse);

        } catch (err) {
            console.log(err);
        }

    };

    useEffect(() => {

        rembangDecisionData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ================ End Get Decision Data ================ */


    /* ================ Pagination ================ */

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = decisionData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(decisionData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    /* ================ End Pagination ================ */


    /* ================ Update Decision Data ================ */

    const { enqueueSnackbar } = useSnackbar();

    const handleDecisionUpdate = async (id, newDecision) => {

        try {

            const token = localStorage.getItem("token");

            const updateRequest = await axios.put(
                `http://localhost:8080/api/v1/decisions/${id}`,
                {
                    decision: newDecision
                } , {
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

    /* ================ End Update Decision Data ================ */

    return (

        <Row>
            <Col xs={12} xl={12}>
                <div style={{ padding: '2%', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
                    <Table style={{ margin: 'auto 0' }}>
                        <thead className="table-header">
                            <tr>
                                <th>Nama Sungai</th>
                                <th>PH</th>
                                <th>BOD</th>
                                <th>COD</th>
                                <th>Warna</th>
                                <th>Kualitas</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {currentItems.map((decision) =>
                                <tr key={decision.id}>
                                    <td>{decision.River.name}</td>
                                    <td>{decision.River.ph}</td>
                                    <td>{decision.River.cod} mg/L</td>
                                    <td>{decision.River.bod} mg/L</td>
                                    <td>{decision.River.colorLevel} TCU</td>
                                    <td>
                                        <span
                                            style={
                                                {
                                                    color: decision.River.quality < 90.2 || decision.River.quality > 90.8 ? '#F44336' : '#4CAF50',
                                                    backgroundColor: decision.River.quality < 90.2 || decision.River.quality > 90.8 ? '#FFE9E7' : '#EAFBE9',
                                                    padding: '4% 6%',
                                                    borderRadius: '5px'
                                                }
                                            }
                                        >
                                            {decision.River.quality < 90.2 || decision.River.quality > 90.8 ? 'Tercemar' : 'Tidak Tercemar'}
                                        </span>
                                    </td>
                                    {decision.decision === 'approved' || decision.decision === 'not approved' ?
                                        (
                                            <td className="text-muted">Has been approved.</td>
                                        ) : (
                                            <td>
                                                <Row>
                                                    <Col xs={12} xl={{span: 4, offset: 2}} className="d-flex justify-content-end">
                                                        <Image
                                                            src={AcceptIcon}
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDecisionUpdate(decision.id, 'approved')}
                                                        />
                                                    </Col>
                                                    <Col xs={12} xl={6} className="d-flex justify-content-start">
                                                        <Image
                                                            src={DeclineIcon}
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => handleDecisionUpdate(decision.id, 'not approved')}
                                                        />
                                                    </Col>
                                                </Row>
                                            </td>
                                        )
                                    }
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
        </Row>

    );

};

export default TableApproval;