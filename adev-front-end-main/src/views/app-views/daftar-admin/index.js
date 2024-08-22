import React from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './AdminList'
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
		title: 'Department',
		dataIndex: 'name_department',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_department')
	},
	{
		title: 'Location',
		dataIndex: 'name_location',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_location')
	}
];

const ADMIN = props => {
	return (
		<div>
				<ItemList 
					tableColumns={tableColumns} 
					host={`${strings.api.sql_host}/users/getUsers/1?key=${strings.api.key}`} 
					delete={`${strings.api.host}/user/delete`} 
					title={"Daftar Admin"} 
					detailData={`detail-user`}
					addPath={`detail-user`} 
					editPath={`edit-user`}
					url={`${strings.api.host}/user/`}
					id={"_id"}
				/>
		</div>
	)
}

export default ADMIN