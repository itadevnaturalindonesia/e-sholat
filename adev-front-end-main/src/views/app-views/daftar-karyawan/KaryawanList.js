import React, {useState,useEffect} from 'react'
import { Card, Table, Input, Button, Menu, Upload } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined, ScheduleOutlined, SecurityScanOutlined, UserSwitchOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import axios from 'axios'
import { strings } from 'res';
import confirm from 'antd/lib/modal/confirm';
import KaryawanExcel from './KaryawanExcel';
import moment from 'moment';
import readXlsxFile from 'read-excel-file'
import TemplateExcel from './TemplateExcel';

const ProductList = (props) => {
	let history = useHistory();

	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [dataImport, setDataImport] = useState([]);
	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => changeAdmin(row)}>
				<Flex alignItems="center">
					<UserSwitchOutlined />
					<span className="ml-2">Admin</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => changeShiftSiang(row)}>
				<Flex alignItems="center">
					<ScheduleOutlined />
					<span className="ml-2">Change Shift Siang</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => changeShiftMalam(row)}>
				<Flex alignItems="center">
					<ScheduleOutlined />
					<span className="ml-2">Change Shift Malam</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Update</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => updatePassword(row)}>
				<Flex alignItems="center">
					<SecurityScanOutlined />
					<span className="ml-2">Reset Password</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">Delete</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const addProduct = () => {
		history.push({
			pathname: `${props.addPath}`,
			state: {
				status: false
			}
		})
	}
	
	const viewDetails = row => {
		history.push({
			pathname: `${props.addPath}`,
			state: {
				status: true,
				id: row
			}
		})
	}
	
	const updatePassword = row => {
		confirm({
			title: "Informasi Reset Password",
			content: "Apakah anda yakin?",
			onOk() {
				setIsLoading(true)
				axios.get(`${strings.api.base_url}/users/resetPassword/${row.nik}?key=${strings.api.key}`,{
					id_role_users:"1"
				}, { 
					headers: {
						'Content-Type': 'application/json'
					}}).then(doc => {
					if(doc.data !== null){
						getData();
						setIsLoading(false);
					}
				}).catch(e => {
					console.log(e.message)
				})
			},
			onCancel() {},
		});
	}
	
	const changeAdmin = row => {
		confirm({
			title: "Informasi Menjadi Admin",
			content: "Apakah anda yakin?",
			onOk() {
				setIsLoading(true)
				axios.put(`${strings.api.base_url}/users/ubahRole/${row.nik}?key=${strings.api.key}`,{
					id_role_users:"1"
				}, { 
					headers: {
					'Content-Type': 'application/json'
					}}).then(doc => {
					if(doc.data !== null){
						getData();
						setIsLoading(false);
					}
				}).catch(e => {
					console.log(e.message)
				})
			},
			onCancel() {},
		});
	}
	
	const deleteRow = row => {
		confirm({
			title: "Hapus Data",
			content: "Apa anda yakin?",
			onOk() {
				axios.delete(`${strings.api.base_url}/users/${row.nik}?key=${strings.api.key}`, { headers: {
					'Content-Type': 'application/json'
					}}).then(doc => {
					if(doc.data !== null){
						getData();
						setIsLoading(false);
					}
				}).catch(e => {
					console.log(e.message)
				})
			},
			onCancel() {},
		});
	}

	const changeShiftSiang = (row) => {
		setIsLoading(true)
		axios.post(`${strings.api.base_url}/shift/ubahShift/?key=${strings.api.key}`, {
			id_users:row.id_users,
			id_shift:"1"
		},{ headers: {
			'Content-Type': 'application/json'
			}}).then(doc => {
			if(doc.data !== null){
				getData();
				setIsLoading(false);
			}
		}).catch(e => {
			console.log(e.message)
		})
	}

	const changeShiftMalam = (row) => {
		setIsLoading(true)
		axios.post(`${strings.api.base_url}/shift/ubahShift/?key=${strings.api.key}`, {
			id_users:row.id_users,
			id_shift:"2"
		},{ headers: {
			'Content-Type': 'application/json'
			}}).then(doc => {
			if(doc.data !== null){
				getData();
				setIsLoading(false);
			}
		}).catch(e => {
			console.log(e.message)
		})
	}

	const tableColumns = [...props.tableColumns,{
		title: '',
		dataIndex: '',
		render: (_, elm) => (
			<div className="text-center">
				<EllipsisDropdown menu={dropdownMenu(elm)}/>
			</div>
		)
	}]
	
	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? dataItem : dataItemBackup
		const data = utils.wildCardSearch(searchArray, value)
		setDataItem(data)
		setSelectedRowKeys([])
	}

	const getData = async () => {
		setIsLoading(true)
		let response = await axios.get(`${props.host}`,{
			headers:{
				'content-type': 'application/json',
				"Access-Control-Allow-Origin": "*"
			}
		},(docs)=>{
			return docs.data
		})
		setDataItemBackup(response.data.doc || response.data.data)
		setDataItem(response.data.doc || response.data.data);
		setIsLoading(false);
	}

	useEffect(() => {
		getData();
	}, [])

	const showLoading = () => {
		return(
			<div className="table-responsive">
				<h1 style={{textAlign:"center"}}>{props.title}</h1>
				<Table 
					loading={isLoading}
					isLoading={isLoading}
					columns={tableColumns} 
					dataSource={dataItem} 
					rowKey={props.id || props.name} 
				/>
			</div>
		)		
	}

	const importShift = (rows) => {
		const temp = []
		rows.forEach((element, index) => {
			if (index !== 0) {
				temp.push({
					"nik":element[0].toString(),
					"shift":element[1].toString(),
					"nikadmin":localStorage.getItem('nik')
				})
			}
		});
		setIsLoading(true) 
		axios.post(`${strings.api.base_url}/shift/import/?key=${strings.api.key}`, JSON.stringify(temp),
		{ headers: {
			'Content-Type': 'application/json'
			}}).then(doc => {
			if(doc.data !== null){
				getData();
				setIsLoading(false);
			}
		}).catch(e => {
			console.log(e.message)
		})
	}

	const importKaryawan = (rows) => {
		const temp = []
		rows.forEach((element, index) => {
			if (index !== 0) {
				temp.push({
					"nik":element[0].toString(),
					"shift":element[1].toString(),
					"nikadmin":localStorage.getItem('nik')
				})
			}
		});
		setIsLoading(true) 
		axios.post(`${strings.api.base_url}/shift/import/?key=${strings.api.key}`, JSON.stringify(temp),
		{ headers: {
			'Content-Type': 'application/json'
			}}).then(doc => {
			if(doc.data !== null){
				getData();
				setIsLoading(false);
			}
		}).catch(e => {
			console.log(e.message)
		})
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
				</Flex>
				<Flex className="mb-1" mobileFlex={false}>
					<div>
						<Button onClick={() => addProduct()} type="primary" icon={<PlusCircleOutlined />} block>Tambah {props.title}</Button>
					</div>
					<div style={{marginLeft: 25}}>
						<Upload
							accept=".xls, .xlsx"
							showUploadList={false}
							beforeUpload={file => {
								readXlsxFile(file).then((rows) => {
									importKaryawan(rows)
								})
								return false;
							}}
						>
							<Button type="primary" style={{ width: "100%" }} icon={<PlusCircleOutlined />}>
								Import Beberapa Karyawan Excel
							</Button>
						</Upload>
					</div>
					<div style={{marginLeft: 25}}>
						{dataItem && (
							<KaryawanExcel
								filename={`Karyawan_${moment(new Date())}`} 
								data={dataItem}
							/>
						)}
					</div>
					<div style={{marginLeft: 25}}>
						<Upload
							accept=".xls, .xlsx"
							showUploadList={false}
							beforeUpload={file => {
								readXlsxFile(file).then((rows) => {
									importShift(rows)
								})
								return false;
							}}
						>
							<Button type="primary" style={{ width: "100%" }}>
								Import Shift
							</Button>
						</Upload>
					</div>
					<div style={{marginLeft: 10}}>
						<TemplateExcel />
					</div>
				</Flex>
			</Flex>
			{showLoading()}
		</Card>
	)
}

export default ProductList