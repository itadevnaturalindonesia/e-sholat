import React, { useEffect, useState } from 'react'
import utils from 'utils'
import { strings } from 'res'
import { Button, Card, Col, DatePicker, Form, message, Row, Table } from 'antd'
import ReactExport from "react-export-excel";
import moment from 'moment'
import Axios from 'axios'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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

const BADEMPLOYEE = props => {

    const [form] = Form.useForm();
    const dateFormat = 'YYYY-MM-DD';

    const [dataItem, setDataItem] = useState([]);
    const [dataCount, setDataCount] = useState([{dhuha:[],dzuhur:[],ashar:[],isya:[0,0]}]);
    const [dataItemBackup, setDataItemBackup] = useState([]);
    const [dataExcel, setDataExcel] = useState([]);
    const [isLoadingTable, setIsLoading] = useState(false)
    const [dateStart, setDateStart] = useState(moment(new Date()).format(dateFormat));
    const [dateHasil, setDateHasil] = useState("-");

    useEffect(() => {

    }, [])

    const onChangeStart = (date, dateString) => {
        setDateStart(dateString)
    }

    const getData = async () => {
        setIsLoading(true)
        Axios.post(`${strings.api.sql_host}/reporting/listbademployee/?key=${strings.api.key}`,
            {
                "tglstart": dateStart,
                "tglend": dateStart,
                "id_division": ""
            }).then((doc) => {
                if (doc.data.data[0]) {
                    setDataItem(doc.data.data[0][dateStart])
                    setDataItemBackup(doc.data.data[0][dateStart])
                    let dataExcel = []
                    let biggestNumber = getTheLongestArray([doc.data.data[0][dateStart][0]["dhuha"].length, doc.data.data[0][dateStart][0]["dzuhur"].length, doc.data.data[0][dateStart][0]["ashar"].length, doc.data.data[0][dateStart][0]["isya"].length])
                    for (let i = 0; i <= biggestNumber; i++) {
                        let data = {
                            dhuha: doc.data.data[0][dateStart][0]["dhuha"][i] || "",
                            dzuhur: doc.data.data[0][dateStart][0]["dzuhur"][i] || "",
                            ashar: doc.data.data[0][dateStart][0]["ashar"][i] || "",
                            isya: doc.data.data[0][dateStart][0]["isya"][i] || ""
                        }
                        dataExcel = [...dataExcel, data]
                    }
                    setDataExcel(dataExcel)
                    setDateHasil(dateStart)
                    setIsLoading(false)
                }
                setIsLoading(false)
            })
    }

    const getTheLongestArray = (array) => {
        return Math.max(...array)
    }

    const getDataCounting = async () => {
		setIsLoading(true)
		Axios.post(`${strings.api.sql_host}/reporting/listbademployee/?key=${strings.api.key}`,
			{
				"tglstart": dateStart,
				"tglend": dateStart,
				"id_division": ""
			}).then((doc) => {
				if (doc.data.data[0]) {
                    setDataCount(doc.data.data[0][dateStart])
				}else{
                    message.error("Hari Libur!")
                }
			})
	}

    const onSubmit = (values) => {
        getData()
        getDataCounting()
    }

    return (
        <div>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card >
                        <Form form={form} layout="vertical" onFinish={onSubmit}>
                            <Form.Item name="date" label="Tanggal Pencarian">
                                <DatePicker style={{ width: '100%' }} onChange={onChangeStart} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" style={{ width: "100%" }} htmlType="submit">Cari Data</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card>
                        <h1 style={{ textAlign: "center" }}>{`Hasil Pencarian Tanggal ${dateHasil}`}</h1>
                        <Table
                            isLoading={isLoadingTable}
                            columns={tableColumns}
                            dataSource={dataItem}
                            rowKey={props.id || props.name}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ExcelFile filename={`Bad_Employee_${dateHasil}`} element={<Button type="primary" style={{ width: "100%" }}>Download Data</Button>}>
                        <ExcelSheet data={dataExcel} name="Sholat">
                            <ExcelColumn label="Dhuha" value="dhuha" />
                            <ExcelColumn label="Dzuhur" value="dzuhur" />
                            <ExcelColumn label="Ashar" value="ashar" />
                            <ExcelColumn label="Isya" value="isya" />
                        </ExcelSheet>
                    </ExcelFile>
                </Col>
            </Row>
            <br></br>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
                    <Card>
                        <h1 style={{ textAlign: "center" }}>Dhuha</h1>
                        <h1 style={{ textAlign: "center", color: "green" }}>{dataCount[0]["dhuha"] ? dataCount[0]["dhuha"].length : 0}</h1>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
                    <Card>
                        <h1 style={{ textAlign: "center" }}>Dzuhur</h1>
                        <h1 style={{ textAlign: "center", color: "green" }}>{dataCount[0]["dzuhur"] ? dataCount[0]["dzuhur"].length : 0}</h1>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
                    <Card>
                        <h1 style={{ textAlign: "center" }}>Ashar</h1>
                        <h1 style={{ textAlign: "center", color: "green" }}>{dataCount[0]["ashar"] ? dataCount[0]["ashar"].length : 0}</h1>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
                    <Card>
                        <h1 style={{ textAlign: "center" }}>Isya</h1>
                        <h1 style={{ textAlign: "center", color: "green" }}>{dataCount[0]["isya"] ? dataCount[0]["isya"].length - 2 : 0}</h1>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
                    <Card>
                        <h1 style={{ textAlign: "center" }}>Total</h1>
                        <h1 style={{ textAlign: "center", color: "green" }}>{dataCount[0]["isya"].length+dataCount[0]["dzuhur"].length+dataCount[0]["ashar"].length+dataCount[0]["dhuha"].length - 2}</h1>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default BADEMPLOYEE