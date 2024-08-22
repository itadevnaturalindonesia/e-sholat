import React, { useState, useEffect } from 'react'
import { Card, Table, Select, Input, Button, Menu, Spin, Space } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, ScheduleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import axios from 'axios'
import { strings } from 'res';
import confirm from 'antd/lib/modal/confirm';

const ShiftList = (props) => {
    let history = useHistory();

    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [dataItem, setDataItem] = useState([]);
    const [dataItemBackup, setDataItemBackup] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => changeShiftSiang(row)}>
				<Flex alignItems="center">
					<ScheduleOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Change Shift Siang'}</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => changeShiftMalam(row)}>
				<Flex alignItems="center">
					<ScheduleOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Change Shift Malam'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

    const tableColumns = [...props.tableColumns, {
        title: '',
        dataIndex: '',
        render: (_, elm) => (
            <div className="text-center">
                <EllipsisDropdown menu={dropdownMenu(elm)} />
            </div>
        )
    }]

    const changeShiftSiang = (row) => {
		setIsLoading(true)
		axios.post(`${strings.api.base_url}/shift/ubahShiftDay/?key=${strings.api.key}`, {
			nik:row.nik,
			id_shift:"1"
		},{ headers: {
			'Content-Type': 'application/json'
			}}).then(doc => {
			if(doc.data !== null){
				getData();
				setIsLoading(false);
			}
		}).catch(e => {
			console.log(e.message)
		})
	}

	const changeShiftMalam = (row) => {
		setIsLoading(true)
		axios.post(`${strings.api.base_url}/shift/ubahShiftDay/?key=${strings.api.key}`, {
			nik:row.nik,
			id_shift:"2"
		},{ headers: {
			'Content-Type': 'application/json'
			}}).then(doc => {
			if(doc.data !== null){
				getData();
				setIsLoading(false);
			}
		}).catch(e => {
			console.log(e.message)
		})
	}

    const onSearch = e => {
        const value = e.currentTarget.value
        const searchArray = e.currentTarget.value ? dataItem : dataItemBackup
        const data = utils.wildCardSearch(searchArray, value)
        setDataItem(data)
        setSelectedRowKeys([])
    }

    const getData = async () => {
        setIsLoading(true)
        let response = await axios.get(`${props.host}`, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }, (docs) => {
            return docs.data
        })
        setDataItemBackup(response.data.data)
        setDataItem(response.data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getData()
    }, [])

    const showLoading = () => {
        if (isLoading) {
            return (
                <div className="table-responsive" style={{ textAlign: "center", width: "100%", height: "100%" }}>
                    <Space size="middle" style={{ textAlign: "center" }}>
                        <Spin size="large" tip="Loading..." />
                    </Space>,
                </div>
            )
        } else {
            return (
                <div className="table-responsive">
                    <h1 style={{ textAlign: "center" }}>{props.title}</h1>

                    <Table
                        isLoading={isLoading}
                        columns={tableColumns}
                        dataSource={dataItem}
                        rowKey={props.id || props.name}
                    />
                </div>
            )
        }
    }

    return (
        <Card>
            <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                <Flex className="mb-1" mobileFlex={false}>
                    <div className="mr-md-3 mb-3">
                        <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
                    </div>
                </Flex>
            </Flex>
            {showLoading()}
        </Card>
    )
}

export default ShiftList