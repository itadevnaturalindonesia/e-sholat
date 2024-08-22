import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import axios from 'axios';
import {strings} from 'res'
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

export const LoginForm = (props) => {
	let history = useHistory();

	const { 
		otherSignIn, 
		showForgetPassword, 
		onForgetPasswordClick,
		extra,
	} = props

	const [loading,showLoading] = useState(false)
	const [authMessage,showAuthMessage] = useState("")

	const onLogin = (values)=>{
		axios.post(`${strings.api.base_url}/login/?key=${strings.api.key}`, {
			email_nik: values.email,
			password: values.password
		}, {
		  headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin":"*"
		  }
		}).then(doc => {
			if (doc.data.status === 'success') {
				if (doc.data.data[0].id_role_users === '1') {
					showLoading(true)
					localStorage.setItem('token', doc.data.data[0])
					localStorage.setItem('nik', doc.data.data[0].nik)
					history.push("/app/dashboard")
				} else{
					showAuthMessage('Bukan Admin')
				}
			} else {
				showAuthMessage(doc.data.message)
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
			<Form 
				layout="vertical" 
				name="login-form"
				onFinish={onLogin}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Please input your email',
						},
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Password</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign In
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  	return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
