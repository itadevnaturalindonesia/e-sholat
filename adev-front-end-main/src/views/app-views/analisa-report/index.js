import React, { useEffect, useState } from 'react'
// import ListItems from '../shared-components/ListItems'
import { DatePicker, Row, Col, Form, Button, Card  } from 'antd';
import moment from 'moment';
import AnalisaExcel from './AnalisaExcel';
import AnalisaPoinExcel from './AnalisaPoinExcel';
import Axios from 'axios';
import { strings } from 'res';

const { RangePicker } = DatePicker;

const AnalisaReport = props => {
	const dateFormat = 'YYYY/MM/DD';
	const [form] = Form.useForm();
	const monthFormat = 'YYYY/MM';
	/**
	 * Proceed Soda
	 */
	const [isLoading, setLoading] = useState(false);
	const [date, setDate] = useState(moment(new Date()).format(dateFormat));
	const [data, setData] = useState([]);
	const [dataDate, setDataDate] = useState([]);

	useEffect(() => {
		loadSoda()
	}, [])

	const loadSoda = (value) => {
		setLoading(true)
        let dateTemp = []
        Axios.post(`${strings.api.sql_host}/reporting/excel-report-soda/?key=${strings.api.key}`,{
            tgl:date
        }, {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(doc => {
            //create empty array
            let emptyArray = Array.from(new Array(doc.data.data.length), _ => []);
            let tempArray = []
            let counterGlob = 0
            doc.data.data.forEach((currentValue, index) => { 
                dateTemp.push(`${currentValue.tglawal}/${currentValue.tglakhir}`)
                let arr = []
                let counter = 0
                currentValue.detail.map(e => {
                    counter += 1
                    arr.push(e.nama)
                })
                if (counter > counterGlob) counterGlob = counter
                emptyArray[index] = {...emptyArray[index], arr}
            })
            for (let indexs = 0; indexs < counterGlob; indexs++) {
                let sampel = {}
                if (doc.data.data.length === 4) {
                    sampel = {
                        0: emptyArray[0].arr[indexs],
                        1: emptyArray[1].arr[indexs],
                        2: emptyArray[2].arr[indexs],
                        3: emptyArray[3].arr[indexs],
                    }  
                } else{
                    sampel = {
                        0: emptyArray[0].arr[indexs],
                        1: emptyArray[1].arr[indexs],
                        2: emptyArray[2].arr[indexs],
                        3: emptyArray[3].arr[indexs],
                        4: emptyArray[4].arr[indexs],
                    }
                }
                tempArray.push(sampel)  
            }
            setData(tempArray)
            setDataDate(dateTemp)
			setLoading(false)
        }).catch(err => {})
    }

	const onSubmitSoda = (values) => {
		setData([])
		setDataDate([])
		loadSoda()
	}

	const onChangeDate = (date, dateString) => {
		setDate(dateString)
	}

	/**
	 * Rekap Laporan
	 */
	const [dateStart, setDateStart] = useState(moment(new Date()).format(dateFormat));
	const [dateEnd, setDateEnd] = useState(moment(new Date()).format(dateFormat));
	const [dataRekap, setDataRekap] = useState([]);
	const [isLoadingRekap, setLoadingRekap] = useState(false);

    useEffect(() => {
        loadRekap()
    }, [])

    const loadRekap = () => {
		setLoadingRekap(true)
        Axios.post(`${strings.api.sql_host}/reporting/excel-totalpoint/?key=${strings.api.key}`,{
            tglstart:dateStart,
            tglend:dateEnd
        }, {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(doc => {
            setDataRekap(doc.data.data)            
			setLoadingRekap(false)
        }).catch(err => {})
    }
	 const onChangeDateStart = (date, dateString) => {
		setDateStart(dateString)
	}
	const onChangeDateEnd = (date, dateString) => {
		setDateEnd(dateString)
	}
	const onSubmitRekap = (values) => {
		setDataRekap([])
		loadRekap()
	}

	return (
		<>
			{/* <AnalisaPoinExcel /> */}
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Card loading={isLoading} title='Laporan Soda'>
						<Form form={form} layout="vertical" onFinish={onSubmitSoda}>
							<Form.Item name="date_end" label="Tanggal">
								<DatePicker style={{ width: '100%' }} onChange={onChangeDate} defaultValue={moment(new Date(), monthFormat)} picker="month" />
							</Form.Item>
							<Form.Item>
								<Button type="primary" style={{ width: "100%" }} htmlType="submit">Cari Data</Button>
							</Form.Item>
						</Form>
						{data && dataDate && (
							<AnalisaExcel data={data} dataDate={dataDate} filename={`LaporanSoda_${date}_${moment(new Date())}`} />
						)}
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
					<Card loading={isLoadingRekap} title='Rekap Laporan'>
						<Form form={form} layout="vertical" onFinish={onSubmitRekap}>
							<Form.Item name="date_start" label="Tanggal Mulai">
								<DatePicker style={{ width: '100%' }} onChange={onChangeDateStart} defaultValue={moment(new Date(), dateFormat)} />
							</Form.Item>
							<Form.Item name="date_end" label="Tanggal Akhir">
								<DatePicker style={{ width: '100%' }} onChange={onChangeDateEnd} defaultValue={moment(new Date(), dateFormat)} />
							</Form.Item>
							<Form.Item>
								<Button type="primary" style={{ width: "100%" }} htmlType="submit">Cari Data</Button>
							</Form.Item>
						</Form>
						{dataRekap && (
							<AnalisaPoinExcel dataRekap={dataRekap}  filename={`Rekap_${moment(new Date())}`} />
						)}
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default AnalisaReport