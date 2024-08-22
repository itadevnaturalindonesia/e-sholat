import {
    Form
} from 'antd';
import Axios from 'axios';
import moment from 'moment';
import React, {
    useEffect,
    useState
} from 'react';
import {
    strings
} from 'res';
import utils from 'utils';
// import ListItems from '../shared-components/ListItems'
import ItemList from './AnalisaKaryawan';

const tableColumns = [{
        title: 'NIP',
        dataIndex: 'nik',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'nik')

    },
    {
        title: 'Nama Lengkap',
        dataIndex: 'name_users',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'name_users')
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'email')
    },
    {
        title: 'Divisi',
        dataIndex: 'name_division',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'name_division')
    },
    {
        title: 'Department',
        dataIndex: 'name_department',
        sorter: (a, b) => utils.antdTableSorter(a, b, 'name_department')
    }
];

const ANALISA = props => {

    const [form] = Form.useForm();
    const dateFormat = 'YYYY-MM-DD';

    const [dataEmployeeDhuha, setDataEmployeeDhuha] = useState([]);
    const [dataDateDhuha, setDataDateDhuha] = useState([]);
    const [dataEmployeeDzuhur, setDataEmployeeDhuzur] = useState([]);
    const [dataDateDzuhur, setDataDateDzuhur] = useState([]);
    const [dataEmployeeAshar, setDataEmployeeAshar] = useState([]);
    const [dataDateAshar, setDataDateAshar] = useState([]);
    const [dataEmployeeIsya, setDataEmployeeIsya] = useState([]);
    const [dataDateIsya, setDataDateIsya] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [dateStart, setDateStart] = useState(moment(new Date()).format(dateFormat));
    const [dateEnd, setDateEnd] = useState(moment(new Date()).format(dateFormat));

    useEffect(() => {
        //dhuha
        reportEmployee()
    }, [])

    const saveDataState = (datas, value) => {
        let data = {}
        datas.datadetail.map(element => {
            const keyEl = Object.keys(element)
            element[keyEl].forEach((currentValue, index) => {
                if (index === 0) {
                    data = {
                        name: keyEl[0],
                        status_dinas: currentValue.status_dinas,
                        name_division: currentValue.name_division,
                        name_position: currentValue.name_position,
                        [currentValue.tgl]: currentValue.waktu === null ? currentValue.status : currentValue.waktu
                    }
                } else {
                    data = {
                        ...data,
                        [currentValue.tgl]: currentValue.waktu === null ? currentValue.status : currentValue.waktu,
                    }
                }
                if (index === element[keyEl].length - 1) {
                    if (value === 1) setDataEmployeeDhuha(dataEmployee => [...dataEmployee, data])
                    if (value === 2) setDataEmployeeDhuzur(dataEmployee => [...dataEmployee, data])
                    if (value === 3) setDataEmployeeAshar(dataEmployee => [...dataEmployee, data])
                    if (value === 5) setDataEmployeeIsya(dataEmployee => [...dataEmployee, data])
                }
            })
        });
    }

    const reportEmployee = () => {
        setLoading(true)
        const getDhuha = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`, {
            tglstart: dateStart,
            tglend: dateEnd,
            id_sholat: '1'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        const getDzuhur = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`, {
            tglstart: dateStart,
            tglend: dateEnd,
            id_sholat: '2'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        const getAshar = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`, {
            tglstart: dateStart,
            tglend: dateEnd,
            id_sholat: '3'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        const getIsya = Axios.post(`${strings.api.sql_host}/reporting/excel-report/?key=${strings.api.key}`, {
            tglstart: dateStart,
            tglend: dateEnd,
            id_sholat: '5'
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });

        Promise.all([getDhuha, getDzuhur, getAshar, getIsya])
            .then(function (results) {
                if (
                    results[0].data.data.length !== 0 &&
                    results[1].data.data.length !== 0 &&
                    results[2].data.data.length !== 0 &&
                    results[3].data.data.length !== 0
                ) {
                    setDataDateDhuha(results[0].data.data.datatgl)
                    setDataDateDzuhur(results[1].data.data.datatgl)
                    setDataDateAshar(results[2].data.data.datatgl)
                    setDataDateIsya(results[3].data.data.datatgl)
                    saveDataState(results[0].data.data, 1)
                    saveDataState(results[1].data.data, 2)
                    saveDataState(results[2].data.data, 3)
                    saveDataState(results[3].data.data, 5)
                }
                setLoading(false)
            });
    }

    return ( <
        div >
        <
        ItemList tableColumns = {
            tableColumns
        }
        host = {
            `${strings.api.base_url}/users/?key=${strings.api.key}`
        }
        title = {
            "Karyawan"
        }
        detailData = {
            `detail-analisa-karyawan`
        }
        editPath = {
            `edit-karyawan`
        }
        url = {
            `${strings.api.base_url}/users/getUsers/1/?key=${strings.api.key}`
        }
        id = {
            "_id"
        }
        /> <
        /div>
    )
}

export default ANALISA