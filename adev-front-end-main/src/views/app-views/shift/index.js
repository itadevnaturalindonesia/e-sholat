import React from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './ShiftList'
import utils from 'utils'
import {strings} from 'res'

const tableColumns = [
	{
		title: 'NIP',
		dataIndex: 'nik',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'nik')

	},
	{
		title: 'Nama Lengkap',
		dataIndex: 'name_users',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_users')
	},
	{
		title: 'Email',
		dataIndex: 'email',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'email')
	},
	{
		title: 'Divisi',
		dataIndex: 'name_division',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_division')
	},
];

const SHIFT = props => {
  const { match } = props
	return (
		<div>
			<ItemList 
				tableColumns={tableColumns} 
				host={`${strings.api.sql_host}/users/shift/1?key=${strings.api.key}`} 
				delete={`${strings.api.sql_host}/karyawan/delete`} 
				title={"Karyawan Shift Siang Hari Ini"} 
				detailData={`detail-karyawan`}
				addPath={`detail-karyawan`} 
				editPath={`edit-karyawan`}
				url={`${strings.api.host}/karyawan/`}
				id={"_id"}
			/>

			<ItemList 
				tableColumns={tableColumns} 
				host={`${strings.api.sql_host}/users/shift/2?key=${strings.api.key}`} 
				delete={`${strings.api.sql_host}/karyawan/delete`} 
				title={"Karyawan Shift Malam Hari Ini"} 
				detailData={`detail-karyawan`}
				addPath={`detail-karyawan`} 
				editPath={`edit-karyawan`}
				url={`${strings.api.host}/karyawan/`}
				id={"_id"}
			/>
		</div>
	)
}

export default SHIFT