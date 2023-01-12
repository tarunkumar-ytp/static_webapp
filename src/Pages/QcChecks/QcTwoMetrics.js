import React, { useState, useEffect } from "react";
import "./qcchecks.css";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../Components/Spinner/Spinner";
import { get_metrices } from "../../Api/QCCheckService";

const QcTwoMetrics = (props) => {
  const [qc_metrices_data, setData] = useState([]);
  const [totalIndexes, settotalIndexes] = useState([]);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [metricsButton, setMetricsButton] = useState(true);
  useEffect(() => {
    getMetricesData();
  }, []);
  const navigate = useNavigate();
  function getMetricesData(id) {
    setIsLoading(true);
    get_metrices(state)
      .then((response) => response)
      .then((qc_metrices_data) => {
        console.log(qc_metrices_data.data, "*************");
        setData(qc_metrices_data.data);
        settotalIndexes(qc_metrices_data.data.get_query_qc3_no_of_index_code[0].count)
        console.log(qc_metrices_data.data.get_query_qc3_no_of_index_code[0].count)
        setIsLoading(false);
      });
  }
  function monthData(id) {
    setNextButton(true);
    setMetricsButton(false);
    navigate("/qcmonthlydata", { state: id });
  }
  function handeClickBack(id) {
    navigate("/qctwo", { state: id });
  }
  function decimal(x) {
    return Number.parseFloat(x).toFixed(4);
  }

  return (
    <div id="qccard">
      <div id="nav">QC Metrices Data</div>
      <div id="rowCount"><b>TOTAL INDEXES : {totalIndexes}</b></div>
      <div className="tableContainer">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table id="table">
            <tbody>
              <tr>
                <th>Index Code</th>
                <th>Count of Price</th>
                <th>Min of Price</th>
                <th>Max of Price</th>
                <th>Avg of Price</th>
                <th>Variance of Price</th>
              </tr>
              {qc_metrices_data.qc_data_metrices?.map((item, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left" }}>{item.index_code}</td>
                  <td style={{ textAlign: "left" }}>{item.sum} </td>
                  <td style={{ textAlign: "left" }}>{item.min} </td>
                  <td style={{ textAlign: "left" }}>{item.max} </td>
                  <td style={{ textAlign: "left" }}>{decimal(item.avg)} </td>
                  <td style={{ textAlign: "left" }}>{decimal(item.variance)} </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div style={{ marginTop: "1%" }}>
        <button onClick={handeClickBack}>Back</button>
        {
          metricsButton ?
            <button onClick={() => monthData(state)}>Months Data</button> :
            <button style={{ backgroundColor: "gray" }}>Months Data</button>
        }
        {
          nextButton ? (
            <button onClick={() => monthData(state)}>
              Next
            </button>
          ) : (
            <button style={{ backgroundColor: "gray" }}>
              Next
            </button>
          )
        }
      </div>
    </div>
  );
};

export default QcTwoMetrics;
