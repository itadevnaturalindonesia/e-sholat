import { Form,Row,Col,Card } from 'antd'
import Axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { strings } from 'res'
import utils from 'utils'
// import ListItems from '../shared-components/ListItems'
import ItemList from './BadList'

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
	/**
	 * Calling API
	 */
	const [form] = Form.useForm();
	const dateFormat = 'YYYY-MM-DD';

	const [dataEmployeeDhuha, setDataEmployeeDhuha] = useState([]);
    const [dataEmployeeDzuhur, setDataEmployeeDhuzur] = useState([]);
    const [dataEmployeeAshar, setDataEmployeeAshar] = useState([]);
    const [dataEmployeeIsya, setDataEmployeeIsya] = useState([]);
    const [dataBad, setDataBad] = useState([]);
    const [isLoading, setLoading] = useState(false);
	const [totalBad,setTotalBad] = useState(0)

	/**
	 * OnLoad Page
	 */
	useEffect(() => {
		reportEmployee()
	}, [])

	const saveDataState = (datas, value) => {
        let data = {}
        datas.datadetail.map(element => {
            const keyEl = Object.keys(element)
            element[keyEl].forEach((currentValue, index) => { 
                if (index === 0) {
                    data = { 
                        name: keyEl[0],
                        status_dinas: currentValue.status_dinas,
                        name_division: currentValue.name_division,
                        name_position: currentValue.name_position,
                        [currentValue.tgl]: currentValue.waktu === null ? currentValue.status : currentValue.waktu
                    }
                } else {
                    data = {
                        ...data, 
                        [currentValue.tgl]: currentValue.waktu === null ? currentValue.status : currentValue.waktu,
                    }
                }
                if (index === element[keyEl].length - 1) {
                    if (value === 1) setDataEmployeeDhuha(dataEmployee => [...dataEmployee, data])
                    if (value === 2) setDataEmployeeDhuzur(dataEmployee => [...dataEmployee, data])
                    if (value === 3) setDataEmployeeAshar(dataEmployee => [...dataEmployee, data])
                    if (value === 5) setDataEmployeeIsya(dataEmployee => [...dataEmployee, data])
                }
            })
        });
    }
	
	const saveBadState = (datas) => {
		const temp = []
        datas.datadetail.map((element, indexx) => {
            const keyEl = Object.keys(element)
            element[keyEl].forEach((currentValue, index) => { 
				if (indexx === 0) {
					temp.push({ 
						[currentValue.tgl]: currentValue.nama,
					})
				}
				else {
					if (index < temp.length -1) {
						temp[index] = {...temp[index], [currentValue.tgl]: currentValue.nama}
					} else {
						temp.push({ 
							[currentValue.tgl]: currentValue.nama,
						})
					}
				}
            });
        });
		setDataBad(temp);
    }

    const reportEmployee = () => {
		setLoading(true)

		Axios.post(`${strings.api.sql_host}/reporting/excel-employee-bad/?key=${strings.api.key}`,{
			tglstart:moment().tz("Asia/Jakarta").format("YYYY-MM-DD"),
            tglend:moment().tz("Asia/Jakarta").format("YYYY-MM-DD")
		}, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc=>{
			console.log(doc.data.data)
			setTotalBad(doc.data.data.datadetail[0][moment().tz("Asia/Jakarta").format("YYYY-MM-DD")].length - 2)
		});
    }

	return (
		<div>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} >
					<Card>
						<h1 style={{ textAlign: "center" }}>Total Bad</h1>
						<h1 style={{ textAlign: "center", color: "green" }}>{totalBad}</h1>
					</Card>
				</Col>
			</Row>
			<ItemList 
				tableColumns={tableColumns} 
				title={"Karyawan Tidak Sholat Hari Ini"} 
				detailData={`detail-karyawan`}
				addPath={`print-bad-employee`} 
				editPath={`edit-karyawan`}
				url={`${strings.api.sql_host}/users/?key=${strings.api.key}`}
			/>
		</div>
	)
}

export default BADEMPLOYEE