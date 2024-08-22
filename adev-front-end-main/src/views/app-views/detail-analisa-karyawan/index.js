import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Input, Form, Button, DatePicker,Menu } from 'antd';
import Flex from 'components/shared-components/Flex'
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import {
	CloudDownloadOutlined,
} from '@ant-design/icons';
import utils from 'utils'
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Axios from 'axios'
import { strings } from 'res';
import { useLocation } from 'react-router-dom'
import DownloadExcel from "./DownloadExcel";
import moment from "moment";
import DisplayDataSet from "./DisplayDataSet";
import { useHistory } from "react-router-dom";

const AnalyticsKaryawan = () => {
	let history = useHistory();
	const [dataItem, setDataItem] = useState([])
	const [dataItemBackup, setDataItemBackup] = useState([])
	const [dataAnalisa, setDataAnalisa] = useState({
		name: "",
		nik: "",
	})
	const [dataPoin,setDataPoin] = useState({
		poin: "0",
		aktif: "0",
		soda: "0",
		off: "0",
		haid: "0",
		cuti: "0"
	})

	const viewDetails = row => {
		history.push({
			pathname: `detail-report`,
			state: {
				nik: row.nik,
                date: row.tgl,
				id: row.nik
			}
		})
	}

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EditOutlined />
					<span className="ml-2">Ubah</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	const tableColumns = [
		{
			title: 'NIK',
			dataIndex: 'nik',
			render: (_, elm) => {
				return (<p>{elm.nik}</p>)
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'nik')
		},
		{
			title: 'Tanggal',
			dataIndex: 'tgl',
			render: (_, elm) => {
				return (<p>{elm.tgl}</p>)
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'tgl')
		},
		{
			title: 'Siang',
			dataIndex: 'siang',
			render: (_, elm) => {
				return (<p>{elm.siang}</p>)
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'siang')
		},
		{
			title: 'Malam',
			dataIndex: 'malam',
			render: (_, elm) => {
				return (<p>{elm.malam}</p>)
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'malam')
		},
		{
			title: 'Dhuha',
			dataIndex: 'dhuha',
			render: (_, elm) => {
				if (!elm['dhuha']) {
					return (<p style={{ color: "red" }}>Belum Sholat</p>)
				} else {
					return (<p style={{ color: "green" }}>{elm.dhuha}</p>)
				}
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'dhuha')
		},
		{
			title: 'Dzuhur',
			dataIndex: 'dzuhur',
			render: (_, elm) => {
				if (!elm['dzuhur']) {
					return (<p style={{ color: "red" }}>Belum Sholat</p>)
				} else {
					return (<p style={{ color: "green" }}>{elm.dzuhur}</p>)
				}
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur')
		},
		{
			title: 'Ashar',
			dataIndex: 'ashar',
			render: (_, elm) => {
				if (!elm['ashar']) {
					return (<p style={{ color: "red" }}>Belum Sholat</p>)
				} else {
					return (<p style={{ color: "green" }}>{elm.ashar}</p>)
				}
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'ashar')
		},
		{
			title: 'Isya',
			dataIndex: 'isya',
			render: (_, elm) => {
				if (!elm['isya']) {
					return (<p style={{ color: "red" }}>Belum Sholat</p>)
				} else {
					return (<p style={{ color: "green" }}>{elm.isya}</p>)
				}
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'isya')
		},
		{
			title: 'Haid',
			dataIndex: 'haid',
			render: (_, elm) => {
				if (elm['haid'] === "Ya") {
					return (<p>Iya</p>)
				} else {
					return (<p>Tidak</p>)
				}
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'haid')
		},
		{
			title: 'Cuti',
			dataIndex: 'cuti',
			render: (_, elm) => {
				if (elm['cuti'] === "Ya") {
					return (<p>Iya</p>)
				} else {
					return (<p>Tidak</p>)
				}
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'cuti')
		},
		{
			title: 'Keterangan',
			dataIndex: 'keterangan',
			render: (_, elm) => {
				return <p></p>
			},
			sorter: (a, b) => utils.antdTableSorter(a, b, 'keterangan')
		},
		{
			title: 'Ubah',
			render: (_, elm) => (
				<div className="text-center">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		},
	]

	const [dataDetailPoin, setDataDetailPoin] = useState()
	const location = useLocation()
	const [form] = Form.useForm();
	const dateFormat = 'YYYY-MM-DD';

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? dataItem : dataItemBackup
		const data = utils.wildCardSearch(searchArray, value)
		setDataItem(data)
	}

	useEffect(() => {
		if (location.state.status) {
			onDefault(location.state.id)
		}
	}, [])

	const onDefault = (value) => {
		Axios.get(`${strings.api.base_url}/reporting/listall/${value}?key=${strings.api.key}`).then((doc) => {
			if (doc.data.data.length !== 0) {
				setDataItem(doc.data.data)
				setDataItemBackup(doc.data.data)
				setDataAnalisa({
					...dataAnalisa,
					name: doc.data.data[0].name_users,
					nik: doc.data.data[0].nik,
				})
				//Load Excel API
				reportEmployee(doc.data.data[0].nik)
			}
		})
		Axios.get(`${strings.api.base_url}/reporting/resumetotal/30/${value}?key=${strings.api.key}`, {
			headers: {
				'content-type': 'multipart/form-data',
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			setDataPoin({
				poin: doc.data.data[0].total_point,
				aktif: doc.data.data[0].dinas_sholat,
				soda: doc.data.data[0].soda,
				off: doc.data.data[0].tidak_absen,
				haid: doc.data.data[0].cuti_haid
			})
		})
		Axios.get(`${strings.api.base_url}/reporting/resumeTotalDetail/30/${value}?key=${strings.api.key}`, {
			headers: {
				'content-type': 'multipart/form-data',
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			setDataDetailPoin(doc.data.data)
		})
	}

	const [isLoading, setLoading] = useState(false);
    const [dateStart, setDateStart] = useState(moment(new Date()).format(dateFormat));
    const [dateEnd, setDateEnd] = useState(moment(new Date()).format(dateFormat));

	const onChangeStart = (date, dateString) => {
		setDateStart(dateString)
	}
	
	const onChangeEnd = (date, dateString) => {
		setDateEnd(dateString)
	}

	const onSubmit = (values) => {
		setDataEmployeeDhuha([])
		setDataEmployeeDhuzur([])
		setDataEmployeeAshar([])
		setDataEmployeeIsya([])
		reportEmployee(dataAnalisa.nik)
	}

	/**
	 * Calling API Excel
	 */
	 const [dataEmployeeDhuha, setDataEmployeeDhuha] = useState([]);
	 const [dataDateDhuha, setDataDateDhuha] = useState([]);
	 const [dataEmployeeDzuhur, setDataEmployeeDhuzur] = useState([]);
	 const [dataDateDzuhur, setDataDateDzuhur] = useState([]);
	 const [dataEmployeeAshar, setDataEmployeeAshar] = useState([]);
	 const [dataDateAshar, setDataDateAshar] = useState([]);
	 const [dataEmployeeIsya, setDataEmployeeIsya] = useState([]);
	 const [dataDateIsya, setDataDateIsya] = useState([]);
	 const saveDataState = (datas, value) => {
        let data = {}
        datas.datadetail.map(element => {
            const keyEl = Object.keys(element)
            element[keyEl].forEach((currentValue, index) => { 
                if (index === 0) {
                    data = { 
                        name: keyEl[0],
                        status_dinas: currentValue.status_dinas,
                        name_division: currentValue.name_division,
                        name_position: currentValue.name_position,
                        [currentValue.tgl]: currentValue.waktu === null ? currentValue.status : currentValue.waktu
                    }
                } else {
                    data = {
                        ...data, 
                        [currentValue.tgl]: currentValue.waktu === null ? currentValue.status : currentValue.waktu,
                    }
                }
                if (index === element[keyEl].length - 1) {
                    if (value === 1) setDataEmployeeDhuha(dataEmployee => [...dataEmployee, data])
                    if (value === 2) setDataEmployeeDhuzur(dataEmployee => [...dataEmployee, data])
                    if (value === 3) setDataEmployeeAshar(dataEmployee => [...dataEmployee, data])
                    if (value === 5) setDataEmployeeIsya(dataEmployee => [...dataEmployee, data])
                }
            })
        });
    }

    const reportEmployee = (nik) => {
		setLoading(true)
        const getDhuha = Axios.post(`${strings.api.sql_host}/reporting/excel-report-bynik/?key=${strings.api.key}`,{
			tglstart:dateStart,
            tglend:dateEnd,
            id_sholat: '1',
            nik: nik
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });
        
        const getDzuhur = Axios.post(`${strings.api.sql_host}/reporting/excel-report-bynik/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd,
            id_sholat:'2',
			nik: nik
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });
        
        const getAshar = Axios.post(`${strings.api.sql_host}/reporting/excel-report-bynik/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd,
            id_sholat:'3',
			nik: nik
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        const getIsya = Axios.post(`${strings.api.sql_host}/reporting/excel-report-bynik/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd,
            id_sholat:'5',
			nik: nik
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        Promise.all([getDhuha, getDzuhur, getAshar, getIsya])
            .then(function (results) {
				if ( 
                    results[0].data.data.length !== 0 &&
                    results[1].data.data.length !== 0 &&
                    results[2].data.data.length !== 0 &&
                    results[3].data.data.length !== 0
                ) {
					setDataDateDhuha(results[0].data.data.datatgl)
					setDataDateDzuhur(results[1].data.data.datatgl)
					setDataDateAshar(results[2].data.data.datatgl)
					setDataDateIsya(results[3].data.data.datatgl)
					saveDataState(results[0].data.data, 1)
					saveDataState(results[1].data.data, 2)
					saveDataState(results[2].data.data, 3)
					saveDataState(results[3].data.data, 5) 
				}
				setLoading(false)
            });
    }


	return (
		<div>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Card loading={isLoading}>
						<Form form={form} layout="vertical" onFinish={onSubmit}>
							<Form.Item name="date_end" label="Tanggal Mulai">
								<DatePicker style={{ width: '100%' }} onChange={onChangeStart} defaultValue={moment(new Date(), dateFormat)} />
							</Form.Item>
							<Form.Item name="date_start" label="Tanggal Akhir">
								<DatePicker style={{ width: '100%' }} onChange={onChangeEnd} defaultValue={moment(new Date(), dateFormat)} />
							</Form.Item>
							<Form.Item>
								<Button type="primary" style={{ width: "100%" }} htmlType="submit">Cari Data</Button>
							</Form.Item>
						</Form>
						{dataEmployeeDhuha && dataEmployeeDzuhur && dataEmployeeAshar && dataEmployeeIsya 
							&& dataDateDhuha && dataDateDzuhur && dataDateAshar && dataDateIsya && (
							<DownloadExcel 
								dataEmployeeDhuha={dataEmployeeDhuha} 
								dataEmployeeDzuhur={dataEmployeeDzuhur}
								dataEmployeeAshar={dataEmployeeAshar}
								dataEmployeeIsya={dataEmployeeIsya}
								dataDateDhuha={dataDateDhuha}
								dataDateDzuhur={dataDateDzuhur}
								dataDateAshar={dataDateAshar}
								dataDateIsya={dataDateIsya}
								filename={`${dataAnalisa.name}_${moment(new Date())}`} />
						)}
					</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
					<Card>
						<h1 style={{ textAlign: "center" }}>{dataAnalisa.name}</h1>
						<h3 style={{ textAlign: "center" }}>{dataAnalisa.nik}</h3>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<DisplayDataSet dataAnalisa={dataPoin} />
					<Row gutter={24}>
						<Col xs={12} sm={12} md={12} lg={12} xl={24} xxl={24}>
							<DataDisplayWidget
								icon={<CloudDownloadOutlined />}
								value={dataPoin.haid}
								title="Cuti/ Haid"
								color="red"
								vertical={true}
								avatarSize={55}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row gutter={24} style={{ textAlign: "center" }}>
				<Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
					{dataDetailPoin && (
						<Card>
							<h1>Dhuha</h1>
							<p>SODA			: {dataDetailPoin[0].soda}</p>
							<p>Sholat 		: {dataDetailPoin[0].sholat_biasa}</p>
							<p>Tidak Sholat	: {dataDetailPoin[0].tidak_absen}</p>
						</Card>
					)}
				</Col>
				<Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
					{dataDetailPoin && (
						<Card>
							<h1>Dzuhur</h1>
							<p>SODA			: {dataDetailPoin[1].soda}</p>
							<p>Sholat 		: {dataDetailPoin[1].sholat_biasa}</p>
							<p>Tidak Sholat	: {dataDetailPoin[1].tidak_absen}</p>
						</Card>
					)}
				</Col>
				<Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
					{dataDetailPoin && (
						<Card>
							<h1>Ashar</h1>
							<p>SODA			: {dataDetailPoin[2].soda}</p>
							<p>Sholat 		: {dataDetailPoin[2].sholat_biasa}</p>
							<p>Tidak Sholat	: {dataDetailPoin[2].tidak_absen}</p>
						</Card>
					)}
				</Col>
				<Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} >
					{dataDetailPoin && (
						<Card>
							<h1>Isya</h1>
							<p>SODA			: {dataDetailPoin[4].soda}</p>
							<p>Sholat 		: {dataDetailPoin[4].sholat_biasa}</p>
							<p>Tidak Sholat	: {dataDetailPoin[4].tidak_absen}</p>
						</Card>
					)}
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title={`History Karyawan`}>
						<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
							<Flex className="mb-1" mobileFlex={false}>
								<div className="mr-md-3 mb-3">
									<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
								</div>
							</Flex>
						</Flex>
						<Table
							loading={isLoading}
							pagination={true}
							columns={tableColumns}
							dataSource={dataItem}
							rowKey='nip'
						/>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default AnalyticsKaryawan