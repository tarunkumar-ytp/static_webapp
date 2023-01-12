import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import LoadingSpinner from "../Spinner/Spinner";
import axios from "axios";
import { dataPrecheck } from "../../Api/PrecheckService";

function DataPreCheck(props) {
  const [errorMessage, setErrorMessage] = useState([]);
  const [haveErrors, setHaveErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // handleSubmission()
    if (props.hitProcess) {
      handleSubmission();
    }
  }, [props.hitProcess]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmission = () => {
    setIsLoading(true);
    props.nextStep(true);  
    dataPrecheck(props.obj)
      .then((response) => {
        delay(2000);
        if (response.data.length > 0) {
          // setErrorMessage("Please correct format of data in below columns " + result.join(", "))
          setErrorMessage(response.data.join(", "));
          setHaveErrors(true);
          props.nextStep(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setHaveErrors(true);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div id="container">
          {haveErrors ? (
            <div className="precheck_text">
              <RxCrossCircled id="error" name="RxCrossCircled" />
              <ul className="row_column_failure_text">
                <li>Please correct below columns data </li>
                <p style={{ textAlign: "center", fontSize: "16px" }}>
                  {errorMessage}
                </p>
              </ul>
            </div>
          ) : (
            <>
              {props.screenName === "Data Precheck" ? (
                <div className="precheck_text">
                  <FaCheckCircle id="success" name="FaCheckCircle" />
                  <div className="row_column_text">
                    <ul>
                      <li className="row_column_text1">Data Precheck Passed</li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      )}
    </>
  );
}
export default DataPreCheck;
