import React, {useState,useEffect} from 'react'
import { Card, Table, Spin,Space } from 'antd';
import Flex from 'components/shared-components/Flex'
import Axios from 'axios'
import moment from 'moment-timezone'
import { strings } from 'res';
import utils from 'utils'

const BADEMPLOYEE = (props) => {

	const [dataItem, setDataItem] = useState([]);
	const [date, setDate] = useState("");
	const [isLoading, setIsLoading] = useState(true)

	const tableColumns = [
		{
			title: 'Dhuha',
			dataIndex: 'dhuha',
			render: (_, elm) => {
				if ((elm['dhuha']< 1)) {
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
				if ((elm['dzuhur']< 1)) {
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
		console.log(props.date)
        Axios.post(`${strings.api.sql_host}/reporting/listbademployee/?key=${strings.api.key}`,{
			"tglstart":props.date,
			"tglend":props.date,
			"id_division":props.id_division
		}).then((doc) => {
			let hasil = doc.data.data[0][props.id_division]
			setDataItem(hasil)
			setIsLoading(false)
		})
	}

	useEffect(() => {
		setDate(props.date)
		getData(props.date)
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
				<div className="table-responsive" >
				<h1 style={{textAlign:"center"}}>{`Bad Employee Tanggal ${props.date}`}</h1>
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
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
			</Flex>
			{showLoading()}
		</Card>
	)
}

export default BADEMPLOYEE