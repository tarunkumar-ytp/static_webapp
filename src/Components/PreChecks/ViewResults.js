import React, { useEffect, useState } from "react";
import "./Precheck.css";
import LoadingSpinner from '../../Components/Spinner/Spinner';
import { getViewResults } from "../../Api/PrecheckService";

export default function ViewResults(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.hitProcess) {
      getResultsData();
    }
  }, [props.hitProcess]);

  const getResultsData = () => {
    setIsLoading(true);
    props.nextStep(true)
    getViewResults()   
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {

        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : (
        <div id="container">
          {props.hitProcess &&
          <div className="table-container-vr">
            <table id='table'>
              <thead>
                <tr >
                  <th style={{ textAlign: 'left' }}> Fact Id</th>
                  <th style={{ textAlign: 'left' }}> Index Code</th>
                  <th > Units</th>
                  <th>Price</th>
                  <th> Effective Date</th>
                  <th>Create Date</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr >
                    <td style={{ textAlign: 'left' }} id='tableData'> {item.fact_id}</td>
                    <td style={{ textAlign: 'left' }} id='tableData'>{item.index_code}</td>
                    <td id='tableData'>{item.units}</td>
                    <td id='tableData'> {item.price}</td>
                    <td id='tableData'> {item.effective_date_time}</td>
                    <td id='tableData'> {item.en_date}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
}
        </div>
      )}
    </>
  );
}










