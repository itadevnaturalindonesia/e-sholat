import { Button } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ReactExport from "react-export-excel";
import { strings } from "res";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DownloadExcel = (props) => {

    const [dataEmployeeDhuha, setDataEmployeeDhuha] = useState([]);
    const [dataDateDhuha, setDataDateDhuha] = useState([]);
    const [dataEmployeeDzuhur, setDataEmployeeDhuzur] = useState([]);
    const [dataDateDzuhur, setDataDateDzuhur] = useState([]);
    const [dataEmployeeAshar, setDataEmployeeAshar] = useState([]);
    const [dataDateAshar, setDataDateAshar] = useState([]);
    const [dataEmployeeIsya, setDataEmployeeIsya] = useState([]);
    const [dataDateIsya, setDataDateIsya] = useState([]);

    const loadReportEmployee = (value) => {
        let data = {}
        Axios.post(`${strings.api.sql_host}/reporting/excel-report-bynik/?key=${strings.api.key}`,{
            tglstart:"2021-04-10",
            tglend:"2021-04-14",
            id_sholat:value,
            // nik: nik
        }, {
            headers: {
                'content-type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then(doc => {
            if (value === 1) setDataDateDhuha(doc.data.data.datatgl)
            if (value === 2) setDataDateDzuhur(doc.data.data.datatgl)
            if (value === 3) setDataDateAshar(doc.data.data.datatgl)
            if (value === 5) setDataDateIsya(doc.data.data.datatgl)
            
            doc.data.data.datadetail.map(element => {
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
        }).catch(err => {})
    }

    return (
        <ExcelFile filename={props.filename} element={<Button type="primary" style={{ width: "100%" }} htmlType="submit">Download Excel</Button>}>
            {props.dataEmployeeDhuha && (
                <ExcelSheet data={props.dataEmployeeDhuha} name="Dhuha">
                    <ExcelColumn label="Nama" value="name"/>
                    <ExcelColumn label="Divisi" value="name_division"/>
                    <ExcelColumn label="Position" value="name_position"/>
                    {props.dataDateDhuha && (
                        props.dataDateDhuha.map(e => {
                            return (<ExcelColumn label={e.tgl} value={e.tgl}/>)
                        })
                    )}
                </ExcelSheet>
            )}
            {props.dataEmployeeDzuhur && (
                <ExcelSheet data={props.dataEmployeeDzuhur} name="Dzuhur">
                    <ExcelColumn label="Nama" value="name"/>
                    <ExcelColumn label="Divisi" value="name_division"/>
                    <ExcelColumn label="Position" value="name_position"/>
                    {props.dataDateDzuhur && (
                        props.dataDateDzuhur.map(e => {
                            return (<ExcelColumn label={e.tgl} value={e.tgl}/>)
                        })
                    )}
                </ExcelSheet>
            )}
            {props.dataEmployeeAshar && (
                <ExcelSheet data={props.dataEmployeeAshar} name="Ashar">
                    <ExcelColumn label="Nama" value="name"/>
                    <ExcelColumn label="Divisi" value="name_division"/>
                    <ExcelColumn label="Position" value="name_position"/>
                    {props.dataDateAshar && (
                        props.dataDateAshar.map(e => {
                            return (<ExcelColumn label={e.tgl} value={e.tgl}/>)
                        })
                    )}
                </ExcelSheet>
            )}
            {props.dataEmployeeIsya && (
                <ExcelSheet data={props.dataEmployeeIsya} name="Isya">
                    <ExcelColumn label="Nama" value="name"/>
                    <ExcelColumn label="Divisi" value="name_division"/>
                    <ExcelColumn label="Position" value="name_position"/>
                    {props.dataDateIsya && (
                        props.dataDateIsya.map(e => {
                            return (<ExcelColumn label={e.tgl} value={e.tgl}/>)
                        })
                    )}
                </ExcelSheet>
            )}
            
        </ExcelFile>
    );
    
}


export default DownloadExcel