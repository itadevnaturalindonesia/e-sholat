import React from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './AktifList'
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
	{
		title: 'Shift',
		dataIndex: 'name_shift',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_shift')
	}
];

const KARYAWAN = props => {
  const { match } = props
	return (
		<div>
			<ItemList 
				tableColumns={tableColumns} 
				title={"Karyawan Aktif Hari Ini"} 
				detailData={`detail-karyawan`}
				addPath={`detail-karyawan`} 
				editPath={`edit-karyawan`}
				id={"_id"}
			/>
		</div>
	)
}

export default KARYAWAN