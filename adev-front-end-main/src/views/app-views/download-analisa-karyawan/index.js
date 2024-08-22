import React, { useEffect, useState } from 'react'
// import ListItems from '../shared-components/ListItems'
import ItemList from './AnalisaKaryawan'
import { Row, Col, Card, Table, Input, Form, Button, DatePicker } from 'antd';
import utils from 'utils'
import {strings} from 'res'
import EmployeeReport from './EmployeeReport';
import moment from 'moment';
import Axios from 'axios';

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
	}
];

const ANALISA = props => {

	const [form] = Form.useForm();
	const dateFormat = 'YYYY-MM-DD';

	const [dataEmployeeDhuha, setDataEmployeeDhuha] = useState([]);
    const [dataDateDhuha, setDataDateDhuha] = useState([]);
    const [dataEmployeeDzuhur, setDataEmployeeDhuzur] = useState([]);
    const [dataDateDzuhur, setDataDateDzuhur] = useState([]);
    const [dataEmployeeAshar, setDataEmployeeAshar] = useState([]);
    const [dataDateAshar, setDataDateAshar] = useState([]);
    const [dataEmployeeIsya, setDataEmployeeIsya] = useState([]);
    const [dataDateIsya, setDataDateIsya] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [dateStart, setDateStart] = useState(moment(new Date()).format(dateFormat));
    const [dateEnd, setDateEnd] = useState(moment(new Date()).format(dateFormat));

	const onChangeStart = (date, dateString) => {
		setDateStart(dateString)
	}
	
	const onChangeEnd = (date, dateString) => {
		setDateEnd(dateString)
	}

    useEffect(() => {
        //dhuha
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

    const reportEmployee = () => {
		setLoading(true)
        const getDhuha = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd,
            id_sholat:'1'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });
        
        const getDzuhur = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd,
            id_sholat:'2'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });
        
        const getAshar = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd,
            id_sholat:'3'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        const getIsya = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd,
            id_sholat:'5'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        Promise.all([getDhuha, getDzuhur, getAshar, getIsya])
            .then(function (results) {
                if ( 
                    results[0].data.data.length !== 0 &&
                    results[1].data.data.length !== 0 &&
                    results[2].data.data.length !== 0 &&
                    results[3].data.data.length !== 0
                ) {
                    setDataDateDhuha(results[0].data.data.datatgl)
                    setDataDateDzuhur(results[1].data.data.datatgl)
                    setDataDateAshar(results[2].data.data.datatgl)
                    setDataDateIsya(results[3].data.data.datatgl)
                    saveDataState(results[0].data.data, 1)
                    saveDataState(results[1].data.data, 2)
                    saveDataState(results[2].data.data, 3)
                    saveDataState(results[3].data.data, 5) 
                }
				setLoading(false)
            });
    }

	const onSubmit = (values) => {
		setDataEmployeeDhuha([])
		setDataEmployeeDhuzur([])
		setDataEmployeeAshar([])
		setDataEmployeeIsya([])
		reportEmployee()
	}

	return (
		<div>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Card loading={isLoading}>
						<Form form={form} layout="vertical" onFinish={onSubmit}>
							<Form.Item name="date_end" label="Tanggal Mulai">
								<DatePicker style={{ width: '100%' }} onChange={onChangeStart} defaultValue={moment(new Date(), dateFormat)} />
							</Form.Item>
							<Form.Item name="date_start" label="Tanggal Akhir">
								<DatePicker style={{ width: '100%' }} onChange={onChangeEnd} defaultValue={moment(new Date(), dateFormat)} />
							</Form.Item>
							<Form.Item>
								<Button type="primary" style={{ width: "100%" }} htmlType="submit">Cari Data</Button>
							</Form.Item>
						</Form>
						{dataEmployeeDhuha && dataEmployeeDzuhur && dataEmployeeAshar && dataEmployeeIsya 
						&& dataDateDhuha && dataDateDzuhur && dataDateAshar && dataDateIsya && (
							<EmployeeReport 
								dataEmployeeDhuha={dataEmployeeDhuha} 
								dataEmployeeDzuhur={dataEmployeeDzuhur}
								dataEmployeeAshar={dataEmployeeAshar}
								dataEmployeeIsya={dataEmployeeIsya}
								dataDateDhuha={dataDateDhuha}
								dataDateDzuhur={dataDateDzuhur}
								dataDateAshar={dataDateAshar}
								dataDateIsya={dataDateIsya}
                                filename={`Analisa_Karyawan_${moment(new Date())}`} />
						)}
					</Card>
				</Col>
			</Row>
			<ItemList 
				tableColumns={tableColumns} 
				host={`${strings.api.base_url}/users/?key=${strings.api.key}`} 
				title={"Karyawan"} 
				detailData={`detail-analisa-karyawan`}
				editPath={`edit-karyawan`}
				url={`${strings.api.base_url}/users/getUsers/1/?key=${strings.api.key}`}
				id={"_id"}
			/>
		</div>
	)
}

export default ANALISA