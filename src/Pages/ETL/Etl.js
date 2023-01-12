import React, { useState, useEffect, useRef } from "react";
import './etl.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import uploadFileToBlob, { blobData, isStorageConfigured, checkfileexists } from "../../Components/AzureBlob/AzureBlob";
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import LoadingSpinner from '../../Components/Spinner/Spinner'

const Etl = ({ navigation }) => {
  const [fileNameArray, setFileNameArray] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const fileUpload = event => {
    inputRef.current.click();
  };

  function handeClick(url, fileName) {
    navigate("/selectFileType", { state: { url: url ,fileName: fileName} })
  }

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  async function getFileFromUrl(url, name, defaultType = "text/csv") {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type || defaultType,
    });
  }

  useEffect(() => {
    checkfileexists()
    if (isSelected === true) {
      handleSubmit();
    }
    getFiles();
  }, [selectedFile]);

  const getFiles = async () => {
    setIsLoading(true);
    const blobUrl = await blobData();
    let fileNameArrayData = [];
    let urls = [];
    for (var i = 0; i < blobUrl.length; i++) {
      const fileType = blobUrl[i].substring(blobUrl[i].lastIndexOf('/') + 1);
      urls.push(blobUrl[i]);
      const file = await getFileFromUrl(blobUrl[i], fileType);
      fileNameArrayData.push(file.name);
    }
    setFileUrls(urls);
    setFileNameArray(fileNameArrayData)
    setIsLoading(false);
    return fileNameArray;
  }

  const filteredData = fileNameArray.filter((el) => {
    if (inputText === '') {
      return el;
    }
    else {
      return el.toLowerCase().includes(inputText)
    }
  })

  function handeClickBack() {
    navigate("/files")
  }

  const handleSubmit = async () => {
    // if (selectedFile.type === "text/csv" || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'application/json') {
    if (selectedFile.type === "text/csv" || selectedFile.type === 'application/json' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    const blobsInContainer = await uploadFileToBlob(selectedFile);
      getFiles()

      Swal.fire({
        title: "Success",
        text: "File uploaded successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

    } else {
      Swal.fire({
        title: "Failed",
        text: "File type should be .csv/.json/.xlsx",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div id="card">
      <div id='nav'>
        List of Files in the Blob Storage
      </div>
    
      <div className="btn-text-right" >
      <FilledInput style={{ width: "200px" }}
          id="filled-adornment-weight"
          onChange={(e) => inputHandler(e)}
          endAdornment={
            <SearchIcon />
          }
          placeholder="Search Files"
        />
  <button id="main-button" onClick={handeClickBack}  style={{marginLeft:'20px'}}>View Staging Area</button>
  <button id="main-button"  onClick={fileUpload}>Upload File</button>
  <input ref={inputRef} type="file" name="file" onChange={handleChange} style={{ display: 'none' }} />
</div>

    
        {/* <button onClick={handeClickBack} style={{ margin: '0px 5px', width:'11%' }}> View Staging Area</button> */}
        {/* <button style={{width: '11%'}} onClick={fileUpload}>Upload File</button> */}
        {/* <input ref={inputRef} type="file" name="file" onChange={handleChange} style={{ display: 'none' }} /> */}
  
      {isLoading ? <LoadingSpinner /> : (
        <div className="tableContainer">
          {filteredData.length > 0 ?
            <table id='table'>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th style={{ textAlign: 'left' }}>File Name</th>
                  <th>Download</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredData.map((item, index) => (
                    <tr key={index} style={{ overflowY: 'scroll', height: '85%' }}>
                      <td >{index + 1}</td>
                      <td style={{ textAlign: 'left' }}>{item} </td>
                      <td >
                        <a href={fileUrls[index]} download>
                          <IconButton aria-label="Example">
                            {/* <DownloadIcon /> */}                            
                            <img
                              style={{ height: '25px', width: "25px"}}
                              src={require("../../Assets/Icons/downloadImage.png")}
                              alt="icon"
                            />
                          </IconButton>
                        </a>
                      </td>
                      <td><button onClick={() => {
                        handeClick(fileUrls[index], fileNameArray[index])
                      }} >Process</button></td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
            :
            <div id="message">
              <h2>No records found</h2>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default Etl;




