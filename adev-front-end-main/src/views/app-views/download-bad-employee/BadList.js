import React, {useState,useEffect} from 'react'
import { Card, Table, Button, Spin,Space, message } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import Axios from 'axios'
import moment from 'moment-timezone'
import { strings } from 'res';

const BadList = (props) => {
	let history = useHistory();

	const [categories,setCategories] = useState([])
	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);
	const [isLoading, setIsLoading] = useState(true)

	const printReport = () => {
		history.push({
			pathname: `${props.addPath}`,
			state: {
				false: true
			}
		})
	}

	const tableColumns = [...props.tableColumns,{
		title: '',
		dataIndex: '',
		render: (_, elm) => (
			<div className="text-center"></div>
		)
	}]

	const getData = async () => {
		setIsLoading(true)
        Axios.post(`${strings.api.sql_host}/reporting/listbademployee/?key=${strings.api.key}`,
		{
			"tglstart":moment().tz("Asia/Jakarta").format("YYYY-MM-DD"),
			"tglend":moment().tz("Asia/Jakarta").format("YYYY-MM-DD"),
			"id_division":""
		}).then((doc) => {
			if(doc.data.data[0]){		
				setDataItem(doc.data.data[0][`${moment().tz("Asia/Jakarta").format("YYYY-MM-DD")}`])
				setDataItemBackup(doc.data.data[0][`${moment().tz("Asia/Jakarta").format("YYYY-MM-DD")}`])
				setIsLoading(false)
			}
			setIsLoading(false)
		})
	}

	useEffect(() => {
		getData()
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
			<Flex alignItems="center" justifyContent="end" mobileFlex={false}>
				<div>
					<Button onClick={() => window.print()} type="primary" icon={<PrinterOutlined />} block>Cetak Report</Button>
				</div>
			</Flex>
			{showLoading()}
		</Card>
	)
}

export default BadList