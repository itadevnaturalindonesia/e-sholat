import { Button, Card, Col, Form, Input, message, Select, TimePicker } from 'antd';
import { Option } from 'antd/lib/mentions';
import confirm from 'antd/lib/modal/confirm';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import { strings } from 'res';

const DetailReport = props => {
	const [formDhuha] = Form.useForm();
	const [formDhuhur] = Form.useForm();
	const [formAshar] = Form.useForm();
	const [formIsya] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isEnableDhuha, setEnableDhuha] = useState(true);
	const [isEnableDhuhur, setEnableDhuhur] = useState(true);
	const [isEnableAshar, setEnableAshar] = useState(true);
	const [isEnableIsya, setEnableIsya] = useState(true);
	const [statusReport, setStatusReport] = useState(
		[
			{
				id_status_report: '1',
				name_status_report: 'Tidak Absen'
			},
			{
				id_status_report: '2',
				name_status_report: 'Lapor Soda'
			},
			{
				id_status_report: '6',
				name_status_report: 'Lapor Sholat'
			},
			{
				id_status_report: '5',
				name_status_report: 'Dinas'
			},
		]
	);
	const location = useLocation();
	let history = useHistory();

	useEffect(() => {
		getDefault()
	}, []);

	const onChangeDhuha = (value) => {
		if (value === "1") {
			setEnableDhuha(false)
		}else{
			setEnableDhuha(true)
		}
	}
	
	const onChangeDhuhur = (value) => {
		if (value === "1") {
			setEnableDhuhur(false)
		}else{
			setEnableDhuhur(true)
		}
	}
	
	const onChangeAshar = (value) => {
		if (value === "1") {
			setEnableAshar(false)
		}else{
			setEnableAshar(true)
		}
	}
	
	const onChangeIsya = (value) => {
		if (value === "1") {
			setEnableIsya(false)
		}else{
			setEnableIsya(true)
		}
	}

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
						setIsLoading(true)
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: isEnableDhuha === false ? "" : moment(values.dhuha_time).format('HH:mm:ss'), 
							id_status_report: values.dhuha_report, 
							keterangan : values.dhuha_note, 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							if (doc.data.status === 'failed') {
								message.error(doc.data.message)
							} else {
								message.success('success')
								history.goBack();
							}
							setIsLoading(false)
						})
					},
					onCancel() {},
				});
			})
		} else if (position === 2) {
			formDhuhur.validateFields().then(values => {
				confirm({
					name: "Informasi",
					content: "Apakah anda yakin?",
					onOk() {
						setIsLoading(true)
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: isEnableDhuhur === false ? "" : moment(values.dhuhur_time).format('HH:mm:ss'), 
							id_status_report: values.dhuhur_report, 
							keterangan : values.dhuhur_note, 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							if (doc.data.status === 'failed') {
								message.error(doc.data.message)
							} else {
								message.success('success')
								history.goBack();
							}
							setIsLoading(false)
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
						setIsLoading(true)
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: isEnableAshar === false ? "" : moment(values.ashar_time).format('HH:mm:ss'), 
							id_status_report: values.ashar_report, 
							keterangan : values.ashar_note, 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							if (doc.data.status === 'failed') {
								message.error(doc.data.message)
							} else {
								message.success('success')
								history.goBack();
							}
							setIsLoading(false);
						})
					},
					onCancel() {},
				});
			})
		} else if (position === 5) {
			formIsya.validateFields().then(values => {
				confirm({
					name: "Informasi",
					content: "Apakah anda yakin?",
					onOk() {
						setIsLoading(true);
						axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
							time: isEnableIsya === false ? "" : moment(values.isya_time).format('HH:mm:ss'), 
							id_status_report: values.isya_report, 
							keterangan : values.isya_note, 
							id_time_prayer : `${position}`, 
							date : location.state.date, 
						},{
							headers: {
								'content-type': 'application/json',
								"Access-Control-Allow-Origin": "*"
							}
						}).then(doc => {
							if (doc.data.status === 'failed') {
								message.error(doc.data.message)
							} else {
								message.success('success')
								history.goBack();
							}
							setIsLoading(false);
						})
					},
					onCancel() { },
				});
			})
		}	
	}
	
	const onCutiHaid = (position) => {
		confirm({
			name: "Informasi",
			content: "Apakah anda yakin?",
			onOk() {
				setIsLoading(true)
				axios.put(`${strings.api.sql_host}/reporting/manual/${location.state.nik}?key=${strings.api.key}`, {
					time: moment(new Date()).format('HH:mm:ss'), 
					id_status_report: position, 
					keterangan : '', 
					id_time_prayer : ``, 
					date : location.state.date, 
				},{
					headers: {
						'content-type': 'application/json',
						"Access-Control-Allow-Origin": "*"
					}
				}).then(doc => {
					history.goBack();
					setIsLoading(false)
				})
			},
			onCancel() { },
		});
	}

	/**
	 * Calling API
	 */
	const getDefault = async () => {
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
            formDhuha.setFieldsValue({
                dhuha_report: doc.data.data[0].name_status_report,
				dhuha_time: doc.data.data[0].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[0].time, 'HH:mm:ss'),
				dhuha_note: doc.data.data[0].keterangan
            })
			formDhuhur.setFieldsValue({
				dhuhur_report: doc.data.data[1].name_status_report,
				dhuhur_time: doc.data.data[1].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[1].time, 'HH:mm:ss'),
				dhuhur_note: doc.data.data[1].keterangan
			})
			formAshar.setFieldsValue({
				ashar_report: doc.data.data[2].name_status_report,
				ashar_time: doc.data.data[2].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[2].time, 'HH:mm:ss'),
				ashar_note: doc.data.data[2].keterangan
			})
			formIsya.setFieldsValue({
				isya_report: doc.data.data[4].name_status_report,
				isya_time: doc.data.data[4].time === null ? moment(new Date(), 'HH:mm:ss') : moment(doc.data.data[4].time, 'HH:mm:ss'),
				isya_note: doc.data.data[4].keterangan
			})
            setIsLoading(false)
        }).catch(err => {
			console.log(err)
            message.error("Terjadi Kesalahan")
        })
	}

	return (
		<div className="container" >
			<Button onClick={() => onCutiHaid(3)} htmlType="submit" type="primary">Cuti</Button>
			<Button onClick={() => onCutiHaid(4)} style={{marginLeft: 25, marginBottom: 25}} htmlType="submit" type="primary">Haid</Button>
			<Col xs={24} sm={24} md={24}>
				<Form
					layout="vertical"
					form={formDhuha}
					name="advanced_search"
					className="ant-advanced-search-form"
				>
					<Card loading={isLoading} title='Dhuha'>
						{isEnableDhuha && (
							<Form.Item name="dhuha_time" label="Jam" style={{width: '100%'}}>
								<TimePicker size="large" style={{width: '100%'}}/>
							</Form.Item>
						)}
						<Form.Item name="dhuha_report" label="Status" style={{width: '100%'}}>
							{statusReport && (
								<Select style={{marginTop: 15}} onChange={onChangeDhuha}>
									{statusReport.map(doc => {
										return (
											<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
										)
									})}
								</Select>
							)}
						</Form.Item>
						{isEnableDhuha && (
							<Form.Item name="dhuha_note" label="Keterangan" style={{width: '100%'}}>
								<Input placeholder='Keterangan'/>
							</Form.Item>
						)}
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
						{isEnableDhuhur && (
							<Form.Item name="dhuhur_time" label="Jam">
								<TimePicker size="large" style={{width: '100%'}}/>
							</Form.Item>
						)}
						<Form.Item name="dhuhur_report" label="Status" style={{width: '100%'}}>
							{statusReport && (
								<Select style={{marginTop: 15}} onChange={onChangeDhuhur}>
									{statusReport.map(doc => {
										return (
											<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
										)
									})}
								</Select>
							)}
						</Form.Item>
						{isEnableDhuhur && (
							<Form.Item name="dhuhur_note" label="Keterangan" style={{width: '100%'}}>
								<Input placeholder='Keterangan'/>
							</Form.Item>
						)}
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
						{isEnableAshar && (
							<Form.Item name="ashar_time" label="Jam">
								<TimePicker size="large" style={{width: '100%'}}/>
							</Form.Item>
						)}
						<Form.Item name="ashar_report" label="Status" style={{width: '100%'}}>
							{statusReport && (
								<Select style={{marginTop: 15}} onChange={onChangeAshar}>
									{statusReport.map(doc => {
										return (
											<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
										)
									})}
								</Select>
							)}
						</Form.Item>
						{isEnableAshar && (
							<Form.Item name="ashar_note" label="Keterangan" style={{width: '100%'}}>
								<Input placeholder='Keterangan'/>
							</Form.Item>
						)}
						<Form.Item >
							<Button onClick={() => onClick(3)} htmlType="submit" type="primary">Ubah</Button>
						</Form.Item>
					</Card>
				</Form>

				<Form
					layout="vertical"
					form={formIsya}
					name="advanced_search"
					className="ant-advanced-search-form"
				>
					<Card loading={isLoading} title='Isya'>
						{isEnableIsya && (
							<Form.Item name="isya_time" label="Jam">
								<TimePicker size="large" style={{width: '100%'}}/>
							</Form.Item>
						)}
						<Form.Item name="isya_report" label="Status" style={{width: '100%'}}>
							{statusReport && (
								<Select style={{marginTop: 15}} onChange={onChangeIsya}>
									{statusReport.map(doc => {
										return (
											<Option key={doc.id_status_report} value={doc.id_status_report}>{doc.name_status_report}</Option>
										)
									})}
								</Select>
							)}
						</Form.Item>
						{isEnableIsya && (
							<Form.Item name="isya_note" label="Keterangan" style={{width: '100%'}}>
								<Input placeholder='Keterangan'/>
							</Form.Item>
						)}
						<Form.Item >
							<Button onClick={() => onClick(5)} htmlType="submit" type="primary">Ubah</Button>
						</Form.Item>
					</Card>
				</Form>
			</Col>
		</div>
	)
}

export default DetailReport