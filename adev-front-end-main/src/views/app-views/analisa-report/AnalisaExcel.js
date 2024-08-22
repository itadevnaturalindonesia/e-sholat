import { Button } from "antd";
import React, {  } from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const AnalisaExcel = (props) => {  
    
    return (
        <ExcelFile filename={props.filename} element={<Button type="primary" style={{ width: "100%" }} htmlType="submit">Download Excel</Button>}>
            {props.data && (
                <ExcelSheet data={props.data} name="Soda">
                    {props.data && (
                        props.dataDate.map((e, index) => {
                            return (<ExcelColumn label={e} value={index}/>)
                        })
                    )}
                </ExcelSheet>
            )}
        </ExcelFile>
    );
    
}


export default AnalisaExcel