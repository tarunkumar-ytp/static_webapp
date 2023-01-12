import React, {
  useEffect,
  useState,
} from "react";
import "./Precheck.css";
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { dataPrecheck, getDbColumns, getPointedData } from "../../Api/PrecheckService";
import { spot_index_platts, spot_index_opis, rack_index_opis } from "../../FileConfig";


const PointingFields = (props) => {
  const [selectedExcelColumns, setSelectedExcelColumns] = useState([
    "QUOSRC",
    "QUOTYP",
    "QUOTNO",
  ]);
  const [selectedDbColumns, setSelectedDbColumns] = useState(["index_code"]);
  const objectData = {};
  objectData["index_code"] = selectedExcelColumns;
  objectData["index_type"] = ["CONTRACT_TYPE"];
  const [databaseFields, setUrlDatabaseFields] = useState([]);
  const [excelFields, setExcelFields] = useState([]);
  const [mappedConfiguration, setMappedConfiguration] = useState({});
  var emptyRowCount = 0;
  var emptyColumnCount = 0;
  var missingColumns = [];
  var error = [];
  const [errorTriggered, setErrorTriggered] = useState(false);

  useEffect(
    () => {
      fileTypeCheck();
      getDatabaseColumns();
      showAlert()
    },
    [selectedDbColumns],
    [selectedExcelColumns],
    [props.hitProcess],
    [errorTriggered],
    []
  );

  const fileTypeCheck = () => {
    let mandatory_columns = ""
    if (props.formData.fileType == 'Spot-Opis') {
      mandatory_columns = spot_index_opis
    }
    else if (props.formData.fileType == 'Spot-Platts') {
      mandatory_columns = spot_index_platts
    }
    else if (props.formData.fileType == 'Rack-Opis') {
      mandatory_columns = rack_index_opis
    }
    methodCalling(mandatory_columns);
  }

  const methodCalling = (mandatory_columns) => {
    axios.get(props.formData.url).then((result) => {
      performPreCheck(result.data, mandatory_columns);
    });
  };

  const performPreCheck = (data, mandatory_columns) => {
    error = [];
    const header = data.slice(0, data.indexOf("\n")).split(",");
    const indexPositions = [];
    header.map((item, index) => {
      mandatory_columns.map((name, i) => {
        if (item === name) {
          indexPositions.push(index);
        }
      });
    });
    const line = data.trim().split(/\s*[\r\n]+\s*/g);
    const results = [];
    for (let i = 0; i < line.length - 1; i++) {
      var obj = {};
      const currentline = line[i].split(",");
      for (let j = 0; j < mandatory_columns.length; j++) {
        obj[mandatory_columns[j]] = currentline[indexPositions[j]];
      }
      results.push(obj);
    }
    const extractedData = ConvertToCSV(results);
    props.extractData(extractedData);

    const csvHeader = extractedData
      .slice(0, extractedData.indexOf("\r\n"))
      .split(",");
    const csvRows = extractedData
      .slice(extractedData.indexOf("\n") + 1)
      .split("\n");
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
    for (let j = 0; j < mandatory_columns.length; j++) {
      if (csvHeader.includes(mandatory_columns[j])) {
        continue;
      } else {
        missingColumns.push(mandatory_columns[j]);
      }
    }
    if (emptyRowCount > 0) {
      error.push(
        emptyRowCount + " " + "Blank Row(s) Detected"
      );
    }
    if (emptyColumnCount > 0) {
      error.push(
        emptyColumnCount + " " + "Blank Column(s) Detected"
      );
    }
    if (missingColumns.length > 0) {
      error.push("Expected columns not present");
    }

    if (error.length > 0) {
      Swal.fire({
        title: error,
        icon: "error",
        iconColor: "red",
        confirmButtonText: "OK",
        confirmButtonColor: "#2BA0C4",
      }).then(function () {
        setErrorTriggered(false);
      });
      props.nextStep(false);
      setErrorTriggered(false);
      props.buttonDisable(false);
    } else {
      setErrorTriggered(true);
      const output = convertToJson(extractedData);
      performDataCheck(output)
    }
  };

  const showAlert = () => {
    if (props.hitProcess) {
      props.nextStep(true)
      Swal.fire({
        title: "Pointed Data Successfully",
        confirmButtonText: "OK",
        confirmButtonColor: "#2BA0C4",
      }).then(function () {
        console.log("alert");
      });
    }
  }

  function ConvertToCSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";
    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";
        line += array[i][index];
      }
      str += line + "\r\n";
    }
    return str;
  }

  function convertToJson(data) {
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
    const resultData = JSON.stringify(result);
    props.objectData(JSON.parse(resultData));
    props.obj(JSON.parse(resultData));
    rawDataMethod(JSON.parse(resultData));
    return JSON.stringify(result);
  }

  const performDataCheck = (data) => {
    dataPrecheck(data)
      .then((response) => {
        if (response.data.length > 0) {
          Swal.fire({
            title:
              "Please correct format of data in below columns " +
              response.data.join(", "),
            icon: "error",
            iconColor: "red",
            confirmButtonText: "OK",
            confirmButtonColor: "#2BA0C4",
          }).then(function () {
            setErrorTriggered(false);
          });
          props.buttonDisable(false);
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Failed to perform data precheck",
          confirmButtonText: "OK",
          confirmButtonColor: "#2BA0C4",
        })
      });
  };

  const getDatabaseColumns = () => {
    getDbColumns()
      .then((response) => response)
      .then((res) => {
        setUrlDatabaseFields(res.data);
      });
  };
  const rawDataMethod = (rawData) => {
    const extractedFields = rawData[0];
    setExcelFields(Object.keys(extractedFields));
    let payload = {
      fileType: props.formData.fileType,
      PointData: rawData
    }
    getPointedData(payload)
      .then((response) => response)
      .then((data) => {
        props.loadData(data);
      })
      .catch((error) => {
        props.nextStep(false);
        Swal.fire({
          title: "Something went wrong",
          confirmButtonText: "OK",
          confirmButtonColor: "#2BA0C4",
        }).then(function () {
          console.log("alert");
        });
      });
  }; 

  const selectingExcelColumns = (item) => {
    if (!selectedExcelColumns.includes(item)) {
      selectedExcelColumns.push(item);
    }
    setSelectedExcelColumns(selectedExcelColumns);
  };
  const dbColumnsMethod = (item) => {
    if (!selectedDbColumns.includes(item)) {
      selectedDbColumns.push(item);
    }
    setSelectedDbColumns(selectedDbColumns);
  };

  const mappingData = () => {
    mappedConfiguration["index_code"] = selectedExcelColumns;
    mappedConfiguration["index_code"] = selectedExcelColumns;
    setMappedConfiguration(mappedConfiguration);
  };

  return (
    <>
      <div id="container">
        {errorTriggered && error.length != 0 ? (
          <></>
        ) : (
          <>
            <Card className="card-one-etl-pf">
              <Card.Text className="card-header-pf">
                Export file columns
              </Card.Text>
              <Card className="child-card-etl-pf">
                {excelFields.map((item, index) => {
                  return (
                    <Card.Text
                      type="file"
                      item={item}
                      key={index}
                      className="card-text-pf"
                      onClick={(e) => selectingExcelColumns(item)}
                    >
                      {item}
                    </Card.Text>
                  );
                })}
              </Card>
            </Card>

            <Card className="card-two-etl-pf">
              <Card.Text className="card-header-pf">Mapping </Card.Text>
              <Card className="child-card-etl-one-pf" id="content-align">
                {(props.hitProcess && errorTriggered) ? (
                  <>
                    <Card className="child-card-etl-pf-one">
                      <Card.Text className="card-text-pf-one">
                        ZNETPRICE
                      </Card.Text>
                      <Card.Text className="card-text-pf-one">
                        CURRENCY , VOLUME
                      </Card.Text>
                      <Card.Text className="card-text-pf-one">
                        ZCREATEDATE
                      </Card.Text>
                      <Card.Text className="card-text-pf-one">
                        ZEFFDATE, ZEFFTIME
                      </Card.Text>
                      <Card.Text className="card-text-pf-one">
                        QUOSRC, QUOTNO,QUOTYP
                      </Card.Text>
                    </Card>
                    <Card className="child-card-etl-pf-one">
                      <Card.Text className="card-text-pf-one">price</Card.Text>
                      <Card.Text className="card-text-pf-one">units</Card.Text>
                      <Card.Text className="card-text-pf-one">
                        en_date
                      </Card.Text>
                      <Card.Text className="card-text-pf-one">
                        effective_date_time
                      </Card.Text>
                      <Card.Text className="card-text-pf-two">
                        index_code
                      </Card.Text>
                    </Card>
                    {showAlert()}
                  </>
                ) : null}
              </Card>
            </Card>

            <Card className="card-three-etl-pf">
              <Card.Text className="card-header-pf">Table columns</Card.Text>
              <Card className="child-card-etl-pf">
                {databaseFields.map((item, index) => {
                  return (
                    <Card.Text
                      item={item}
                      key={index}
                      className="card-text-pf"
                      onClick={(e) => dbColumnsMethod(item)}
                    >
                      {item}
                    </Card.Text>
                  );
                })}
              </Card>
            </Card>
          </>
        )}
      </div>
    </>
  );
};
export default PointingFields;
