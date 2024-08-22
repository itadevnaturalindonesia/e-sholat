import React, { useState, useEffect } from 'react'
import { Card, Table, Input, Spin, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import axios from 'axios'
import { strings } from 'res';

const AktifList = (props) => {

    const [dataItem, setDataItem] = useState([]);
    const [dataItemBackup, setDataItemBackup] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const tableColumns = [...props.tableColumns]

    const onSearch = e => {
        const value = e.currentTarget.value
        const searchArray = e.currentTarget.value ? dataItem : dataItemBackup
        const data = utils.wildCardSearch(searchArray, value)
        setDataItem(data)
    }

    const getData = async () => {
        setIsLoading(true)
        let tempDate = new Date();
        let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
        let response = await axios.post(`${strings.api.base_url}/users/status/?key=${strings.api.key}`,
        {
            "status":"Cuti",
            "tanggal":`${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth()+1)}-${formatTwoDigits(tempDate.getDate())}`
        }, 
        {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }, (docs) => {
            return docs.data
        })
        setDataItemBackup(response.data.data);
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

export default AktifList