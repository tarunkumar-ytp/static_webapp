import React, { useState, useEffect } from "react";
import { filesList } from "../../Api/QCCheckService";
import { contractList } from "../../Api/ContractService";
import { useNavigate,useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import LoadingSpinner from "../../Components/Spinner/Spinner";
import './contracttracker.css'

function ContractTracker() {
  const [contractDatalist, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation()

  function navigateTosc() {
    navigate("/SourcingCalculator")
}
function navigateTocard() {
  navigate("/contractcard")
}

  useEffect(() => {
    getcontractList();
  }, []);

  const getcontractList = () => {
    
    setIsLoading(true);
    contractList()
      .then((response) => response)
      .then((response) => {
        setData(response.data.contract_data_metrices);
        setIsLoading(false);
      });
  };

  return (
    <div id="ctcard">
      <div id="nav">Contract Tracker</div>
      <div className="ctlist_tableContainer">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <table id="table">
            <tbody>
              <tr>
                 <th>Contract Name</th>
                 <th>Primary terminal</th>
                 <th>Supplier</th>
                 <th>Product</th>
                 <th>Product Type</th>
                 <th>Product List</th>
                 <th>Start date</th> 
                 <th>End date</th>
                 <th>Volume</th>
                 <th>WIP</th>
              </tr>
              {contractDatalist?.map((item, index) => (
                <tr key={index}>
                  <td className="contractData_table" onClick={navigateTocard}>{item.contract_name}</td>
                  <td className="contractData_table" onClick={navigateTocard}>{item.primary_terminal}</td>
                  <td className="contractData_table" onClick={navigateTocard}>{item.supplier}</td>
                  <td className="contractData_table" onClick={navigateTocard}>{item.product_group}</td>
                  <td className="contractData_table" onClick={navigateTocard}>{item.product_type}</td>
                  <td className="contractData_table" onClick={navigateTocard}>{item.product_list}</td>
                  <td className="contractData_table" onClick={navigateTocard}>{new Date(item.start_date).toLocaleDateString()}</td>
                  <td className="contractData_table" onClick={navigateTocard}>{new Date(item.end_date).toLocaleDateString()}</td>
                  <td onClick={navigateTocard}>{item.committed_volume}</td>

                  <td className="circle" style={{ textAlign: "center" }}>
                    <Button
                      // onClick={() => handeClick(item.batch_id)}
                      // style={{backgroundColor:'red'}}
                      onClick={navigateTosc}
                      className="wipbutton"
                      id="wipbutton"
                    >
                       
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ContractTracker;