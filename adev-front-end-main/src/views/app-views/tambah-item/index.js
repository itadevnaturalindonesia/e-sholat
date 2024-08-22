import { Button, Card, Col, Form, Input, message } from 'antd';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { strings } from 'res';

const Detail = (props) => {

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [item, setItem] = useState("")
    const location = useLocation();

    const history = useHistory()

    useEffect(() => {
        console.log(location.state.for_api)
        setItem(location.state.for_api)
    }, [])

    const onFinish = (values) =>{
        let data = {}
        if(location.state.for_api === "division"){
            data = {
                name_division:values.name
            }
        }else if(location.state.for_api === "position"){
            data = {
                name_position:values.name
            }
        }else if(location.state.for_api === "department"){
            data = {
                name_department:values.name
            }
        }else{
            data = {
                name_location:values.name
            }
        }
        Axios.post(`${strings.api.sql_host}/${item}/?key=${strings.api.key}`,data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            if (doc.data.status === "success") {
                message.success(`Success`);
            } else {
                message.error(doc.data.message);
            }
            history.goBack()
        }).catch(e => {
            console.log('error: ', e.message)
            message.error(e.response)
        })
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
                    <Card loading={isLoading}>
                        <h1 style={{textAlign:"center"}}>Tambah {location.state.title}</h1>
                        {/* <Form.Item name="id_division" label={`ID ${location.state.title}`}>
                            <Input placeholder={`ID ${location.state.title}`} />
                        </Form.Item> */}
                        <Form.Item name="name" label={`Nama ${location.state.title}`} >
                            <Input placeholder={`Nama ${location.state.title}`} />
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