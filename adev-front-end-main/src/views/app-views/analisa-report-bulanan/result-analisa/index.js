import React, { useEffect, useState } from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './AnalisaList'
import utils from 'utils'
import Axios from 'axios'
import {useLocation} from 'react-router-dom'
import {strings} from "res"

const tableColumns = [
	{
		title: 'Start Date',
		dataIndex: 'startdate',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'startdate')
	},
	{
		title: 'End Date',
		dataIndex: 'enddate',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'enddate')
	},
	{
		title: 'Divisi ID',
		dataIndex: 'id_division',
		render:(_,elm)=>{
			if(elm.id_division){
				return(<p>{elm.id_division}</p>)
			}else{
				return(<p>All</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'id_division')
	},
	{
		title: 'Divisi',
		dataIndex: 'division',
		render:(_,elm)=>{
			if(elm.division){
				return(<p>{elm.division}</p>)
			}else{
				return(<p>All</p>)
			}
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'division')
	},
	{
		title: 'SODA',
		dataIndex: 'soda',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'soda')
	},
	{
		title: 'Bad Employee',
		dataIndex: 'bad',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'bad')
	}
];

const KARYAWAN = props => {

    const location = useLocation()
    const [data, setData] = useState()

    useEffect(()=>{
		Axios.post(`${strings.api.base_url}/reporting/analisa/?key=${strings.api.key}`,{
			"tglstart":location.state.data.startdate,
			"tglend":location.state.data.enddate,
			"id_division":location.state.data.id_division
		}).then(doc=>{
			setData(doc.data.data.hasil)
		})
    },[])

	return (
		<div>
				<ItemList 
					tableColumns={tableColumns} 
                    data={data}
					title={"Result SODA"} 
					id={"id"}
				/>
		</div>
	)
}

export default KARYAWAN