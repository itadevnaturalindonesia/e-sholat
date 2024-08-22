import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Table, message, Select, Input } from 'antd';
import Flex from 'components/shared-components/Flex'
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import {
	CloudDownloadOutlined,
	ArrowUpOutlined,
	UserSwitchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import ChartWidget from 'components/shared-components/ChartWidget';
import { COLORS } from 'constants/ChartConstant';
import utils from 'utils'
import { SearchOutlined, StarBorderOutlined } from "@material-ui/icons";
import moment from "moment-timezone";
import Axios from 'axios'
import { strings } from 'res';

const WeeklyRevenue = ({ startDate, endDate, data }) => (
	<Card>
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>
				<Flex className="h-100" flexDirection="column" justifyContent="between">
					<div>
						<h4 className="mb-0">Aktifitas Mingguan</h4>
						<span className="text-muted"> {startDate} / {endDate} </span>
					</div>
				</Flex>
			</Col>
			<Col xs={24} sm={24} md={24} lg={32}>
				<ChartWidget
					card={false}
					series={data.series}
					xAxis={data.categories}
					height={250}
					type="bar"
					customOptions={{ colors: COLORS }}
				/>
			</Col>
		</Row>
	</Card>
)

const DisplayDataSet = (props) => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.karyawan}
				title="Semua Karyawan"
				color="blue"
				vertical={true}
				avatarSize={55}
			/>
			<DataDisplayWidget
				icon={<StarBorderOutlined />}
				value={props.totalKaryawanAktif}
				title="Karyawan Aktif"
				color="green"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.totalKaryawanOff}
				title="Karyawan Non Aktif"
				color="gray"
				vertical={true}
				avatarSize={55}
			/>
			<DataDisplayWidget
				icon={<CloudDownloadOutlined />}
				value="1"
				title="Total Server"
				color="cyan"
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
	{
		title: 'Divisi',
		dataIndex: 'name_division',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_division')
	}
]

const Dashboard = () => {

	const [waktu, setWaktu] = useState();
	const [waktuSholat, setWaktuSholat] = useState([]);
	const [timeSholat, setTimeSholat] = useState([]);
	const [waktuSholatSekarang, setWaktuSholatSekarang] = useState("Transisi");
	const [totalKaryawan, setTotalKaryawan] = useState(0);
	const [totalKaryawanAktif, setTotalKaryawanAktif] = useState(0);
	const [totalKaryawanOff, setTotalKaryawanOff] = useState(0);
	const [isLoading, setIsLoading] = useState(true)

	const [weekly, setWeekly] = useState()

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const [categories, setCategories] = useState([])
	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);

	const { Option, OptGroup } = Select;

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? dataItem : dataItemBackup
		const data = utils.wildCardSearch(searchArray, value)
		setDataItem(data)
	}

	const onSodaLastWeek = () => {

		Axios.get(`${strings.api.sql_host}/reporting/sodalastweek/?key=${strings.api.key}`, {
			headers: {
				'content-type': 'application/json',
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			const soda = []
			const categories = []
			doc.data.data.forEach(element => {
				soda.push(element.soda)
				console.log(element)
				categories.push(element.tgl)
			});
			setWeekly({
				series: [
					{
						name: 'Soda',
						data: soda
					}
				],
				categories: categories
			})

			setStartDate(doc.data.data[0].tgl)
			setEndDate(doc.data.data[doc.data.data.length - 1].tgl)
		}).catch(err => {
			message.error(err.response)
		})

	}

	const onGetDivision = () => {
		Axios.get(`${strings.api.sql_host}/division/?key=${strings.api.key}`, {
			headers: {
				'content-type': 'application/json',
				"Access-Control-Allow-Origin": "*"
			}
		}).then(doc => {
			setCategories(doc.data.data)
		}).catch(err => {
			message.error(err.response)
		})
	}

	const onGetTotal = () => {
		Axios.get(`${strings.api.sql_host}/users/total/?key=${strings.api.key}`).then((doc) => {
			setTotalKaryawan(doc.data.data[0].total)
			setTotalKaryawanAktif(doc.data.data[0].aktif)
			setTotalKaryawanOff(doc.data.data[0].nonaktif)
		})
	}

	const onReporting = () => {
		setIsLoading(true)
		Axios.get(`${strings.api.sql_host}/reporting/${moment().tz("Asia/Jakarta").format("YYYY-MM-DD")}/${moment().tz("Asia/Jakarta").format("YYYY-MM-DD")}?key=${strings.api.key}`).then((doc) => {
			setDataItem(doc.data.data)
			setDataItemBackup(doc.data.data)
			setIsLoading(false)
		})
	}

	const onTimePrayer = () => {
		Axios.get(`${strings.api.sql_host}/prayer/?key=${strings.api.key}`).then((doc) => {
			setWaktuSholat(doc.data.data)
			setTimeSholat({
				dhuha_start: doc.data.data[0].start_time_prayer,
				dhuha_soda: doc.data.data[0].soda_time_prayer,
				dhuha_stop: doc.data.data[0].end_time_prayer,

				dzuhur_start: doc.data.data[1].start_time_prayer,
				dzuhur_soda: doc.data.data[1].soda_time_prayer,
				dzuhur_stop: doc.data.data[1].end_time_prayer,

				ashar_start: doc.data.data[2].start_time_prayer,
				ashar_soda: doc.data.data[2].soda_time_prayer,
				ashar_stop: doc.data.data[2].end_time_prayer,

				maghrib_start: doc.data.data[3].start_time_prayer,
				maghrib_soda: doc.data.data[3].soda_time_prayer,
				maghrib_stop: doc.data.data[3].end_time_prayer,

				isya_start: doc.data.data[4].start_time_prayer,
				isya_soda: doc.data.data[4].soda_time_prayer,
				isya_stop: doc.data.data[4].end_time_prayer
			})
		})
	}

	useEffect(() => {
		setIsLoading(true)

		onSodaLastWeek();
		onGetDivision();
		onReporting();
		onGetTotal();
		onTimePrayer();

	}, [])

	useEffect(() => {
		setInterval(() => {
			setWaktu(moment().tz("Asia/Jakarta").format("MMMM Do YYYY, HH:mm:ss"));
			if (timeSholat.dhuha_start < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < timeSholat.dhuha_soda) {
				setWaktuSholatSekarang("Dhuha SODA")
			} else if (`${timeSholat.dhuha_soda}` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.dhuha_stop}`) {
				setWaktuSholatSekarang("Dhuha")
			} else if (`${timeSholat.dzuhur_start}` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.dzuhur_soda}`) {
				setWaktuSholatSekarang("Dzuhur SODA")
			} else if (`${timeSholat.dzuhur_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.dzuhur_stop}:00`) {
				setWaktuSholatSekarang("Dzuhur")
			} else if (`${timeSholat.ashar_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.ashar_soda}:00`) {
				setWaktuSholatSekarang("Ashar SODA")
			} else if (`${timeSholat.ashar_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.ashar_stop}:00`) {
				setWaktuSholatSekarang("Ashar")
			} else if (`${timeSholat.maghrib_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.maghrib_soda}:00`) {
				setWaktuSholatSekarang("Maghrib SODA")
			} else if (`${timeSholat.maghrib_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.maghrib_stop}:00`) {
				setWaktuSholatSekarang("Maghrib")
			} else if (`${timeSholat.isya_start}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.isya_soda}:00`) {
				setWaktuSholatSekarang("Isya SODA")
			} else if (`${timeSholat.isya_soda}:00` < moment().tz("Asia/Jakarta").format("HH:mm:ss") && moment().tz("Asia/Jakarta").format("HH:mm:ss") < `${timeSholat.isya_stop}:00`) {
				setWaktuSholatSekarang("Isya")
			}
		}, 1000);
	})

	const handleShowCategory = value => {
		if (value !== 'All') {
			const key = 'name_division'
			const data = utils.filterArray(dataItem, key, value)
			setDataItem(data)
		} else {
			setDataItem(dataItem)
		}
	}

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
					<Card>
						<h1 style={{ textAlign: "center" }}>{waktu}</h1>
						<h1 style={{ textAlign: "center", color: "green" }}>{waktuSholatSekarang}</h1>
					</Card>
				</Col>
				<Col xs={24} sm={24} md={24} lg={16} xl={15} xxl={14}>
					{
						startDate && (
							<WeeklyRevenue startDate={startDate} endDate={endDate} data={weekly} />
						)
					}
				</Col>
				<Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
					<DisplayDataSet karyawan={totalKaryawan} totalKaryawanAktif={totalKaryawanAktif} totalKaryawanOff={totalKaryawanOff} />
				</Col>
			</Row>
			<Row gutter={24} style={{ textAlign: "center" }}>
				{
					waktuSholat.map(doc => {
						return (
							<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
								<Card>
									<h1>{doc.name_time_prayer}</h1>
									<p>Mulai	: {doc.start_time_prayer}</p>
									<p>SODA		: {doc.soda_time_prayer}</p>
									<p>Selesai	: {doc.end_time_prayer}</p>
								</Card>
							</Col>
						)
					})
				}
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} >
					<Card>
						<h1>Total</h1>
						<p>Dhuha, Dzuhur, Ashar</p>
					    <p>Isya</p>
						<p>Total	: 4</p>
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<Card title="Karyawan Aktif dan Status Hari Ini">
						<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
							<Flex className="mb-1" mobileFlex={false}>
								<div className="mr-md-3 mb-3">
									<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
								</div>
								<div className="mb-3">
									<Select
										defaultValue="All"
										className="w-100"
										style={{ minWidth: 180 }}
										onChange={handleShowCategory}
										placeholder="Category"
									>
										<Option value="All">All</Option>
										{
											categories.map(elm => (
												<Option key={elm.id_division} value={elm.name_division}>{elm.name_division}</Option>
											))
										}
									</Select>
								</div>
							</Flex>
						</Flex>
						<Table
							pagination={true}
							isLoading={isLoading}
							columns={tableColumns}
							dataSource={dataItem}
							rowKey='nik'
						/>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Dashboard