import React, {useState,useEffect} from 'react'
import { Card, Table, Spin,Space } from 'antd';
import Flex from 'components/shared-components/Flex'
import Axios from 'axios'
import moment from 'moment-timezone'
import { strings } from 'res';

const BadList = (props) => {

	const [dataItem, setDataItem] = useState([]);
	const [isLoading, setIsLoading] = useState(true)


	const tableColumns = [...props.tableColumns]

	const getData = async () => {
		setIsLoading(true)
        Axios.get(`${strings.api.sql_host}/reporting/listbademployee/${moment().tz("Asia/Jakarta").format("YYYY-MM-DD")}/${moment().tz("Asia/Jakarta").format("YYYY-MM-DD")}?key=${strings.api.key}`).then((doc) => {
			let hasil = doc.data.data[0][`${moment().tz("Asia/Jakarta").format("YYYY-MM-DD")}`]
			setDataItem(hasil)
			setIsLoading(false)
		})
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
				<div className="table-responsive" >
				<h1 style={{textAlign:"center"}}>{props.title}</h1>
				
				<Table 
					isLoading={isLoading}
                    bordered={false}
					columns={tableColumns} 
					dataSource={dataItem} 
                    pagination={false}
					rowKey={props.id || props.name} 
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

export default BadList