import React, { Component } from 'react'
import { Row, Col, Card, Avatar, Button,Form,Input } from 'antd';
import { Icon } from 'components/util-components/Icon'
import { connectionList } from './profileData';
import { 
	GlobalOutlined,
	MailOutlined,
	HomeOutlined,
	PhoneOutlined
} from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import Map from 'components/custom-components/Map'

const ProfileInfo = props => (
	<Card>
		<Row justify="center"> 
			<Col sm={24} md={23}>
				<div className="d-md-flex">
					<div className="rounded p-2 bg-white shadow-sm mx-auto" style={{'marginTop': '-3.5rem', 'maxWidth': `${props.avatarSize + 16}px`}}>
						<Avatar shape="square" size={props.avatarSize} src="/img/avatars/thumb-15.jpg" />
					</div>
					<div className="ml-md-4 w-100">
						<Flex alignItems="center" mobileFlex={false} className="mb-3 text-md-left text-center">
							<h2 className="mb-0">PERMATAHIJAU21</h2>
						</Flex>
						<Row gutter="16"> 
							<Col sm={24} md={8}>
								<p className="mt-0 mr-3 text-muted text-md-left text-center">
									It is a long established fact that a reader will be distracted.
								</p>
							</Col>
							<Col xs={24} sm={24} md={8}>
								<Row className="mb-2"> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={MailOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Email:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">ellarbae@coolmail.io</span>
									</Col>
								</Row>
								<Row> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={PhoneOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Phone:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">+12 123 1234</span>
									</Col>
								</Row>
							</Col>
							<Col xs={24} sm={24} md={8}>
								<Row className="mb-2 mt-2 mt-md-0 "> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={HomeOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Address:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">Los Angeles, CA</span>
									</Col>
								</Row>
								<Row className="mb-2"> 
									<Col xs={12} sm={12} md={9}>
										<Icon type={GlobalOutlined} className="text-primary font-size-md"/>
										<span className="text-muted ml-2">Website:</span>
									</Col>
									<Col xs={12} sm={12} md={15}>
										<span className="font-weight-semibold">ellarbae.io</span>
									</Col>
								</Row>
							</Col>
						</Row>
					</div>
				</div>
			</Col>
		</Row>
	</Card>
)

const Experiences = () => (
	<Card title="Account Settings">
		<div className="mb-3">
			<Row>
				<Col sm={24} md={22}>
					<Form>
						<Form.Item>
							<label>Username</label>
							<Input></Input>
						</Form.Item>
						<Form.Item>
							<label>Email</label>
							<Input></Input>
						</Form.Item>
						<Form.Item>
							<label>Password</label>
							<Input></Input>
						</Form.Item>
						<Form.Item>
							<label>Confirm Password</label>
							<Input></Input>
						</Form.Item>
						<Form.Item>
							<label>ID</label>
							<Input></Input>
						</Form.Item>
						<Form.Item>
							<label>Map</label>
							<Card style={{width:"100%"}}>
								<Map></Map>
							</Card>
						</Form.Item>
						<Form.Item>
							<Button type="primary" style={{width:"100%"}}>Submit</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
			
		</div>
	</Card>
)


const Connection = () => (
	<Card title="Penghuni">
		{
			connectionList.map((elm, i) => {
				return (
					<div className={`${i === (connectionList.length - 1)? '' : 'mb-4'}`} key={`connection-${i}`}>
						<AvatarStatus src={elm.img} name={elm.name} subTitle={elm.title}/>
					</div>
				)
			}) 
		}
	</Card>
)

export class Profile extends Component {
	render() {
		const avatarSize = 150;
		return (
			<>
				<PageHeaderAlt background="/img/others/img-12.jpg" cssClass="bg-primary" overlap>
					<div className="container text-center">
						<div className="py-5 my-md-5">
						</div>
					</div>
				</PageHeaderAlt>
				<div className="container my-4">
					<ProfileInfo avatarSize={avatarSize} />
					<Row gutter="16">
						<Col xs={24} sm={24} md={8}>
							<Connection />
						</Col>
						<Col xs={24} sm={24} md={16}>
							<Experiences />
						</Col>
					</Row> 
				</div>
			</>
		)
	}
}

export default Profile