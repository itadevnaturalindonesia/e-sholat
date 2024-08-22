import { Button } from "antd";
import React, {  } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TemplateExcel = (props) => {

    const dataSet1 = [
        {
            'deskripsi': "Deskripsi Keterangan",
            'tanggal': "26-05-2021",
        },
        {
            'deskripsi': "Deskripsi Keterangan",
            'tanggal': "26-05-2021",
        },
    ];
    

    return (
        <ExcelFile filename='TemplateLibur' element={<Button type="primary" style={{ width: "100%" }} htmlType="submit">Template Libur</Button>}>
            <ExcelSheet data={dataSet1} name="Data">
                <ExcelColumn label="Deskripsi" value="deskripsi"/>
                <ExcelColumn label="Tanggal" value="tanggal"/>
            </ExcelSheet>
        </ExcelFile>
    );
    
}


export default TemplateExcel