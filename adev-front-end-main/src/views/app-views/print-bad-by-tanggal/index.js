import React, { useEffect, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons';
import { Spin,Space, Card, Table, Button } from 'antd';
import { useLocation } from 'react-router';
import Flex from 'components/shared-components/Flex'
import Axios from 'axios'
import { strings } from 'res';
import utils from 'utils'

const PrintBadByDate = () => {

    const [userData, setUserData] = useState({});
    const [date, setDate] = useState("");
    const location = useLocation()
    const [libur,setLibur] = useState(false)
    const [dataItem, setDataItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const tableColumns = [
        {
            title: 'Dhuha',
            dataIndex: 'dhuha',
            render: (_, elm) => {
                if ((elm['dhuha'] < 1)) {
                    return (<p style={{ color: "red" }}>Nihil</p>)
                } else {
                    return (<p style={{ color: "green" }}>{elm.dhuha.join(', ')}</p>)
                }
            },
            sorter: (a, b) => utils.antdTableSorter(a, b, 'dhuha')
        },
        {
            title: 'Dzuhur',
            dataIndex: 'dzuhur',
            render: (_, elm) => {
                if ((elm['dzuhur'] < 1)) {
                    return (<p style={{ color: "red" }}>Nihil</p>)
                } else {
                    return (<p style={{ color: "green" }}>{elm.dzuhur.join(', ')}</p>)
                }
            },
            sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur')
        },
        {
            title: 'Ashar',
            dataIndex: 'ashar',
            render: (_, elm) => {
                if ((elm['ashar'] < 1)) {
                    return (<p style={{ color: "red" }}>Nihil</p>)
                } else {
                    return (<p style={{ color: "green" }}>{elm.ashar.join(', ')}</p>)
                }
            },
            sorter: (a, b) => utils.antdTableSorter(a, b, 'ashar')
        },
        {
            title: 'Maghrib',
            dataIndex: 'maghrib',
            render: (_, elm) => {
                if ((elm['maghrib'] < 1)) {
                    return (<p style={{ color: "red" }}>Nihil</p>)
                } else {
                    return (<p style={{ color: "green" }}>{elm.maghrib.join(', ')}</p>)
                }
            },
            sorter: (a, b) => utils.antdTableSorter(a, b, 'maghrib')
        },
        {
            title: 'Isya',
            dataIndex: 'isya',
            render: (_, elm) => {
                if ((elm['isya'].length < 1)) {
                    return (<p style={{ color: "red" }}>Nihil</p>)
                } else {
                    return (<p style={{ color: "green" }}>{elm.isya.join(', ')}</p>)
                }
            },
            sorter: (a, b) => utils.antdTableSorter(a, b, 'isya')
        }
    ]

    const getData = (value) => {
        Axios.post(`${strings.api.sql_host}/reporting/listbademployee/?key=${strings.api.key}`,{
			"tglstart":location.state.dateStart,
			"tglend":location.state.dateEnd,
			"id_division":location.state.id_division
		}).then((doc) => {
            if (doc.data.status !== "failed") {
                let hasil = doc.data.data[0][location.state.date]
                setDataItem(hasil)
                setIsLoading(false)
            }else {
                setIsLoading(false)
            }
		})
    }

    useEffect(() => {
        setDate(location.state.date)
        getData(location.state.date)
    }, [])

    const showLoading = () => {
        if (isLoading) {
            return (
                <div className="table-responsive" style={{ textAlign: "center", width: "100%", height: "100%" }}>
                    <Space size="middle" style={{ textAlign: "center" }}>
                        <Spin size="large" tip="Loading..." />
                    </Space>,
                </div>
            )
        } else {
            return (
                <div className="table-responsive" >
                    <h1 style={{ textAlign: "center" }}>{libur ? "Hari Libur":`Karyawan Tidak Sholat Tanggal ${date}`}</h1>
                    <Table
                        isLoading={isLoading}
                        bordered={false}
                        columns={tableColumns}
                        dataSource={dataItem}
                        pagination={false}
                    />
                </div>
            )
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
                            <address>
                                <p>
                                    <span className="font-weight-semibold text-dark font-size-md">{userData.username}</span><br />
                                    <span>{userData.address}</span><br />
                                </p>
                            </address>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Card>
                            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                            </Flex>
                            {showLoading()}
                        </Card>
                       
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

export default PrintBadByDate