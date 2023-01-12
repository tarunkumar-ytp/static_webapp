import React, { useState, useEffect } from "react";
import './qcchecks.css'
import { useNavigate, useLocation } from "react-router-dom";
import { getfileData } from "../../Api/QCCheckService";
import { add_holidays } from "../../Api/QCCheckService";
import LoadingSpinner from '../../Components/Spinner/Spinner'
import Swal from "sweetalert2";

function QcTwo() {
    const [qc_two_data, setData] = useState([]);
    // const [data, setData] = useState([]);
    const { state } = useLocation()
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log(state, "state")
        getFileData();
    },[]);
    const navigate = useNavigate();
    const getFileData = () => {
        setIsLoading(true);
        getfileData(
            state)
            .then((response) => response)
            .then((qc_two_data) => {
                console.log(qc_two_data.data, "*************");
                setData(qc_two_data.data);
                setIsLoading(false);
            });

    };
    function addHolidays(id) {
        console.log(id, "id")
        add_holidays(state)
            .then((response) => response)
            .then((qc_two_data) => {

                Swal.fire({
                    title: "Holidays / Missing days added successfully",
                    icon: "success",
                    iconColor: '#68992F',
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2BA0C4",
                }).then(function () {
                    setData(qc_two_data.data);
                    navigate("/qcthree", { state: id })
                });
            });
    }
    function handeClickBack() {
        navigate("/qcone")
    }
    return (
        <div id="qccard">
            <div id='nav'>
                QC Analysis-2
            </div>
            <div id="rowCount"><b>TOTAL ROWS : {qc_two_data.total_rows}</b></div>
            <div className="tableContainer">
                {isLoading ? <LoadingSpinner /> : (
                    <table id='table'>
                        <tbody>
                            <tr>
                                <th>Index Code</th>
                                <th>Index Price</th>
                                <th>Index Units</th>
                                <th>Effective Date</th>
                                <th>Date</th>
                            </tr>
                            {
                                qc_two_data.file_records?.map((item, index) => (

                                    <tr key={index}>
                                        <td style={{ textAlign: 'left' }}>{item.index_code}</td>
                                        <td style={{ textAlign: 'left' }}>{item.price} </td>
                                        <td style={{ textAlign: 'left' }}>{item.units} </td>
                                        <td style={{ textAlign: 'left' }}>{item.en_date} </td>
                                        <td style={{ textAlign: 'left' }}>{item.effective_date_time} </td>

                                    </tr>
                                )
                                )}
                        </tbody>
                    </table>
                )}
            </div>
            <div style={{ marginTop: '1%' }}>
                <button onClick={handeClickBack} >
                    Back
                </button>
                <button onClick={() => addHolidays(state)} >
                    Add Gaps
                </button>
                <button onClick={() => addHolidays(state)} >
                    Next
                </button>
            </div>
        </div>

    );
}

export default QcTwo

