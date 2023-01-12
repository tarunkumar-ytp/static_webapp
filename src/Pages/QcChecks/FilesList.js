import React, { useState, useEffect } from "react";
import { filesList } from "../../Api/QCCheckService";
import "./FileList.css";
import "./qcchecks.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingSpinner from "../../Components/Spinner/Spinner";

function FilesList() {
  const [files, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation()
  function handeClick(id) {
    navigate("/qcone", { state: id });
  }
  useEffect(() => {
    getFilesList();
  }, []);

  const getFilesList = () => {
    setIsLoading(true);
    filesList()
      .then((response) => response)
      .then((response) => {
        let data = response.data.file_records;
        setData(data);
        setIsLoading(false);
      });
  };

  return (
    <div id="qccard">
      <div id="nav">Staging Area</div>
      <div className="files_tableContainer">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table id="table">
            <tbody>
              <tr>
                <th>File Name</th>
                <th>Action</th>
              </tr>
              {files?.map((item, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left" }}>{item.file_name}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => handeClick(item.batch_id)}
                      className="qcbutton"
                      id="qcbutton"
                    >
                      Move for QC Analysis
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FilesList;