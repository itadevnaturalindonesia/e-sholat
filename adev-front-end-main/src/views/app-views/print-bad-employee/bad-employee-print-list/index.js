import React from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './BadList'
import utils from 'utils'
import {strings} from 'res'

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

const BADEMPLOYEE = props => {
  const { match } = props
	return (
		<div>
				<ItemList 
					tableColumns={tableColumns} 
					title={"Bad Employee Hari Ini"} 
					detailData={`detail-karyawan`}
					addPath={`print-bad-employee`} 
					editPath={`edit-karyawan`}
					url={`${strings.api.sql_host}/users/?key=${strings.api.key}`}
					id={"_id"}
				/>
		</div>
	)
}

export default BADEMPLOYEE