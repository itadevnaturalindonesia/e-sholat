import { Button, Card, Col, Form, message, Select, TimePicker } from 'antd';
import { Option } from 'antd/lib/mentions';
import confirm from 'antd/lib/modal/confirm';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { strings } from 'res';

const DetailReport = props => {
	const { match } = props
	const [formDhuha] = Form.useForm();
	const [formDhuhur] = Form.useForm();
	const [formAshar] = Form.useForm();
	const [formIsya] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [statusReport, setStatusReport] = useState(false);
	const location = useLocation();
	let history = useHistory();

	useEffect(() => {
		getDefault()
		getTimePrayer()
	}, [])

	/**
	 * OnClick
	 */
	const onClick = (position) => {
		if (position === 1) {
			formDhuha.validateFields().then(values => {
				confirm({
					name: "Informasi",
					content: "Apakah anda yakin?",
					onOk() {
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: moment(values.dhuha_time).format('HH:mm:ss'), 
							id_status_report: values.dhuha_report, 
							keterangan : "", 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							history.push("/app/dashboard");
						})
					},
					onCancel() { },
				});
			})
		} else if (position === 2) {
			formDhuhur.validateFields().then(values => {
				console.log(values)
				confirm({
					name: "Informasi",
					content: "Apakah anda yakin?",
					onOk() {
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: moment(values.dhuhur_time).format('HH:mm:ss'), 
							id_status_report: values.dhuhur_time, 
							keterangan : "", 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							history.push("/app/dashboard");
						})
					},
					onCancel() { },
				});
			})
		} else if (position === 3) {
			formAshar.validateFields().then(values => {
				confirm({
					name: "Informasi",
					content: "Apakah anda yakin?",
					onOk() {
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: moment(values.ashar_time).format('HH:mm:ss'), 
							id_status_report: values.ashar_report, 
							keterangan : "", 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							history.push("/app/dashboard");
						})
					},
					onCancel() { },
				});
			})
		} else if (position === 5) {
			formIsya.validateFields().then(values => {
				confirm({
					name: "Informasi",
					content: "Apakah anda yakin?",
					onOk() {
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: moment(values.isya_time).format('HH:mm:ss'), 
							id_status_report: values.isya_report, 
							keterangan : "", 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							history.push("/app/dashboard");
						})
					},
					onCancel() { },
				});
			})
		}	
	}

	/**
	 * Calling API
	 */
	const getDefault = async() => {
		setIsLoading(true)
        axios.post(`${strings.api.sql_host}/reporting/detailReporting/?key=${strings.api.key}`, {
			nik: location.state.nik,
			date : location.state.date
		},{
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
			console.log(doc.data.data)
            formDhuha.setFieldsValue({
                dhuha_report: doc.data.data[0].id_status_report,
				dhuha_time: doc.data.data[0].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[0].time, 'HH:mm:ss'),
            })
			formDhuhur.setFieldsValue({
				dhuhur_report: doc.data.data[1].id_status_report,
				dhuhur_time: doc.data.data[1].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[1].time, 'HH:mm:ss')
			})
			formAshar.setFieldsValue({
				ashar_report: doc.data.data[2].id_status_report,
				ashar_time: doc.data.data[2].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[2].time, 'HH:mm:ss')
			})
			formIsya.setFieldsValue({
				isya_report: doc.data.data[3].id_status_report,
				isya_time: doc.data.data[3].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[3].time, 'HH:mm:ss')
			})
            setIsLoading(false)
        }).catch(err => {
			console.log(err)
            message.error("Opps!! Something is Wrong!")
        })
	}
	const getTimePrayer = () => {
		axios.get(`${strings.api.base_url}/reporting/status/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setStatusReport(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
	}

	return (
		<div className="container" >
			<Col xs={24} sm={24} md={24}>
				{/* Shift Pagi */}
				{location.state.shift === "1" && (<div>
					<Form
						layout="vertical"
						form={formDhuha}
						name="advanced_search"
						className="ant-advanced-search-form"
					>
						<Card loading={isLoading} title='Dhuha'>
							<Form.Item name="dhuha_time" label="Jam" style={{width: '100%'}}>
								<TimePicker size="large" style={{width: '100%'}}/>
							</Form.Item>
							<Form.Item name="dhuha_report" label="Status" style={{width: '100%'}}>
								{statusReport && (
									<Select style={{marginTop: 15}}>
										{statusReport.map(doc => {
											return (
												<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
											)
										})}
									</Select>
								)}
							</Form.Item>
							<Form.Item >
                            	<Button onClick={() => onClick(1)} htmlType="submit" type="primary">Ubah</Button>
                        	</Form.Item>
						</Card>
					</Form>
					<Form
						layout="vertical"
						form={formDhuhur}
						name="advanced_search"
						className="ant-advanced-search-form"
					>
						<Card loading={isLoading} title='Dhuhur'>
							<Form.Item name="dhuhur_time" label="Jam">
								<TimePicker size="large" style={{width: '100%'}}/>
							</Form.Item>
							<Form.Item name="dhuhur_report" label="Status" style={{width: '100%'}}>
								{statusReport && (
									<Select style={{marginTop: 15}}>
										{statusReport.map(doc => {
											return (
												<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
											)
										})}
									</Select>
								)}
							</Form.Item>
							<Form.Item >
                            	<Button onClick={() => onClick(2)} htmlType="submit" type="primary">Ubah</Button>
                        	</Form.Item>
						</Card>
					</Form>
					<Form
						layout="vertical"
						form={formAshar}
						name="advanced_search"
						className="ant-advanced-search-form"
					>
							<Card loading={isLoading} title='Ashar'>
								<Form.Item name="ashar_time" label="Jam">
									<TimePicker size="large" style={{width: '100%'}}/>
								</Form.Item>
								<Form.Item name="ashar_report" label="Status" style={{width: '100%'}}>
									{statusReport && (
										<Select style={{marginTop: 15}}>
											{statusReport.map(doc => {
												return (
													<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
												)
											})}
										</Select>
									)}
								</Form.Item>
								<Form.Item >
                            		<Button onClick={() => onClick(3)} htmlType="submit" type="primary">Ubah</Button>
                        		</Form.Item>
							</Card>
						</Form>
				</div>)}
				
				{/* Shift Malam */}
				{location.state.shift !== "1" && (
					<div>
						
						<Form
						layout="vertical"
						form={formIsya}
						name="advanced_search"
						className="ant-advanced-search-form"
						>
							<Card loading={isLoading} title='Isya'>
								<Form.Item name="isya_time" label="Jam">
									<TimePicker size="large" style={{width: '100%'}}/>
								</Form.Item>
								<Form.Item name="isya_report" label="Status" style={{width: '100%'}}>
									{statusReport && (
										<Select style={{marginTop: 15}}>
											{statusReport.map(doc => {
												return (
													<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
												)
											})}
										</Select>
									)}
								</Form.Item>
								<Form.Item >
									<Button onClick={() => onClick(5)} htmlType="submit" type="primary">Ubah</Button>
								</Form.Item>
							</Card>
						</Form>
					</div>
				)}
			</Col>
		</div>
	)
}

export default DetailReport