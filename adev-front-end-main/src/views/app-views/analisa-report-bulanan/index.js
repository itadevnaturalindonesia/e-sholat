import React from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './KaryawanList'
import utils from 'utils'
import {strings} from 'res'

const tableColumns = [
	{
		title: 'Bulan',
		dataIndex: 'bulan',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'bulan')
	},
	{
		title: 'Tahun',
		dataIndex: 'tahun',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'tahun')
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
		title: 'Tidak Sholat',
		dataIndex: 'bad',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'bad')
	}
];

const KARYAWAN = props => {
	return (
		<div>
				<ItemList 
					tableColumns={tableColumns} 
					host={`${strings.api.host}/bulanan/read`} 
					key={`${strings.api.key}`}
					delete={`${strings.api.sql_host}/users`} 
					title={"Laporan Bulanan"} 
					id={"_id"}
				/>
		</div>
	)
}

export default KARYAWAN