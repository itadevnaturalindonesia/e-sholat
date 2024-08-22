import React, { useState, useEffect } from 'react'
import { Form, Button,message,Input,Select,TimePicker } from 'antd';
import Axios from 'axios';
import { strings } from 'res';
import {useHistory} from "react-router-dom"


const ANALISA = () => {

    const history = useHistory()
    const [form] = Form.useForm();
    const {Option, OptGroup} = Select;
    const [division,setDivision] = useState([]);
    const [selectedDivision,setSelectedDivision] = useState("")
    const handleSelectChange = (value,name) =>{
      setSelectedDivision(name.name)
    }

    useEffect(() => {
      Axios.get(`${strings.api.base_url}/division/?key=${strings.api.key}`, {
        headers: {
            'content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    }).then(doc => {
      setDivision(doc.data.data)
    }).catch(err => {
        message.error(err.response)
    })
    },[])

    const onSubmit = (values) =>{
      if(values.startdate && values.stopdate){
        Axios.post(`${strings.api.base_url}/reporting/analisa/?key=${strings.api.key}`,{
          "tglstart":values.startdate,
          "tglend":values.stopdate,
          "id_division":values.division || ""
      }).then(doc=>{
          message.success("Success!")
          Axios.post(`${strings.api.host}/analisa/create`,{
            "startdate":values.startdate,
            "enddate":values.stopdate,
            "division":selectedDivision,
            "id_division":values.division || "",
            "soda":doc.data.data.total_soda,
            "bad":doc.data.data.total_bad
        }).then(doc=>{
          history.push("/app/analisa-report")
        })
      })
        
      }else{
          message.error("Empty field is not allowed!")
      }
    }

		return (
			<>
				<h2 className="mb-4">Search Report</h2>
        <Form form={form} onFinish={onSubmit} name="advanced_search" layout="vertical"
            className="ant-advanced-search-form">
          <Form.Item name="year" label="Year">
            <Input style={{width:"100%" }} />
          </Form.Item>
          <Form.Item name="division" label="Division">
            <Select defaultValue="" onSelect={handleSelectChange}>
              <Option value="" >All</Option>
              {division.map(doc=>{
                  return(
                    <Option key={doc.id_division} value={doc.id_division} name={doc.name_division}>{doc.name_division}</Option>
                  )
              })
            }
            </Select>
          </Form.Item>
          <Form.Item >
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </>
		)
}

export default ANALISA
