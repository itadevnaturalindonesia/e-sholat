import { Button, Card, Col, DatePicker, Form, Input, message, Select } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { strings } from 'res';

const Detail = () => {

    const { Option, OptGroup } = Select;
    const [form] = Form.useForm();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    let history = useHistory();
    const location = useLocation();
    const [gender,setGender] = useState("Laki-laki");
    const [id,setId] = useState("Laki-laki");

    useEffect(() => {
        if (location.state.status) {
            onDefault(location.state.id)
        }
    }, [])

    const onDefault = (values) => {

        Axios.get(`${strings.api.host}/kelompok/readById/${values.id}`, {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            form.setFieldsValue({
                nama: values.nama,
                nomor: values.nomor,
            })
            setId(values._id)
        }).catch(err => {
            message.error("Opps!! Something is Wrong!")
        })
    }

    const onFinish = () => {
        form.validateFields().then(values => {
            confirm({
                name: "Submit New Data",
                content: "Are you sure you wanna submit/update new data?",
                onOk() {
                    if (location.state.status) {
                        onUpdate(values)
                    } else {
                        onPost(values)
                    }
                },
                onCancel() { },
            });
        })
    }

    /**
     * Calling API
     */
    const onPost = async (values) => {
        //isLoading
        setSubmitLoading(true);
        let data = {
            nama: values.nama,
            nomor: values.nomor,
        }
        Axios.post(`${strings.api.host}/kelompok/create`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setSubmitLoading(false)
            message.success(`Success`)
            history.goBack()
        }).catch(e => {
            console.log('error: ', e.message)
            message.error(`Opps! Try fill all the fields`)
        })
    }

    const onUpdate = (values) => {
        //isLoading
        setSubmitLoading(true);
        let data = {
            id:id,
            nama: values.nama,
            nomor: values.nomor,
        }
        Axios.post(`${strings.api.host}/kelompok/update`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setSubmitLoading(false)
            message.success("Success")
            history.goBack()
        }).catch(e => {
            console.log('error: ', e.message)
        })
    }

    const onChangeGender = (value) => {
        console.log(value)
        setGender(value)
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
                    <Card>
                        <Form.Item name="nama" label="Nama">
                            <Input placeholder="Nama" />
                        </Form.Item>
                        <Form.Item name="nomor" label="Nomor">
                            <Input placeholder="Nomor" />
                        </Form.Item>
                        <Form.Item >
                            <Button htmlType="submit" type="primary" style={{ width: "100%" }}>Submit</Button>
                        </Form.Item>
                    </Card>
                </Col>
            </div>
        </Form>
    )
}

export default Detail