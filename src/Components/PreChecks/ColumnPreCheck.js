import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import "./Precheck.css";
import { spot_index_platts, spot_index_opis, rack_index_opis } from "../../FileConfig";

function ColumnPreCheck(props) {
  var emptyRowCount = 0;
  var emptyColumnCount = 0;
  var missingColumns = [];
  var error = [];
  const [errorMessage, setErrorMessage] = useState([]);
  const [haveErrors, setHaveErrors] = useState();
  const [totalRows, setTotalRows] = useState();
  const [totalColumns, setTotalColumns] = useState();
  const [mandatoryColumns, setMandatoryColumns] = useState([]);
  useEffect(() => {
    fileTypeCheck();
    if (props.hitProcess) {
      performPreCheck(props.extractData);
    }
  }, [props.hitProcess]);

  const fileTypeCheck = () => {
    if (props.formData.fileType == 'Spot-Opis') {
      setMandatoryColumns(spot_index_opis)
    }
    else if (props.formData.fileType == 'Spot-Platts') {
      setMandatoryColumns(spot_index_platts)
    }
    else if (props.formData.fileType == 'Rack-Opis') {
      setMandatoryColumns(rack_index_opis)
    }
  }
  const performPreCheck = (extractedData) => {
    error = [];
    const csvHeader = extractedData.slice(0, extractedData.indexOf("\r\n")).split(",");
    const csvRows = extractedData.slice(extractedData.indexOf("\n") + 1).split("\n");
    const lines = extractedData.trim().split(/\s*[\r\n]+\s*/g);
    lines.forEach((line, index) => {
      let row = line.replace(/,/g, "");
      if (row === "") {
        emptyRowCount++;
      }
    });

    for (let j = 0; j < csvHeader.length; j++) {

      var result = [];
      for (let i = 1; i < lines.length - 1; i++) {
        const currentline = lines[i].split(",");
        result.push(currentline[j]);
      }
      const col = result.toString().replace(/,/g, "");
      if (col === "") {
        emptyColumnCount++;
      }
    }

    for (let j = 0; j < mandatoryColumns.length; j++) {
      if (csvHeader.includes(mandatoryColumns[j])) {
        continue;
      } else {
        missingColumns.push(mandatoryColumns[j]);
      }
    }
    if (emptyRowCount > 0) {
      error.push(
        emptyRowCount + " " + "Blank Row(s) Detected, please delete them"
      );
    }
    if (emptyColumnCount > 0) {
      error.push(
        emptyColumnCount + " " + "Blank Column(s) Detected, please remove"
      );
    }
    if (missingColumns.length > 0) {
      error.push("Expected columns not present, Please check");
    }

    setTotalRows(lines.length);
    setTotalColumns(csvHeader.length);
    setErrorMessage(error);

    if (error.length > 0) {
      setHaveErrors(true);
      props.nextStep(false);
    }
    else {
      props.nextStep(true);
    }
    const output = convertToJson(extractedData);
    props.obj(JSON.parse(output));
  };
  function convertToJson(data) {
    // var lines = data.split("\n");
    var lines = data.trim().split(/\s*[\r\n]+\s*/g);
    var result = [];
    var headers = lines[0].split(",");
    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);

    }
    return JSON.stringify(result);
  }
  return (
    <>
      <div id="container">
        {haveErrors ? (
          <div className="precheck_text">
            <RxCrossCircled id="error" name="RxCrossCircled" />
            <ul className="row_column_failure_text">
              {errorMessage.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </div>
        ) : (
          <>
            {props.screenName === "Column/Row Precheck" &&
              <div className="precheck_text">
                <FaCheckCircle id="success" name="FaCheckCircle" />
                <div className="row_column_text">
                  <ul>
                    <li className="row_column_text1">Total row count : {totalRows}  <FaCheck style={{ color: 'green', marginLeft: '3px', }} /></li>
                    <li className="row_column_text2">Total column count : {totalColumns}  <FaCheck style={{ color: 'green', marginLeft: '3px', }} /></li>
                  </ul>
                </div>
              </div>
            }
          </>
        )}
      </div>
    </>
  );
}
export default ColumnPreCheck;


