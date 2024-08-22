import { PlusCircleOutlined, SearchOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Button, Card, Input, Menu, Table } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import axios from 'axios';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { strings } from 'res';
import utils from 'utils';

const ProductList = (props) => {
	let history = useHistory();

	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<UserSwitchOutlined />
					<span className="ml-2">Delete</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const addProduct = () => {
		history.push({
			pathname: 'tambah-item',
			state: {
				status: false,
                for_api:"location",
                title:"Lokasi"
			}
		})
	}
	
	const deleteRow = row => {
		confirm({
			title: "Hapus Data",
			content: "Apa anda yakin?",
			onOk() {
				axios.delete(`${strings.api.base_url}/location/${row.id_location}?key=${strings.api.key}`, { headers: {
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
						<Button  onClick={() => addProduct()} type="primary" icon={<PlusCircleOutlined />} block>Tambah {props.title}</Button>
					</div>
				</Flex>
			</Flex>
			{showLoading()}
		</Card>
	)
}

export default ProductList