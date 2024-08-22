import { Button, Card, Col, DatePicker, Form, Input, message, Select } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { strings } from 'res';

const Detail = () => {

    const { Option, OptGroup } = Select;
    const [form] = Form.useForm();
    const [defaultValue,setDefaultValue] = useState({
        divisions:{
            id:"",
            value:""
        },
        departments:{
            id:"",
            value:""
        },
        positions:{
            id:"",
            value:""
        },
        locations:{
            id:"",
            value:""
        }
    })
    const location = useLocation();
    const [id, setId] = useState("");

    const [positions, setPositions] = useState([]);
    const [lokasis, setlokasis] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [stateShift, setStateShift] = useState()

    const history = useHistory()

    useEffect(() => {
        if (location.state.status) {
            onDefault(location.state.id)
        }
        fetchEntities()
    }, [])

    const onDefault = async (values) => {
        setIsLoading(true)
        setId(values.id)
        Axios.get(`${strings.api.sql_host}/users/${values.id_users}&?key=${strings.api.key}`, {
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            form.setFieldsValue({
                name_users:doc.data.data[0].name_users,
                email:doc.data.data[0].email,
                nik:doc.data.data[0].nik,
                gender:doc.data.data[0].gender,
                id_shift:doc.data.data[0].id_shift,
                role:doc.data.data[0].role,
                id_division:doc.data.data[0].id_division,
                id_department:doc.data.data[0].id_department,
                id_location:doc.data.data[0].id_location,
                id_position:doc.data.data[0].id_position,
                name_division:doc.data.data[0].name_division,
                name_department:doc.data.data[0].name_department,
                name_location:doc.data.data[0].name_location,
                name_position:doc.data.data[0].name_position
            })
            setId(doc.data.data[0].id_users)
            setStateShift(doc.data.data[0].id_shift)
            setIsLoading(false)
        }).catch(err => {
            message.error("Opps!! Something is Wrong!")
        })
    }

    const fetchEntities = () => {
        Axios.get(`${strings.api.base_url}/location/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setlokasis(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
        Axios.get(`${strings.api.base_url}/department/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setDepartments(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
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
        Axios.get(`${strings.api.base_url}/position/?key=${strings.api.key}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            setPositions(doc.data.data)
        }).catch(err => {
            message.error(err.response)
        })
    }

    const onFinish = () => {
        form.validateFields().then(values => {
            confirm({
                name: "Informasi",
                content: "Apakah anda yakin?",
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
    const onPost = async (values,keys) => {
        let data = {
            "nik":values.nik,
            "name_users": values.name_users,
            "email": values.email,
            "password_user":"12345",
            "id_division": values.id_division,
            "id_department": values.id_department,
            "id_position": values.id_position,
            "id_location": values.id_location,
            "id_role_users": "2",
            "gender": values.gender,
            "id_group": "1",
            "id_shift": values.id_shift
        }
        Axios.post(`${strings.api.sql_host}/users/?key=${strings.api.key}`,data, {
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

    const onUpdate = (values) => {
        //isLoading
        let data = {
            "nik":values.nik,
            "name_users":values.name_users,
            "email":values.email,
            "id_division":values.id_division,
            "id_department":values.id_department,
            "id_position":values.id_position,
            "id_location":values.id_location,
            "id_role_users":"2",
            "gender":values.gender,
            "id_group":"1",
        }
        Axios.put(`${strings.api.sql_host}/users/${values.nik}?key=${strings.api.key}`, data, {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            if (values.id_shift !== stateShift) {
                onChangeShift(values.id_shift, values.nik)
            } else {
                message.success("Success")
                history.goBack()
            }
        }).catch(e => {
            console.log('error: ', e.message)
        })

    }

    const onChangeShift = (shift, nik) => {
        Axios.post(`${strings.api.sql_host}/shift/ubahShiftDay/?key=${strings.api.key}`, {
            nik: nik,
            id_shift: shift
        }, {
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

    const onChangeGender = (value) => {}
    const onChangeDivision = (value) => {}

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
                        <Form.Item name="name_users" label="Name">
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item name="nik" label="NIK" >
                            <Input placeholder="NIK" />
                        </Form.Item>
                        <Form.Item name="email" label="Email">
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="id_division" label="Division">
                            <Select onChange={onChangeDivision}>
                                {divisions.map(doc => {
                                    return (
                                        <Option key={doc.id_division} value={doc.id_division}>{doc.name_division}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="id_department" label="Departemen">
                            <Select onChange={onChangeGender}>
                                {departments.map(doc => {
                                    return (
                                        <Option key={doc.id_department} value={doc.id_department}>{doc.name_department}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="id_position" label="Position">
                            <Select  onChange={onChangeGender}>
                                {positions.map(doc => {
                                    return (
                                        <Option key={doc.id_position} value={doc.id_position}>{doc.name_position}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="id_location" label="Location" >
                            <Select  onChange={onChangeGender}>
                                {lokasis.map(doc => {
                                    return (
                                        <Option key={doc.id_location} value={doc.id_location}>{doc.name_location}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name="gender" label="Jenis Kelamin">
                            <Select  onChange={onChangeGender}>
                                <Option value="Laki-laki">Laki-laki</Option>
                                <Option value="Perempuan">Perempuan</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="id_shift" label="Shift">
                            <Select onChange={onChangeGender}>
                                <Option key="1" value="1">Siang</Option>
                                <Option key="2" value="2">Malam</Option>
                            </Select>
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