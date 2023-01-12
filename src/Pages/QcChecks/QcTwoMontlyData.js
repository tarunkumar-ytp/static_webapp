import React, { useState, useEffect } from "react";
import "./qcchecks.css";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../Components/Spinner/Spinner";
import { get_metrices, add_metrics } from "../../Api/QCCheckService";
import Swal from "sweetalert2";


const QcTwoMontlyData = (props) => {
    const [qc_monthly_data, setData] = useState([]);
    const [days, setDays] = useState([]);
    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [enableOutliers, setEnableOutliers] = useState(false);
    const [saveMetrics, setSaveMetrics] = useState(true);
    useEffect(() => {
        getMetricesData();
    }, []);
    const navigate = useNavigate();

    function getMetricesData(id) {
        setIsLoading(true);
        get_metrices(state)
            .then((response) => response)
            .then((qc_monthly_data) => {
                console.log(qc_monthly_data.data, "*************");
                console.log(qc_monthly_data.data.qc_data_metrices, "*************");
                let noOfDays = qc_monthly_data.data.qc_data_no_of_days[0].count
                setData(qc_monthly_data.data);
                setDays(noOfDays);
                setIsLoading(false);

            });
    }
    function postMetrics() {
        let final_data = {
            "monthly_data": qc_monthly_data.qc_data_metrices,
            "batch_id": state
        }
        console.log("final_data : ", final_data)
        add_metrics(final_data)
            .then((response) => response)
            .then(() => {
                Swal.fire({
                    title: "added successfully",
                    icon: "success",
                    iconColor: '#68992F',
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2BA0C4",
                }).then(function () {
                    setEnableOutliers(true);
                    setSaveMetrics(false);
                    // navigate("/outlier", { state: state })
                });
            });

    }
    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }
    function handeClickBack() {
        navigate("/qcmetrics");
    }
    function handeClickNext(id) {
        navigate("/outlier", { state: state });
    }
    function decimal(x) {
        return Number.parseFloat(x).toFixed(4);
      }

    return (
        <div id="qccard">
            <div id="nav">QC Monthly Metrices Data</div>
            <div id="rowCount"><b>No.of Days : {days}</b></div>
            <div className="tableContainer">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <table id="table">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Year</th>
                                <th>Month</th>
                                <th>Sum</th>
                            </tr>
                            {qc_monthly_data.qc_data_month?.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: "left" }}>{item.id}</td>
                                    <td style={{ textAlign: "left" }}>{item.yr} </td>
                                    <td style={{ textAlign: "left" }}>{toMonthName(item.mon)}</td>
                                    <td style={{ textAlign: "left" }}>{item.sum} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div style={{ marginTop: "1%" }}>
                <button onClick={handeClickBack}>Back</button>
                {
                    saveMetrics?
                    <button onClick={postMetrics}>Save Metrics</button>:
                    <button style={{ backgroundColor: "gray" }}>Save Metrics</button>
                }               
                {
                    enableOutliers?
                    <button onClick={handeClickNext(state)}>Outliers</button>:
                    <button style={{ backgroundColor: "gray" }} >Outliers</button>
                }
                
            </div>
        </div>
    );
};

export default QcTwoMontlyData;
