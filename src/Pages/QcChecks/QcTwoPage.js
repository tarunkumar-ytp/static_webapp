import React, { useState, useEffect } from "react";
import { getfileData } from "../../Api/QCCheckService";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../../Components/Spinner/Spinner";
import Swal from "sweetalert2";

function QcTwoPage(props) {
  const [qc_three_data, setData] = useState([]);
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [metricsButton, setMetricsButton] = useState(true);
  useEffect(() => {
    getFileData();
  }, [metricsButton]);
  const navigate = useNavigate();
  const getFileData = () => {
    setIsLoading(true);
    getfileData(state)
      .then((response) => response)
      .then((qc_three_data) => {
        console.log(qc_three_data.data, "*************");
        setData(qc_three_data.data);
        setIsLoading(false);
      });
  };
  function handeClick(id) {
    Swal.fire({
      title: "Metrics executed",
      icon: "success",
      iconColor: "#68992F",
      confirmButtonText: "OK",
      confirmButtonColor: "#2BA0C4",
    }).then(function () {
      setNextButton(true);
      setMetricsButton(false);
      // navigate("/qcmetrics", { state: id });
    });
  }
  function handeClickBack(id) {
    navigate("/qcone", { state: id });
  }
  return (
    <div id="qccard">
      <div id="nav">Quality Check - 2</div>
      <div id="rowCount"><b>TOTAL ROWS : {qc_three_data.total_rows}</b></div>
      <div className="tableContainer">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table id="table">
            <tbody>
              <tr>
                <th>Index Code</th>
                <th>Index Price</th>
                <th>Index Units</th>
                <th>Effective Date</th>
                <th>Date</th>
              </tr>
              {qc_three_data.file_records?.map((item, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left" }}>{item.index_code}</td>
                  <td style={{ textAlign: "left" }}>{item.price} </td>
                  <td style={{ textAlign: "left" }}>{item.units} </td>
                  <td style={{ textAlign: "left" }}>{item.en_date} </td>
                  <td style={{ textAlign: "left" }}>
                    {item.effective_date_time}{" "}
                  </td>
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
            <button onClick={() => handeClick(state)}>Calculate Metrics</button> :
            <button style={{ backgroundColor: "gray" }}>Calculate Metrics</button>
        }

        {
          nextButton ? (
            <button onClick={() => { navigate("/qcmetrics", { state: state }) }} >
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
}

export default QcTwoPage;
