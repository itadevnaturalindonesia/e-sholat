import { Button } from "antd";
import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AnalisaPoinExcel = (props) => {

    return (
        <ExcelFile filename={props.filename} element={<Button type="primary" style={{ width: "100%" }} htmlType="submit">Download Excel</Button>}>
            {
                props.dataRekap && (
                    <ExcelSheet data={props.dataRekap} name="Poin">
                        <ExcelColumn label="NIK" value="nik"/>
                        <ExcelColumn label="Nama" value="name_users"/>
                        <ExcelColumn label="Divisi" value="name_division"/>
                        <ExcelColumn label="Dhuha" value="dhuha"/>
                        <ExcelColumn label="Dzuhur" value="dzuhur"/>
                        <ExcelColumn label="Ashar" value="ashar"/>
                        <ExcelColumn label="Maghrib" value="maghrib"/>
                        <ExcelColumn label="Isya" value="isya"/>
                        <ExcelColumn label="Total" value="total"/>
                    </ExcelSheet>
                )
            }
        </ExcelFile>
    );
    
}


export default AnalisaPoinExcel