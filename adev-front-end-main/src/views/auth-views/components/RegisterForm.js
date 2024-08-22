import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, MailOutlined,UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from "antd";
import { showAuthMessage, showLoading, hideAuthMessage, authenticated } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import axios from 'axios'
import {strings} from 'res'

const rules = {
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	username: [
		{ 
			required: true,
			message: 'Please input your username'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
	confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
}

export const RegisterForm = (props) => {

	const { showLoading, loading} = props
	const [authMessage,showAuthMessage] = useState("")
	const [form] = Form.useForm();
	let history = useHistory();

	const onSignUp = (values)=>{
		hideAuthMessage()
		axios.post(`${strings.api.host}/user/register`, {
		  username: values.username,
		  email: values.email,
		  password: values.password
		}, {
		  headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin":"*"
		  }
		}).then(doc => {
			console.log(doc.data)
			if (!doc.data.error) {
				showLoading()
				history.push("/auth")
			} else {
				showAuthMessage(doc.data.msg)
			}
		})
	  }

	useEffect(() => {
    	if (localStorage.getItem('token') !== null) {
			history.push("/app/dashboard")
		}
  });
	
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: authMessage ? 1 : 0,
					marginBottom: authMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={authMessage}></Alert>
			</motion.div>
			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
			<Form.Item 
					name="username" 
					label="Username" 
					rules={rules.username}
					hasFeedback
				>
					<Input prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={rules.email}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label="Password" 
					rules={rules.password}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="confirm" 
					label="ConfirmPassword" 
					rules={rules.confirm}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

const mapStateToProps = ({auth}) => {
	const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	showAuthMessage,
	hideAuthMessage,
	showLoading,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
