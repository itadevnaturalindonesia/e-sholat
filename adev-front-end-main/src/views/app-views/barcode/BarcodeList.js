import React, {useState,useEffect} from 'react'
import { Card, Table, Select, Input, Button, Menu, Spin,Space } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined, ScheduleOutlined, DownloadOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils'
import axios from 'axios'
import { strings } from 'res';
import confirm from 'antd/lib/modal/confirm';
import QRCode from 'qrcode.react';
import Modal from 'antd/lib/modal/Modal';

const BarcodeList = (props) => {
	let history = useHistory();

	const [dataItem, setDataItem] = useState([]);
	const [dataItemBackup, setDataItemBackup] = useState([]);
	const [isLoading, setIsLoading] = useState(true)
	const [qrCode, setQrCode] = useState(true)

    // QRCode
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">Lihat</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => changeStatus(row)}>
				<Flex alignItems="center">
					<ScheduleOutlined />
					<span className="ml-2">{row.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">Hapus</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const addQRCode = () => {
        setIsLoading(true)
		axios.post(`${props.addPath}`, {
            "id_pembuat":"2"
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
	
    const downloadQRCode = () => {
        const canvas = document.getElementById(qrCode);
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${qrCode}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
	}
	
	const viewDetails = row => {
        setIsModalVisible(true);
        setQrCode(row.qrstr)
	}
	
	const deleteRow = row => {
		confirm({
			title: "Delete Data",
			content: "Are you sure?",
			onOk() {
					axios.delete(`${strings.api.base_url}/qrcode/${row.id}?key=${strings.api.key}`, { headers: {
						'Content-Type': 'application/json'
					  }}).then(doc => {
						if(doc.data !== null){
							getData();
							setIsLoading(false);
						}
					}).catch(e => {
						console.log(e.message)
					})
			},
			onCancel() {},
		});
	}

	const changeStatus = (row) => {
		setIsLoading(true)
        let statusBarcode = ''
        if (row.status === 'Aktif') {
            statusBarcode = 'Non Aktif'
        } else {
            statusBarcode = 'Aktif'
        }
		axios.put(`${strings.api.base_url}/qrcode/${row.id}?key=${strings.api.key}`,{
            "status": statusBarcode
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

	const tableColumns = [...props.tableColumns,{
		title: '',
		dataIndex: '',
		render: (_, elm) => (
			<div className="text-center">
				<EllipsisDropdown menu={dropdownMenu(elm)}/>
			</div>
		)
	}]
	
	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? dataItem : dataItemBackup
		const data = utils.wildCardSearch(searchArray, value)
		setDataItem(data)
	}

	const getData = async () => {
		setIsLoading(true)
		let response = await axios.get(`${props.host}`,{
			headers:{
				'content-type': 'application/json',
				"Access-Control-Allow-Origin": "*"
			}
		},(docs)=>{
			return docs.data
		})
		setDataItemBackup(response.data.doc || response.data.data)
		setDataItem(response.data.doc || response.data.data);
		setIsLoading(false);
	}

	useEffect(() => {
		getData()
	}, [])

	const showLoading = () =>{
        return(
            <div className="table-responsive">
                <h1 style={{textAlign:"center"}}>{props.title}</h1>
                
                <Table 
                    isLoading={isLoading}
                    columns={tableColumns} 
                    dataSource={dataItem} 
                    loading={isLoading}
                    rowKey={props.id || props.name} 
                />
            </div>
        )
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
				</Flex>
				<div>
                    <Button  onClick={addQRCode} type="primary" icon={<PlusCircleOutlined />} block>Tambah QRCode</Button>
				</div>
			</Flex>
            <Modal title="Basic Modal" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} style={{margin: 'auto'}}>
                <div style={{ display: "flex",justifyContent: "center",alignItems: "center"}}>
                    <QRCode
                        id={qrCode}
                        value={qrCode}
                        size={320}
                        level={"H"}
                        includeMargin={true}                    
                    />
                </div>
                <Button onClick={downloadQRCode} type="primary" icon={<DownloadOutlined />} block>Download</Button>
            </Modal>
			{showLoading()}
		</Card>
	)
}

export default BarcodeList