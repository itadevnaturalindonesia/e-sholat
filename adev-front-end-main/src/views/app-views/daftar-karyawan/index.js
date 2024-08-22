import React from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './KaryawanList'
import DepartemenList from './DepartemenList'
import PosisiList from './PosisiList'
import LokasiList from './LokasiList'
import DivisionList from './DivisionList'
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
		title: 'Akses',
		dataIndex: 'name_role_users',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_role_users')
	},
	{
		title: 'Shift',
		dataIndex: 'name_shift',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_shift')
	}
];

const tableColumnsDepartement = [
	{
		title: 'ID',
		dataIndex: 'id_department',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'id_department')
	},
	{
		title: 'Nama Departemen',
		dataIndex: 'name_department',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_department')
	}
];

const tableColumnsPosition = [
	{
		title: 'ID',
		dataIndex: 'id_position',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'id_position')
	},
	{
		title: 'Nama Posisi',
		dataIndex: 'name_position',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_position')
	}
];

const tableColumnsDivision = [
	{
		title: 'ID',
		dataIndex: 'id_division',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'id_division')
	},
	{
		title: 'Nama Divisi',
		dataIndex: 'name_division',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_division')
	}
];

const tableColumnsLocation = [
	{
		title: 'ID',
		dataIndex: 'id_location',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'id_location')
	},
	{
		title: 'Nama Lokasi',
		dataIndex: 'name_location',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_location')
	}
];

const KARYAWAN = props => {
	return (
		<div>
			<ItemList 
				tableColumns={tableColumns} 
				host={`${strings.api.sql_host}/users/?key=${strings.api.key}`} 
				key={`${strings.api.key}`}
				title={"Karyawan"} 
				detailData={`detail-karyawan`}
				addPath={`detail-karyawan`} 
				editPath={`edit-karyawan`}
				id={"_id"}
			/>
			<DepartemenList 
				tableColumns={tableColumnsDepartement} 
				host={`${strings.api.sql_host}/department/?key=${strings.api.key}`} 
				key={`${strings.api.key}`}
				title={"Departemen"} 
				addPath={`tambah-item`}
				id={"_id"}
			/>
			<DivisionList 
				tableColumns={tableColumnsDivision} 
				host={`${strings.api.sql_host}/division/?key=${strings.api.key}`} 
				key={`${strings.api.key}`}
				title={"Divisi"} 
				addPath={`tambah-item`}
				id={"_id"}
			/>
			<PosisiList 
				tableColumns={tableColumnsPosition} 
				host={`${strings.api.sql_host}/position/?key=${strings.api.key}`} 
				key={`${strings.api.key}`}
				title={"Posisi"} 
				addPath={`tambah-item`}
				id={"_id"}
			/>
			<LokasiList 
				tableColumns={tableColumnsLocation} 
				host={`${strings.api.sql_host}/location/?key=${strings.api.key}`} 
				key={`${strings.api.key}`}
				title={"Lokasi"} 
				addPath={`tambah-item`}
				id={"_id"}
			/>
		</div>
	)
}

export default KARYAWAN