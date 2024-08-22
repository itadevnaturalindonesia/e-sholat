import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import {
	CloudDownloadOutlined,
	UserSwitchOutlined,
	SyncOutlined} from '@ant-design/icons';
import utils from 'utils'
import { SearchOutlined, StarBorderOutlined } from "@material-ui/icons";
import Axios from 'axios'
import { strings } from 'res';
import {useLocation} from 'react-router-dom'

const DisplayDataSet = (props) => (
	<Row gutter={24}>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<CloudDownloadOutlined />}
				value={props.dataAnalisa.haid}
				title="Cuti/ Haid"
				color="blue"
				vertical={true}
				avatarSize={55}
			/>

		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<StarBorderOutlined />}
				value={props.dataAnalisa.aktif}
				title="Sholat"
				color="green"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.dataAnalisa.soda}
				title="SODA"
				color="gray"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<SyncOutlined />}
				value={props.dataAnalisa.off}
				title="Tidak Sholat"
				color="orange"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
	</Row>
)

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
		title: 'Nama',
		dataIndex: 'name_users',
		render: (_, elm) => {
			return (<p>{elm.name_users}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_users')
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
]

const DetailCalendar = () => {
	const [waktu, setWaktu] = useState();
	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);
	const [loading, setLoading] = useState(false);
	const location =useLocation()
	const [dataPoin,setDataPoin] = useState({
		poin: "0",
		aktif: "0",
		soda: "0",
		off: "0",
		haid: "0",
		cuti: "0"
	})
	const [dataDetailPoin, setDataDetailPoin] = useState()

	useEffect(() => {
		if(location.state.tanggal){
			setWaktu(location.state.tanggal)
			loadReporting()
			loadResumeTotal()
			loadDetailResumeTotal()
		}
	}, [])

	const loadDetailResumeTotal = () => {
		setLoading(true)
		Axios.get(`${strings.api.sql_host}/reporting/resumeTotalDetailByTgl/${location.state.tanggal}?key=${strings.api.key}`).then((doc) => {
			if (doc.data.data.length !== 0) {
				setDataDetailPoin(doc.data.data)
			}
			setLoading(false)
		})
	}
	
	const loadResumeTotal = () => {
		setLoading(true)
		Axios.get(`${strings.api.sql_host}/reporting/resumeTotalByTgl/${location.state.tanggal}?key=${strings.api.key}`).then((doc) => {
			setDataPoin({
				poin: doc.data.data[0].total_point,
				aktif: doc.data.data[0].dinas_sholat,
				soda: doc.data.data[0].soda,
				off: doc.data.data[0].tidak_absen,
				haid: doc.data.data[0].cuti_haid
			})
			setLoading(false)
		})
	}
	
	const loadReporting = () => {
		setLoading(true)
		Axios.get(`${strings.api.sql_host}/reporting/${location.state.tanggal}/${location.state.tanggal}?key=${strings.api.key}`).then((doc) => {
			setDataItem(doc.data.data)
			setDataItemBackup(doc.data.data)
			setLoading(false)
		})
	}

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? dataItem : dataItemBackup
		const data = utils.wildCardSearch(searchArray, value)
		setDataItem(data)
	}

	return (
		<>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
					<Card>
						<h1 style={{ textAlign: "center" }}>{location.state.tanggal}</h1>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<DisplayDataSet dataAnalisa={dataPoin} />
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
					<Card title={`Report Karyawan Tanggal ${waktu}`} loading={loading}>
						<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
							<Flex className="mb-1" mobileFlex={false}>
								<div className="mr-md-3 mb-3">
									<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
								</div>
							</Flex>
						</Flex>
						<Table
							pagination={true}
							columns={tableColumns}
							dataSource={dataItem}
							rowKey='nip'
						/>
					</Card>`
				</Col>
			</Row>
		</>
	)
}

export default DetailCalendar