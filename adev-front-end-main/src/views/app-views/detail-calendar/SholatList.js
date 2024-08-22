import React, {useState,useEffect} from 'react'
import { Card, Table, Select, Input, Menu, Spin,Space } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import axios from 'axios'
import { strings } from 'res';
import confirm from 'antd/lib/modal/confirm';

const { Option } = Select

const SholatList = (props) => {
	let history = useHistory();

	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Detail</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const viewDetails = row => {
		history.push({
			pathname: `${props.detailData}`,
			state: {
				status: true,
				id: row
			}
		})
	}
	
	const deleteRow = row => {
		confirm({
			title: "Update Data",
			content: "Are you sure?",
			onOk() {
				if(props.delete){
                    axios.get(`${props.delete}/${row._id}`, { headers: {
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
			},
			onCancel() {},
		});
	}

	const onDeleteDynamis = (row) => {
		setIsLoading(true)
			axios.delete(`${props.url}${row}${strings.api.key}`, { headers: {
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

	const onDelete = (row) => {
		setIsLoading(true)
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

	const handleShowCategory = value => {
		if(value !== 'All') {
			let res = dataItem.filter(item => item.id_categories === value)
			setDataItemBackup(dataItem)
			setDataItem(res)
		} else {
			setDataItem(dataItemBackup)
		}
	}

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

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
		getData()
	}, [])

	const showLoading = () =>{
		if(isLoading){
			return(
				<div className="table-responsive" style={{textAlign:"center",width:"100%",height:"100%"}}>
					 <Space size="middle" style={{textAlign:"center"}}>
						<Spin size="large" tip="Loading..." />
					</Space>,
				</div>
			)
		}else{
			return(
				<div className="table-responsive">
				<h1 style={{textAlign:"center"}}>{props.title}</h1>
				
				<Table 
					isLoading={isLoading}
					columns={tableColumns} 
					dataSource={dataItem} 
					rowKey={props.id || props.name} 
				/>
			</div>
			)
		}
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
				</Flex>
			</Flex>
			{showLoading()}
		</Card>
	)
}

export default SholatList