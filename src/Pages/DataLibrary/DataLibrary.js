import React from "react";
import './datalibrary.css';
import { useNavigate, useLocation } from "react-router-dom";

const DataLibrary = () => {
  
  const navigate = useNavigate();

  function navigateTo() {
      navigate("/Etl")  
  }
  function navigateToCT() {
      navigate("/ContractTracker")
  }
  
  
  return (
    <>
       <div id="dlcard">
            <div id='nav'>
              Data Library
             </div>

            <div className="btn-text-right" >
            <button id="main-button" onClick={navigateTo}>ETL</button>
            <button id="main-button" onClick={navigateToCT}>Contract List</button>
            </div>
            </div>
    </>
  );
};
export default DataLibrary;