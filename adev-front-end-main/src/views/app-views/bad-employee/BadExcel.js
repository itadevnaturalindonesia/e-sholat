import { Button } from "antd";
import React, {  } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const BadExcel = (props) => {
    

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

            {props.dataBad && (
                <ExcelSheet data={props.dataBad} name="Bad">
                    {props.dataBad && (
                        props.dateBad.map(e => {
                            return (<ExcelColumn label={e.tgl} value={e.tgl}/>)
                        })
                    )}
                </ExcelSheet>
            )}
        </ExcelFile>
    );
    
}


export default BadExcel