import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import LoadingSpinner from '../../Components/Spinner/Spinner'
import Swal from "sweetalert2";
import { loadResults } from "../../Api/PrecheckService";

function LoadResults(props) {
  const [haveErrors, setHaveErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.hitProcess) {
      loadData()
    }
  }, [props.hitProcess]);
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const loadData = () => {
    console.log(props.fileName)
    let loadresult_payload = {
      filename: props.fileName,
      filetype:props.formData.fileType,
      loadresults: props.loadData
    }
    console.log('ppp',loadresult_payload)
    setIsLoading(true);
    props.nextStep(true);
    loadResults(loadresult_payload)
    .then((response) => {
      delay(2000)
      setIsLoading(false);
      if (response.status!= 201) {

        setHaveErrors(true)
        props.nextStep(false);
      }      
    })
    .catch((error) => {
      props.nextStep(false);
      setHaveErrors(true);
      setIsLoading(false);
    });     
  }
  return (
    <>
      <div >
        {isLoading ? <LoadingSpinner /> : (
          <div id="container">
            {haveErrors ? (
              <div className="precheck_text">
                <RxCrossCircled id="error" name="RxCrossCircled" />
                <ul className="row_column_failure_text">
                  <li>Loading Data Failed</li>
                </ul>
              </div>
            ) : (
              <>
                {props.screenName === "Load Data" &&
                  <div className="precheck_text">
                    <FaCheckCircle id="success" name="FaCheckCircle" />
                    <div className="row_column_text">
                      <ul>
                        <li className="row_column_text1">Data Loaded Successfully</li>
                      </ul>
                    </div>
                  </div>
                } </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
export default LoadResults;
