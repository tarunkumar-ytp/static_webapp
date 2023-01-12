import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { add_holidays } from "../../Api/QCCheckService";

import "./qcchecks.css";
import { Sparklines, SparklinesLine } from "react-sparklines";
import MicroBarChart from "react-micro-bar-chart";
import moment from "moment";
import LoadingSpinner from "../../Components/Spinner/Spinner";
import Swal from "sweetalert2";
import {FiEdit} from "react-icons/fi"; 
// import * as d3 from "d3";
import "chart.js/auto";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

export default function Outlier() {
  const [data, setData] = useState([]);
  const [hasError, setErrors] = useState(false);
  const [graph, setGraph] = useState(false);
  const [oulierData, setOutlierData] = useState([]);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [indexCodeData, setIndexCodeData] = useState(false);
  const [priceData, setPriceData] = useState([]);
  const [dateData, setDateData] = useState([]);
  const [finalDateArray, setFinalDateArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState({ column: null, direction: "desc" });
  const [deleteOutlier,setDeleteOutlier] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [masterChecked,setMasterChecked] = useState(false);
  const [bar,setBar] = useState([]);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
});

const [price, setPrice] = useState(null);
const [en_date, setEn_Date] = useState(null);
const { state } = useLocation()

  const finalDateArr = [];
  useEffect(() => {
    getOutliersData();
    // getPriceDateData("PL-C-UG-AARQU00-CBOB87");
  }, []);
  const navigate = useNavigate();

  const getOutliersData = () => {
    console.log("......")
    fetch("http://localhost:8000/api/get_outlier")
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        res.map((outlier_index_code, index) => {
          console.log('index in 60 line', index)
          getPriceDateData(outlier_index_code.index_code, index).then(
            (resData) => {
              setPriceData(resData);
              const barArray = [];
              const sparkArray = [];
              for (const dataObj of resData) {
                barArray.push(dataObj.en_date);
                sparkArray.push(dataObj.price);
              }
              res[index].sparkChartData = sparkArray;
              console.log('123', barChart(barArray));
              res[index].barChartData = barChart(barArray);
              console.log('456', res[index].barChartData);
            }
          );
        });
      })
      .catch(() => setErrors(true));
  };

  const fetchData = (index_code, index) => {
    console.log(index_code,"1111")
    // let indexCode = encodeURI(index_code);
    // console.log(indexCode)
    if (index_code != undefined) {
      return new Promise((resolve, reject) =>
        fetch(`http://localhost:8000/api/get_price_day?index_code=${index_code}`)
          .then((res) => res.json())
          .then((res) => {
            console.log(res,"2222222222")
            resolve(res);
          })
          .catch((err) => reject(err))
      );
    }
  };

  async function getPriceDateData(index_code, index) {
    console.log(index_code)
    let indexCode = encodeURI(index_code);

    const f = await fetchData(indexCode);
    console.log(f,"fffffffffff")
    return f;
  }

  const barChart = (date) => {
    date.sort();
    const dateArr = [];
    const finalDate = [];
    var currentDate = moment(date[0]).format("YYYY-MM-DD");
    let endDate = moment(date[date.length - 1]).format("YYYY-MM-DD");
    while (currentDate <= endDate) {
      dateArr.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days").format("YYYY-MM-DD");
    }

    setFinalDateArray(finalDateArr);

    for (var i = 0; i < dateArr.length; i++) {
      if (date.includes(dateArr[i])) {
        finalDate.push(30);
      } else {
        finalDate.push(0);
      }
    }
    return finalDate;
  };

 
  const handle_outlier_analysis = (code) => {
    data.map(async (item) => {
      if (code === item.index_code) {
        const fetch = await fetchData(item.index_code);
        setDateData(fetch) 
      }
    });
    setIndexCodeData(true);
  };
  const onSort = (column) => (event) => {
    console.log("onSort clicked!");
    const direction = sort.column
      ? sort.direction === "asc"
        ? "desc"
        : "asc"
      : "desc";

    const sortedData = data.sort((a, b) => {
      if (column === "MinPrice") {
        const nameA = a.MinPrice;
        const nameB = b.MinPrice;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      } else {
        return a.MaxPrice - b.MaxPrice;
      }
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    setData(sortedData);
    setSort({ column, direction });
  };
  const checkedItems =[];
  const onItemCheck = (e, item) => {
    checkedItems.push(item.id)
  };
  const onMasterCheck=(value) =>{
    console.log(dateData)
    dateData.forEach(d => (d.selected = value.target.checked));
    setDateData(dateData)
    // this.setState({ fruites: fruites });
    // setMasterChecked(true)
console.log(value)}
    // let tempList = this.state.List;
    // // Check/ UnCheck All Items
    // tempList.map((user) => (user.selected = e.target.checked));
 
  const deleteOutliers=()=>{
    console.log(checkedItems)
    Swal.fire({
      title: "Are you sure to delete the checked records",
      icon: "warning",
      iconColor: 'yellow',
      confirmButtonText: "OK",
      confirmButtonColor: "#2BA0C4",
      cancelButtonText:"Cancel",
      showCancelButton: true,
      
    }).then((res) => {
      if(res.isConfirmed){
        axios.delete('http://127.0.0.1:8000/api/delete_pric_day', {data:checkedItems})
        .then(function(response){
           console.log("success",dateData)
           Swal.fire({title:"Deleted Successfully"})
        })
        .catch(function(error){
          console.log("error")
          console.log(error);
        })
      }
     


   
    });
  }

  const editOutliers=(id,price,en_date)=>{
    console.log(id)
    Swal.fire({
      title: "Are you sure to edit the checked records",
      icon: "warning",
      iconColor: 'yellow',
      confirmButtonText: "OK",
      confirmButtonColor: "#2BA0C4",
      cancelButtonText:"Cancel",
      showCancelButton: false,
      
    }).then((res) => {
      console.log("res")
      // if(isConfirm === true) {
        axios.put('http://127.0.0.1:8000/api/edit_pric_day',
        {
          id:id,
          price:price,
          en_date:en_date
          })
        .then(function(response){
           console.log(response)
           console.log("success",dateData)
           Swal.fire({title:"Edited Successfully"}).then((res)=>{setInEditMode({
            status: false,
            rowKey: null
        })})
        })
        .catch(function(error){
          console.log("error")
          console.log(error);
        })
      // }
      
      


   
    });
  }
  const onSave = ({id, price,en_date}) => {
    console.log(id,price,en_date)
    editOutliers({id, price,en_date});
}
const onEdit = ({id, currentUnitPrice,current_date}) => {
  setInEditMode({
      status: true,
      rowKey: id
  })
  setPrice(currentUnitPrice);
  setEn_Date(current_date)
}
// const handleClickEditRow = (rowIndex) => {
//   setTableData(prev => prev.map((r, index) => ({...r, isEditing: rowIndex === index})))
// }
function handeClickBack(id) {
  navigate("/qcmonthlydata", { state: id });
}
function addHolidays(id) {
  console.log(id, "id")
  add_holidays(state)
      .then((response) => response)
      .then((qc_two_data) => {
        navigate("/qcthree", { state: id })
          Swal.fire({
              title: "Holidays / Missing days added successfully",
              icon: "success",
              iconColor: '#68992F',
              confirmButtonText: "OK",
              confirmButtonColor: "#2BA0C4",
          }).then(function () {
              setData(qc_two_data.data);
              
          });
      });
}
const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
        status: false,
        rowKey: null
    })
    // reset the unit price state value
    setPrice(null);
}
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div id="qccard">
          <div id="nav">QA Analysis</div>
          {!indexCodeData
            ? 
              (
                <div>
                <div className="outlier_tableContainer">
                  <table id="table">
                    <tbody>
                      <tr>
                        <th>Index Code</th>
                        <th onClick={onSort("MinPrice")}>
                          Min Price
                          <span className="arrow" />
                        </th>
                        <th onClick={onSort("MaxPrice")}>
                          Max Price <span className="arrow" />
                        </th>
                        <th>Sparkline Graph</th>
                        <th>Bar Chart</th>
                      </tr>
                      {console.log('data in 302', data)}
                      {data.map((item, index) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={index}
                          onClick={() => handle_outlier_analysis(item.index_code)}
                        >
                          <td style={{ textAlign: "left" }}>
                            {item.index_code}
                          </td>

                          <td style={{ textAlign: "left" }}>
                            {item.min_price}{" "}
                          </td>
                          <td style={{ textAlign: "left" }}>
                            {item.max_price}{" "}
                          </td>
                          <td style={{ textAlign: "left" }}>

                            <Sparklines
                              data={item.sparkChartData}
                              limit={50}
                              width={140}
                              height={6}
                              margin={0}
                            >
                              <SparklinesLine
                                style={{ fill: "none" }}
                                color="blue" />
                            </Sparklines>
                          </td>
                          <td style={{ textAlign: "left" }}>

                            {item.barChartData && <MicroBarChart
                              // data= {bar}
                              data={item.barChartData}
                              limit={7}
                              width={140}
                              height={60}
                              margin={1}
                              barTh
                            ></MicroBarChart>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> <div style={{ marginTop: '1%' }}>
                  {/* onClick={handeClickBack} onClick={() => addHolidays(state)} */}
                <button>
                    Back
                </button>
                <button onClick={() => addHolidays(state)}>
                    Add Holidays
                </button>
                
            </div>
                  </div>
              )
            : 
              (
                <div>
                  <div>
                  <p style={{ fontWeight: 700 }}>
                    Run to Calculate MIN and MAX value
                  </p>
                  <button id="outlier-delete-button"onClick={() => deleteOutliers()} >Delete</button>
                    </div>
                  
                  <div className="outlier_tableContainer">
                    <table id="table">
                      <tbody>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              // checked={setMasterChecked}
                              id="mastercheck"
                              onChange={(e) => onMasterCheck(e)}
                              value="checkedall"
                            />
                          </th>
                          <th>Index Code</th>
                          <th>Price</th>
                          <th>Day</th>
                          <th>Action</th>
                        </tr>

                        {dateData.map(
                          (item, index) => (

                            (
                              console.log(item.selected),
                              <tr key={index}>
                                <td scope="row">
                                  <input
                                    type="checkbox"
                                    checked={item.selected}
                                    className="form-check-input"
                                    id="rowcheck{item.id}"
                                     onChange={(e) => onItemCheck(e, item)}
                                  />
                                </td>

                                <td style={{ textAlign: "left" }}>
                                  {item.index_code}
                                </td>
                                <td style={{ textAlign: "left" }}>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={price}
                                               onChange={(event) => setPrice(event.target.value)}
                                        />
                                    ) : (
                                        item.price
                                    )
                                }
                                </td>
                                <td style={{ textAlign: "left" }}>
                                {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                        <input value={en_date}
                                               onChange={(event) => setEn_Date(event.target.value)}
                                        />
                                    ) : (
                                        item.en_date
                                    )
                                }
                                </td>
                                <td>
                                  {/* <FiEdit onClick={() => editOutliers()} name="FiEdit"/> */}
                                  {
                                    inEditMode.status && inEditMode.rowKey === item.id ? (
                                      <div>
                                            <button
                                                className={"btn-success"}
                                                onClick={() => onSave({id: item.id, price: price,en_date:en_date})}
                                            >
                                                Save
                                            </button>

                                            <button
                                                className={"btn-secondary"}
                                               
                                                onClick={() => onCancel()}
                                            >
                                                Cancel
                                            </button>
                                            </div>
                                    ) : (
                                        <button
                                            className={"btn-primary"}
                                            onClick={() => onEdit({id: item.id, currentUnitPrice: item.price,current_date:item.en_date})}
                                              // onEdit({id: item.id, currentUnitPrice: item.price})}
                                        >
                                            Edit
                                        </button>
                                    )
                                }
                                  </td>
                              </tr>
                            )
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
        </div>
      )}
    </>
  );
}
