import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ColumnPreCheck from "../../Components/PreChecks/ColumnPreCheck";
import DataPreCheck from "../../Components/PreChecks/DataPreCheck";
import LoadResults from "../../Components/PreChecks/LoadResults";
import PointingFields from "../../Components/PreChecks/PointingFields";
import ViewResults from "../../Components/PreChecks/ViewResults";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import axios from "axios";
import { getExcelData } from "../../Api/ImportService";

function getSteps() {
  return [
    "Pointing Fields",
    "Column/Row Precheck",
    "Data Precheck",
    "Load Results",
    "View Results",
  ];
}
const PrecheckPage = () => {
  const state = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [ColumnPreCheckObj, setColumnPreCheckObj] = useState();
  const [nextStep, setNextStep] = useState(false);
  const steps = getSteps();
  const navigate = useNavigate();
  const [loadResults, setLoadResults] = useState();
  const [pointingPreCheckdata, setPointingPreCheckData] = useState();
  const [hitProcess, setHitProcess] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [screenName ,setScreenName] = useState();
  const [extractData, setExtractData] = useState();

  useEffect(() => {
    getExcelData(state.state.url).then((response) => {
      console.log("getExcelData Method : ", response)
    })
  })

  const navigateTo = () => {
    
    // 👇️ navigate to /
    navigate("/files");
  };
  const renderActiveStepComponent = () => {
    switch (activeStep) {
      case 0:
        return (
          <PointingFields
            formData={state.state}
            extractData={setExtractData}
            obj={setColumnPreCheckObj}
            objectData={setPointingPreCheckData}
            loadData={setLoadResults}
            nextStep={setNextStep}
            hitProcess={hitProcess}
            buttonDisable = {setButtonDisable}
            screenName={screenName}
          />
        );
      case 1:
        return (
          <ColumnPreCheck
            formData={state.state}
            extractData={extractData}
            obj={setColumnPreCheckObj}
            nextStep={setNextStep}
            hitProcess={hitProcess}
            screenName={screenName}
          />
        );
      case 2:
        return (
          <DataPreCheck
            obj={ColumnPreCheckObj}
            nextStep={setNextStep}
            hitProcess={hitProcess}
            screenName={screenName}            
          />
        );
      case 3:
        return (
          <LoadResults
            loadData={loadResults}
            fileName={state.state.fileName}
            nextStep={setNextStep}
            hitProcess={hitProcess}
            screenName={screenName}
          />
        );
      case 4:
        return (
          <ViewResults obj={setColumnPreCheckObj} hitProcess={hitProcess}   nextStep={setNextStep} />
        );
      default:
        break;
    }
  };

  const buttonText = () => {
    switch (activeStep) {
      case 0:
        return "Point Data";
      case 1:
        return "Column/Row Precheck";
      case 2:
        return "Data Precheck";
      case 3:
        return "Load Data";
      case 4:
        return "View Data";
      default:
        break;
    }
  };

  return (
    <>
      <div id="card">
        <div id="nav">
          <div id="precheck-title">ETL Working Progress</div>
        </div>
        <Box sx={{ width: "90%", margin: "auto", marginTop: "30px" }} mb={2}>
          <Stepper className="stepper" activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel id="stepper-label">{label.toUpperCase()}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {renderActiveStepComponent()}
        <div className="fieldArea7 pt-2 pb-2 justify-content-center">
          {activeStep == 0 ? (
            <button style={{ backgroundColor: "gray" }}>Back</button>
          ) : (
            <button
              onClick={() => {
                setActiveStep((prev) => prev - 1);
              }}
            >
              Back
            </button>
          )}
          
          {buttonDisable?(<button
            onClick={() => {
              setHitProcess(true);
              setScreenName(buttonText())
            }}
            >
            {buttonText()}
          </button>
          ):(<button style={{ backgroundColor: "gray" }}>
            {buttonText()}
          </button>)}
          {activeStep < 4 ? (
            nextStep ? (
              // <button className="next_button"
              // postive next button
              <>
                
                <button
                  onClick={() => {
                    setActiveStep((prev) => prev + 1);
                    setHitProcess(false)
                    setNextStep(false)
                  }}
                >
                  Next
                </button>
              </>
            ) : (
              // negative next button (disable)
              <>
                <button style={{ backgroundColor: "gray" }}>Next</button>
                <button onClick={() => navigate("/Etl")}>Back to ETL</button>
              </>
            )
          ) : (
            <>
            {
              nextStep ? 
              <button onClick={navigateTo}>Move for QC Analysis</button>:
              <button style={{ backgroundColor: "gray" }}>Move for QC Analysis</button>
            }
                          </>

          )}
        </div>
      </div>
    </>
  );
};
export default PrecheckPage;
