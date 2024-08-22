import React, {useState,useEffect} from 'react'
import { Card, Table, Select, Input, Button, Menu, Spin,Space } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'

const AnalisaList = (props) => {
	let history = useHistory();

	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	const tableColumns = [...props.tableColumns]
	
	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? dataItem : dataItemBackup
		const data = utils.wildCardSearch(searchArray, value)
		setDataItem(data)
		setSelectedRowKeys([])
	}

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
					dataSource={props.data} 
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

export default AnalisaList