import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag, Select, Badge, Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import {
	CloudDownloadOutlined,
	ArrowUpOutlined,
	UserSwitchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import utils from 'utils'
import { SearchOutlined, StarBorderOutlined } from "@material-ui/icons";
import moment from "moment-timezone";
import Axios from 'axios'
import { strings } from 'res';
import {useHistory,useLocation} from 'react-router-dom'

const DisplayDataSet = (props) => (
	<Row gutter={24}>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.karyawan}
				title="Total Poin"
				color="blue"
				vertical={true}
				avatarSize={55}
			/>

		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<StarBorderOutlined />}
				value={props.totalKaryawanAktif}
				title="Total Aktif"
				color="green"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.totalKaryawanOff}
				title="Total SODA"
				color="gray"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<SyncOutlined />}
				value="0"
				title="Total Off"
				color="orange"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
	</Row>
)

const tableColumns = [

	{
		title: 'Tanggal',
		dataIndex: 'tanggal',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'tanggal')
	},
	{
		title: 'Haid',
		dataIndex: 'haid',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'haid')
	},
	{
		title: 'Siang',
		dataIndex: 'siang',
		render: (_, elm) => {
			if (elm['siang']) {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'siang')
	},
	{
		title: 'Malam',
		dataIndex: 'malam',
		render: (_, elm) => {
			if (elm['malam']) {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'malam')
	},
	{
		title: 'Dhuha',
		dataIndex: 'dhuha',
		render: (_, elm) => {
			if (elm['dhuha'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['dhuha'] === 1) {
				return (<p style={{ color: "yellow" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur')
	},
	{
		title: 'Dzuhur',
		dataIndex: 'dzuhur',
		render: (_, elm) => {
			if (elm['dzuhur'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['dzuhur'] === 1) {
				return (<p style={{ color: "yellow" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'dzuhur')
	},
	{
		title: 'Ashar',
		dataIndex: 'ashar',
		render: (_, elm) => {
			if (elm['ashar'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['ashar'] === 1) {
				return (<p style={{ color: "yellow" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'ashar')
	},
	{
		title: 'Maghrib',
		dataIndex: 'maghrib',
		render: (_, elm) => {
			if (elm['maghrib'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['maghrib'] === 1) {
				return (<p style={{ color: "yellow" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'maghrib')
	},
	{
		title: 'Isya',
		dataIndex: 'isya',
		render: (_, elm) => {
			if (elm['isya'] === 0) {
				return (<p style={{ color: "red" }}>Belum Sholat</p>)
			} else if (elm['isya'] === 1) {
				return (<p style={{ color: "yellow" }}>Sudah Sholat</p>)
			} else {
				return (<p style={{ color: "green" }}>SODA</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'isya')
	},
	{
		title: 'Haid',
		dataIndex: 'haid',
		render: (_, elm) => {
			if (elm['haid']) {
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
			if (elm['cuti']) {
				return (<p>Iya</p>)
			} else {
				return (<p>Tidak</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'cuti')
	}
]

const onSearch = e => {
	// const value = e.currentTarget.value
	// const searchArray = e.currentTarget.value? dataItem : dataItemBackup
	// const data = utils.wildCardSearch(searchArray, value)
	// setDataItem(data)
	// setSelectedRowKeys([])
}

const RecentOrder = (props) => (
	<Card title={`History Karyawan`}>
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
			dataSource={props.dataKaryawan}
			rowKey='nip'
		/>
	</Card>
)

const AnalyticsKaryawan = () => {
	const [waktu, setWaktu] = useState();
	const [waktuSholat, setWaktuSholat] = useState({});
	const [totalKaryawan, setTotalKaryawan] = useState(0);
	const [totalKaryawanAktif, setTotalKaryawanAktif] = useState(0);
	const [totalKaryawanOff, setTotalKaryawanOff] = useState(0);
	const [dataKaryawan, setDataKaryawan] = useState([])
	const [dataSingleKaryawan, setDataSingleKaryawan] = useState({})
	const location = useLocation()

	const getObjects = (array, key, value) => {
		return array.filter(object => object[key] === value);
	}

	useEffect(() => {
		// Axios.get(`${strings.api.host}/harian/read-today`).then((doc) => {
		// 	setDataKaryawan(doc.data.doc)
		// })
		// setDataKaryawan(location.state._id)
		// setDataSingleKaryawan({...location.state.id})
	}, [])


	return (
		<>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
					<Card>
						<h1 style={{ textAlign: "center" }}>{"Agus Fitryadi"}</h1>
                        <h1 style={{ textAlign: "center" }}>Feb 17th, 2021</h1>
							</Card>
				</Col>
			</Row>
			<Row gutter={24} style={{ textAlign: "center" }}>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Dhuha</h1>
						<p>Waktu: 09:00</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Dzuhur</h1>
						<p>Waktu: 12:00</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Ashar</h1>
						<p>Waktu: 16:00</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Maghrib</h1>
						<p>Waktu: Sholat</p>
					</Card>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Isya</h1>
						<p>Waktu: Sholat</p>
					</Card>
				</Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Final</h1>
						<p>Waktu: 23.30</p>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default AnalyticsKaryawan