import React from "react";
import { Row, Col } from 'antd';
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import {
	UserSwitchOutlined,
	SyncOutlined,
} from '@ant-design/icons';
import { StarBorderOutlined } from "@material-ui/icons";

const DisplayDataSet = (props) => (
	<Row gutter={24}>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.dataAnalisa.poin}
				title="Poin"
				color="blue"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<StarBorderOutlined />}
				value={props.dataAnalisa.aktif}
				title="Sholat"
				color="green"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<UserSwitchOutlined />}
				value={props.dataAnalisa.soda}
				title="SODA"
				color="gray"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
		<Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
			<DataDisplayWidget
				icon={<SyncOutlined />}
				value={props.dataAnalisa.off}
				title="Tidak Sholat"
				color="orange"
				vertical={true}
				avatarSize={55}
			/>
		</Col>
	</Row>
)

export default DisplayDataSet