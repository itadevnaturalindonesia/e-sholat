 import React from 'react'
// import ListItems from '../shared-components/ListItems'
import CutiList from './CutiList'
import HaidList from './HaidList'
import utils from 'utils'
import { strings } from 'res'

const tableColumns = [
	{
		title: 'NIK',
		dataIndex: 'nik',
		render: (_, elm) => {
			return (<p>{elm.nik}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'nik')
	},
	{
		title: 'Tanggal',
		dataIndex: 'tgl',
		render: (_, elm) => {
			return (<p>{elm.tgl}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'tgl')
	},
	{
		title: 'Nama',
		dataIndex: 'name_users',
		render: (_, elm) => {
			return (<p>{elm.name_users}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_users')
	},
	{
		title: 'Division',
		dataIndex: 'name_division',
		render: (_, elm) => {
			return (<p>{elm.name_division}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_division')
	},
	{
		title: 'Department',
		dataIndex: 'name_department',
		render: (_, elm) => {
			return (<p>{elm.name_department}</p>)
		},
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name_department')
	}
]

const KARYAWAN = props => {
	return (
		<div>
			<CutiList
				tableColumns={tableColumns}
				title={"Karyawan Cuti Hari Ini"}
				detailData={`detail-karyawan`}
				id={"_id"}
			/>

			<HaidList
				tableColumns={tableColumns}
				host={`${strings.api.host}/karyawan/read`}
				delete={`${strings.api.host}/karyawan/delete`}
				title={"Karyawan Haid Hari Ini"}
				detailData={`detail-karyawan`}
				addPath={`detail-karyawan`}
				editPath={`edit-karyawan`}
				url={`${strings.api.host}/karyawan/`}
				id={"_id"}
			/>
		</div>
	)
}

export default KARYAWAN