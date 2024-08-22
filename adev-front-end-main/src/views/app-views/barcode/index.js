import React from 'react'
import utils from 'utils'
import {strings} from 'res'
import BarcodeList from './BarcodeList'

const tableColumns = [
	{
		title: 'ID',
		dataIndex: 'id',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'id')

	},
	{
		title: 'Nama',
		dataIndex: 'qrstr',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'qrstr')
	},
	{
		title: 'Dibuat',
		dataIndex: 'rec_timestamp',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'rec_timestamp')
	},
	{
		title: 'Status',
		dataIndex: 'status',
		sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
	},
];

const Barcode = props => {
	return (
		<div>
				<BarcodeList 
					tableColumns={tableColumns} 
					host={`${strings.api.sql_host}/qrcode/?key=${strings.api.key}`} 
					key={`${strings.api.key}`}
					title={"Daftar QRCode"} 
					addPath={`${strings.api.sql_host}/qrcode/?key=${strings.api.key}`} 
					id={"id"}
				/>
		</div>
	)
}

export default Barcode