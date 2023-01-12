import React, {useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Layouts/Navbar/Header";
import Login from "./Pages/Login/Login";
import Etl from "./Pages/ETL/Etl";
import PrecheckPage from "./Pages/PrecheckPage/PrecheckPage";
import FilesList from "./Pages/QcChecks/FilesList";
import QcOne from "./Pages/QcChecks/QcOne";
import QcTwoPage from "./Pages/QcChecks/QcTwoPage";
import QcThree from "./Pages/QcChecks/QcThree";
import QcTwoMetrics from "./Pages/QcChecks/QcTwoMetrics";
import QcTwoMontlyData from "./Pages/QcChecks/QcTwoMontlyData";
import Outlier from "./Pages/QcChecks/Outliers";
import DataLibrary from "./Pages/DataLibrary/DataLibrary";
import SourcingCalculator from "./Pages/SourcingCalculator/SourcingCalculator";
import BuyingPerformance from "./Pages/BuyingPerformance/BuyingPerformance";
import ContractTracker from "./Pages/ContractTracker/ContractTracker";
import FileTypeSelection from "./Pages/FileTypeSelection";
import Contractcard from "./Pages/ContractTracker/contractcard";


import './App.css'


function Router() {
    const path = useLocation();
    useEffect(() => {

    }, []);
    return (
        <>
            {path.pathname !== "/"}
            <div className="App h-md-100">
                {path.pathname !== "/" &&
                    path.pathname !== "/pageNotfound" ? (
                    <Header />
                ) : null}

                <div className="d-md-flex h-md-100 align-items-center">
                    <div className="row p-0 m-0">
                        <Routes>
                            <Route path="/" element={<Login />}></Route>
                            <Route path="Etl" element={<Etl />} />
                            <Route path="DataLibrary" element={<DataLibrary />} />
                            <Route path="SourcingCalculator" element={<SourcingCalculator />} />
                            <Route path="BuyingPerformance" element={<BuyingPerformance />} />
                            <Route path="ContractTracker" element={<ContractTracker />} />
                            <Route path="Etl" element={<Etl />} />
                            <Route path="FilePrecheck" element={<PrecheckPage />} />
                            <Route path="/files" element={<FilesList />} />
                            <Route path="/qcone" element={<QcOne />} />
                            <Route path="/qctwo" element={<QcTwoPage />} />
                            <Route path="/qcthree" element={<QcThree />} />
                            <Route path="/qcmetrics" element={<QcTwoMetrics />} />
                            <Route path="/qcmonthlydata" element={<QcTwoMontlyData />} />
                            <Route path="/outlier" element={<Outlier />} />
                            <Route path="/selectFileType" element={<FileTypeSelection />} />
                            <Route path="/contractcard" element={<Contractcard />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Router