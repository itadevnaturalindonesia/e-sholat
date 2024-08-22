import React, { useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import KaryawanList from './bad-employee-print-list'
import moment from 'moment'

const Invoice = () => {

    const [userData, setUserData] = useState({});

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
                            <p>{moment().format("YYYY-MM-DD")}</p>
                            <address>
                                <p>
                                    <span className="font-weight-semibold text-dark font-size-md">{userData.username}</span><br />
                                    <span>{userData.address}</span><br />
                                </p>
                            </address>
                        </div>
                    </div>
                    <div className="mt-4">
                        <KaryawanList style={{width:"100%"}}></KaryawanList>
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