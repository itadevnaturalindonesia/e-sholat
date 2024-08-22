import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Card, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import moment from 'moment-timezone'
import { strings } from 'res';

const dateFormat = "YYYY-MM-DD"

const CalendarApp = () => {
	const [calendarList, setCalendarList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	const history = useHistory()

	const getDate = (date) => {
		return moment(new Date(new Date().getFullYear(), new Date().getMonth(), date),).format('DD MMMM')
	}

	useEffect(() => {
		getDates()
	}, [])

	const getDates = async () =>{
		setLoading(true)
		let dates = []
		let date = new Date();
        let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
		await Axios.get(`${strings.api.sql_host}/calender/${date.getFullYear()}-${formatTwoDigits(date.getMonth()+1)}?key=${strings.api.key}`).then((doc) => {
			console.log(doc.data);
			doc.data.data.map(doc => {
				dates.push({
					date: getDate(moment(doc.tgl_bln).format("D")),
					event: [
						{
							title: `${doc.soda} SODA`,
							bullet: 'green',
						},
						{
							title: `${doc.sholat} Sholat`,
							bullet: 'cyan',
						},
						{
							title: `${doc.bad} Bad`,
							bullet: 'red',
						},
						{
							title: `${doc.soda} Off`,
							bullet: 'gray',
						}
					]
				})
			})
		})
		setCalendarList(dates)
		setLoading(false)
	}

	const cellRender = value => {
		const listData = getListData(value.format(('DD MMMM')));
		return (
			<ul className="calendar-event">
				{listData.map((item, i) => (
					<li key={`${item.title}-${i}`}>
						<Badge color={item.bullet} text={item.title} />
					</li>
				))}
			</ul>
		);
	}

	const getListData = (value) => {
		let listData = [];
		calendarList.forEach(elm => {
			if (elm.date === value) {
				listData = elm.event
			}
		})
		return listData;
	}

	const onSelect = value => {
		const selectedDate = value.format((dateFormat))
		setSelectedDate(selectedDate)
		history.push("/app/detail-calendar", {
			tanggal: selectedDate
		})
	}

	const onPanelChange = (value, mode) => {
		console.log(value.format('YYYY-MM-DD'), mode);
	}

	return (
		<Card className="calendar mb-0" loading={loading}>
			<Row>
				<Col xs={24} sm={24} md={15} lg={24}>
					<Calendar
						onSelect={val => onSelect(val)}
						dateCellRender={cellRender}
						onPanelChange={onPanelChange}
					/>
				</Col>
			</Row>
		</Card>
	)
}

export default CalendarApp

