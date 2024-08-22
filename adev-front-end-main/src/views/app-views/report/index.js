import React, { useEffect, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons';
import { Form, message, Card, Table, Button } from 'antd';
import NumberFormat from 'react-number-format';
import { strings } from "res"
import Axios from 'axios'
import KaryawanList from './KaryawanList'
import { useLocation } from 'react-router-dom'
import moment from 'moment'

const { Column } = Table;

const Invoice = () => {

    const [id, setId] = useState("");
    const [dataBayar, setDataBayar] = useState({});
    const [userData, setUserData] = useState({});

    const [defaultImg, setDefaultImg] = useState([])
    const [uploadedImg, setImage] = useState('')
    const [price, setPrice] = useState([])
    const [total, setTotal] = useState(0)
    const location = useLocation()

    const handleUploadChanged = (files) => {
        if (files.length > 0) {
            setImage({ id: files[0].name, file: files[0] })
        }
    }

    const onFinish = () => {
        // let formData = new FormData()
        // formData.append('transfer', uploadedImg.file)
        // formData.append('id', id)
        // Axios.post(`${strings.api.host2}invoice/update`, formData, {
        //     headers: {
        //         'content-type': 'multipart/form-data',
        //         "Access-Control-Allow-Origin": "*"
        //     }
        // }).then(doc => {
        //     message.success("Success")
        //     window.location.href = "/app/billing"
        // }).catch(err => {
        //     console.log(err)
        //     message.error("Error")
        // })
    }

    const renderPaid = () => {
        // if (dataBayar.paid) {
        //     return (<h2 className="mb-1 font-weight-semibold" style={{ color: "green" }}>Paid</h2>)
        // } else {
        //     return (<h2 className="mb-1 font-weight-semibold" style={{ color: "red" }}>Not Paid</h2>)
        // }
    }

    useEffect(() => {
        // getDataDetail(location.state.state.id)
        // setId(location.state.state.id)
    }, [])

    const getDataDetail = (value) => {
        if (value) {
            Axios.get(`${strings.api.host2}invoice/readById/${value}`, {
                headers: {
                    'content-type': 'multipart/form-data',
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(doc => {
                Axios.get(`${strings.api.host2}user/readById/${doc.data.doc.user_id}`,{
                    headers: {
                        'content-type': 'multipart/form-data',
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(doc => {
                    setUserData(doc.data.doc)
                })
                setDataBayar(doc.data.doc)
                if (doc.data.doc.plan === "Premium") {
                    setPrice([{
                        key: "1",
                        product: "Premium",
                        quantity: 1,
                        price: 300
                    }])
                    setTotal(300000)
                } else {
                    setPrice([{
                        key: "1",
                        product: "Standard",
                        quantity: 1,
                        price: 100
                    }])
                    setTotal(100000)
                }
                setDefaultImg([doc.data.doc.link_foto])
            }).catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div>
            <div className="container">
                <Card>
                    <div className="d-md-flex justify-content-md-between">
                        <div>
                            <img src="/img/logo.png" style={{ width: "25%" }} alt="" />
                            <p>
                                Laporan hasil analisa sholat karyawan PT Adev Natural Indonesia Per Tanggal.
							</p>
                          
                        </div>
                        <div className="mt-3 text-right">
                            {renderPaid()}
                            <p>{moment.unix(dataBayar.timestamp).format("ll")}</p>
                            <address>
                                <p>
                                    <span className="font-weight-semibold text-dark font-size-md">{userData.username}</span><br />
                                    <span>{userData.address}</span><br />
                                </p>
                            </address>
                        </div>
                    </div>
                    <div className="mt-4">
                        <KaryawanList></KaryawanList>
                        <p className="mt-5">
                            <small>
                                In exceptional circumstances, Financial Services can provide an urgent manually processed special cheque.
                                Note, however, that urgent special cheques should be requested only on an emergency basis as manually
                                produced cheques involve duplication of effort and considerable staff resources. Requests need to be
                                supported by a letter explaining the circumstances to justify the special cheque payment
							</small>
                        </p>
                    </div>
                    <hr className="d-print-none" />
                    <div className="text-right d-print-none">
                        <Button type="primary" onClick={() => window.print()}>
                            <PrinterOutlined type="printer" />
                            <span className="ml-1">Print</span>
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Invoice