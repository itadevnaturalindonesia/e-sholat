import React, { Component, useState, useEffect } from 'react'
import { Form, Button, message, Input, Select, Option, DatePicker } from 'antd';
import { useHistory } from 'react-router';
import Axios from 'axios'
import {strings} from 'res'
import moment from 'moment';

const ANALISA = () => {

    const [form] = Form.useForm();
    const history = useHistory()
    const dateFormat = 'YYYY-MM-DD';

    const {Option, OptGroup} = Select;
    const [divisions,setDivisions] = useState([])
    const [dateStart, setDateStart] = useState(moment(new Date()).format(dateFormat));
	const [dateEnd, setDateEnd] = useState(moment(new Date()).format(dateFormat));

    const onChangeStart = (date, dateString) => {
		setDateStart(dateString)
	}
	
	const onChangeEnd = (date, dateString) => {
		setDateEnd(dateString)
	}

    useEffect(()=>{
        Axios.get(`${strings.api.base_url}/division/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setDivisions(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
    },[])

    const onSubmit = (value) => {
        history.push({
            pathname: "/app/print-bad-by-tanggal",
            state: {
                dateStart: dateStart,
                dateEnd: dateEnd,
                id_division:value.id_division
            }
        })
    }

    return (
        <>
            <h2 className="mb-4">Search Bad Employee Report</h2>
            <Form form={form} onFinish={onSubmit} name="advanced_search"
                className="ant-advanced-search-form">
                <Form.Item name="date_end" label="Tanggal Mulai">
                    <DatePicker style={{ width: '100%' }} onChange={onChangeStart} defaultValue={moment(new Date(), dateFormat)} />
                </Form.Item>
                <Form.Item name="date_start" label="Tanggal Akhir">
                    <DatePicker style={{ width: '100%' }} onChange={onChangeEnd} defaultValue={moment(new Date(), dateFormat)} />
                </Form.Item>
                <Form.Item name="id_division" label="Division">
                    <Select defaultValue={"All"} >
                        {divisions.map(doc=>{
                            return(
                                <Option value={doc.id_division}>{doc.name_division}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" style={{ width: "100%" }} htmlType="submit">Cari</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ANALISA
