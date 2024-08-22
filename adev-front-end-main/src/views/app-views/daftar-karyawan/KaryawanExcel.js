import { Button } from "antd";
import React, {  } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const KaryawanExcel = (props) => {

    return (
        <ExcelFile filename={props.filename} element={<Button type="primary" style={{ width: "100%" }} htmlType="submit">Export Excel</Button>}>
            <ExcelSheet data={props.data} name="Data">
                <ExcelColumn label="Email" value="email"/>
                <ExcelColumn label="NIK" value="nik"/>
                <ExcelColumn label="Nama" value="name_users"/>
                <ExcelColumn label="Departemen" value="name_department"/>
                <ExcelColumn label="Id Shift" value="id_shift"/>
                <ExcelColumn label="Nama Shift" value="name_shift"/>
            </ExcelSheet>
        </ExcelFile>
    );
    
}


export default KaryawanExcel