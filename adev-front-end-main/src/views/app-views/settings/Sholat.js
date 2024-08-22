import React, { Component, useState, useEffect } from 'react'
import { Form, Button,message,Input } from 'antd';
import Axios from 'axios';
import { strings } from 'res';

const Sholat = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (value) => {
      let waktuSholat = {
        "dhuha":{
          "start":(`${value.dhuha_start}:00`),
          "soda":(`${value.dhuha_soda}:00`),
          "end":(`${value.dhuha_stop}:00`)
        },
        "dhuhur":{
          "start":(`${value.dzuhur_start}:00`),
          "soda":(`${value.dzuhur_soda}:00`),
          "end":(`${value.dzuhur_stop}:00`)
        },
        "ashar":{
          "start":(`${value.ashar_start}:00`),
          "soda":(`${value.ashar_soda}:00`),
          "end":(`${value.ashar_stop}:00`)
        },
        "maghrib":{
          "start":(`${value.maghrib_start}:00`),
          "soda":(`${value.maghrib_soda}:00`),
          "end":(`${value.maghrib_stop}:00`)
        },
        "isya":{
          "start":(`${value.isya_start}:00`),
          "soda":(`${value.isya_soda}:00`),
          "end":(`${value.isya_stop}:00`)
        }
      }
      Axios.post(`${strings.api.sql_host}/prayer/?key=${strings.api.key}`,waktuSholat).then(doc=>{
        if(doc.data.status === "success"){
          message.success("Success!")
        }else{
          message.error("Error!")
        }
      }).catch(err=>{
        console.log(err)
      })
    }

    useEffect(() => {
      setLoading(true)
      Axios.get(`${strings.api.sql_host}/prayer/?key=${strings.api.key}`).then(doc=>{
        form.setFieldsValue({
          ashar_start: (doc.data.data[2].start_time_prayer),
          ashar_soda: (doc.data.data[2].soda_time_prayer),
          ashar_stop: (doc.data.data[2].end_time_prayer),
          dhuha_start: (doc.data.data[0].start_time_prayer),
          dhuha_soda: (doc.data.data[0].soda_time_prayer),
          dhuha_stop: (doc.data.data[0].end_time_prayer),
          dzuhur_start: (doc.data.data[1].start_time_prayer),
          dzuhur_soda: (doc.data.data[1].soda_time_prayer),
          dzuhur_stop: (doc.data.data[1].end_time_prayer),
          isya_start: (doc.data.data[4].start_time_prayer),
          isya_soda: (doc.data.data[4].soda_time_prayer),
          isya_stop: (doc.data.data[4].end_time_prayer),
          maghrib_start: (doc.data.data[3].start_time_prayer),
          maghrib_soda: (doc.data.data[3].soda_time_prayer),
          maghrib_stop: (doc.data.data[3].end_time_prayer)
        })
        setLoading(false)
      })
    },[])

		return (
			<>
				<h2 className="mb-4">Waktu Sholat</h2>
        <Form form={form} onFinish={onSubmit} name="advanced_search"
            className="ant-advanced-search-form">
          <Form.Item name="dhuha_start" label="Dhuha Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dhuha_soda" label="Dhuha SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dhuha_stop" label="Dhuha Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="dzuhur_start" label="Dzuhur Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dzuhur_soda" label="Dzuhur SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="dzuhur_stop" label="Dzuhur Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="ashar_start" label="Ashar Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="ashar_soda" label="Ashar SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="ashar_stop" label="Ashar Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="maghrib_start" label="Maghrib Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="maghrib_soda" label="Maghrib SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="maghrib_stop" label="Maghrib Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item name="isya_start" label="Isya Start">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="isya_soda" label="Isya SODA">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <Form.Item name="isya_stop" label="Isya Stop">
            <Input style={{width:"100%" }} type="time" />
          </Form.Item>
          <br></br>
          <Form.Item >
            <Button type="primary" style={{ width: "100%" }} htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </>
		)
}

export default Sholat
