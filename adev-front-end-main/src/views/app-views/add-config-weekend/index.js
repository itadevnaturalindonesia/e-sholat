import { Button, Card, Col, DatePicker, Form, Input, message } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import moment from 'moment';
import axios from 'axios';
import { strings } from 'res';

const AddConfigWeekend = props => {
    let history = useHistory();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const dateFormat = 'YYYY-MM-DD';

    const onFinish = () => {
        form.validateFields().then(values => {
            confirm({
                name: "Informasi",
                content: "Apakah anda yakin?",
                onOk() {
                    onAdding(values)
                },
                onCancel() {},
            });
        })
    }

    const onAdding = (values) => {
        axios.post(`${strings.api.base_url}/harilibur/?key=${strings.api.key}`, [{
            tanggal: moment(values.date).format(dateFormat),
            deskripsi: values.desc,
            dibuat_oleh: localStorage.getItem('nik')
        }], {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            message.success("Success")
            history.goBack()
        }).catch(e => {
            console.log('error: ', e.message)
        })
    }

    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
    }

	return (
        <Form
            layout="vertical"
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <div className="container" >
                <Col xs={24} sm={24} md={24}>
                    <Card loading={isLoading} title='Tambah Hari Libur'>
                        <Form.Item name="desc" label="Deskripsi">
                            <Input placeholder="Deskripsi" />
                        </Form.Item>
                        <Form.Item name="date" label="Tanggal">
                            <DatePicker
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                                style={{width: '100%'}}
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button htmlType="submit" type="primary">Submit</Button>
                        </Form.Item>
                    </Card>
                </Col>
            </div>
        </Form>
	)
}

export default AddConfigWeekend