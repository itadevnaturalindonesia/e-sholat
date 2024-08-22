import { Button, Card, Input, Menu, message, Table, Upload } from 'antd';
import axios from 'axios';
import Flex from 'components/shared-components/Flex';
import React, { useEffect, useState } from 'react'
import { strings } from 'res';
import Utils from 'utils';
import { SearchOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import confirm from 'antd/lib/modal/confirm';
import TemplateExcel from './TemplateExcel';
import readXlsxFile from 'read-excel-file'
import moment from 'moment';

const ConfigWeekend = props => {
    let history = useHistory();
    const dateFormat = 'YYYY-MM-DD';

    const tableColumns = [
        {
            title: 'Deskripsi',
            dataIndex: 'deskripsi',
            sorter: (a, b) => Utils.antdTableSorter(a, b, 'deskripsi')
        },
        {
            title: 'Tanggal',
            dataIndex: 'tanggal',
            sorter: (a, b) => Utils.antdTableSorter(a, b, 'tanggal')
        },
        {
            title: '',
            dataIndex: '',
            render: (_, elm) => (
                <div className="text-center">
                    <EllipsisDropdown menu={dropdownMenu(elm)}/>
                </div>
            )
        }
    ];

    const [dataItem, setDataItem] = useState([]);
    const [dataItemBackup, setDataItemBackup] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

    const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => onDelete(row)}>
				<Flex alignItems="center">
                    <DeleteOutlined />
					<span className="ml-2">Delete</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

    useEffect(() => {
        loadData();
    }, [])
    
    /**
     * Calling API
     */
    const loadData = async () => {
        setIsLoading(true)
		let response = await axios.get(`${strings.api.base_url}/harilibur/?key=${strings.api.key}`,{
			headers:{
				'content-type': 'application/json',
				"Access-Control-Allow-Origin": "*"
			}
		},(docs)=>{
			return docs.data
		})
		setDataItem(response.data.data);
		setDataItemBackup(response.data.data);
		setIsLoading(false);
    }

    const onDelete = (rows) => {
        confirm({
            name: "Informasi",
            content: "Apakah anda yakin?",
            onOk() {
                axios.delete(`${strings.api.base_url}/harilibur/${rows.id}?key=${strings.api.key}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(doc => {
                    message.success("Success")
                    loadData()
                }).catch(e => {
                    console.log('error: ', e.message)
                })
            },
            onCancel() {},
        });
    }

    const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? dataItem : dataItemBackup
		const data = Utils.wildCardSearch(searchArray, value)
		setDataItem(data)
	}

    const onAdding = () => {
        history.push({
			pathname: `add-config-weekend`,
			state: {
				status: false
			}
		})
    }

    const importWeekend = (rows) => {
        const temp = []
		rows.forEach((element, index) => {
			if (index !== 0) {
				temp.push({
					"deskripsi": element[0].toString(),
					"tanggal": moment(element[1].toString()).format(dateFormat),
					"dibuat_oleh": localStorage.getItem('nik')
				})
			}
		});
		setIsLoading(true) 
		axios.post(`${strings.api.base_url}/harilibur/?key=${strings.api.key}`, JSON.stringify(temp),
		{ headers: {
			'Content-Type': 'application/json'
			}}).then(doc => {
			if(doc.data !== null){
                if (doc.data.status === "failed") {
                    message.error(doc.data.message);
                } else {
                    loadData();
                }
				setIsLoading(false);
			}
		}).catch(e => {
			console.log(e.message)
		})
    }

	return (
		<div>
            <h1 style={{textAlign:"center", marginBottom: 15}}>Hari Libur</h1>
            <Card>
                <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
                    <Flex className="mb-1" mobileFlex={false}>
                        <div className="mr-md-3 mb-3">
                            <Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
                        </div>
                    </Flex>
                    <Flex className="mb-1" mobileFlex={false}>
                        <div>
                            <Button onClick={() => onAdding()} type="primary" icon={<PlusCircleOutlined />} block>Tambah {props.title}</Button>
                        </div>
                        <div style={{marginLeft: 25}}>
                            <Upload
                                accept=".xls, .xlsx"
                                showUploadList={false}
                                beforeUpload={file => {
                                    readXlsxFile(file).then((rows) => {
                                        importWeekend(rows)
                                    })
                                    return false;
                                }}
                            >
                                <Button type="primary" style={{ width: "100%" }}>
                                    Import Libur
                                </Button>
                            </Upload>
                        </div>
                        <div style={{marginLeft: 10}}>
						    <TemplateExcel />
					    </div>
                    </Flex>
                </Flex>
                <Table
                    loading={isLoading}
                    columns={tableColumns} 
                    dataSource={dataItem} 
                    rowKey="id"
                />
            </Card>
		</div>
	)
}

export default ConfigWeekend