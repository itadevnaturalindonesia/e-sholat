import { Button } from "antd";
import React, {  } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TemplateExcel = (props) => {

    const dataSet1 = [
        {
            'nik': "NIK",
            'shift': "1 untuk shift siang",
        },
        {
            'nik': "NIK",
            'shift': "2 untuk shift malam",
        },
    ];
    

    return (
        <ExcelFile filename='TemplateShift' element={<Button type="primary" style={{ width: "100%" }} htmlType="submit">Template Shift</Button>}>
            <ExcelSheet data={dataSet1} name="Data">
                <ExcelColumn label="NIK" value="nik"/>
                <ExcelColumn label="Shift" value="shift"/>
            </ExcelSheet>
        </ExcelFile>
    );
    
}


export default TemplateExcel