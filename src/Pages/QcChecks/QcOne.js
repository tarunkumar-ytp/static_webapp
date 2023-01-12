import React, { useState, useEffect } from "react";
import './qcchecks.css'
import { useNavigate, useLocation } from "react-router-dom";
import { getfileData } from '../../Api/QCCheckService';
import { deleteDuplicates } from '../../Api/QCCheckService';
import LoadingSpinner from '../../Components/Spinner/Spinner'
import Swal from "sweetalert2";

function QcOne() {

    const [qc_one_data, setData] = useState([]);
    const { state } = useLocation();
    const [nextButton, setNextButton] = useState(false);
    const [removeButton, setRemoveButton] = useState(true);
    useEffect(() => {
        console.log(state, "state")
        getFileData();
    }, [removeButton]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const getFileData = () => {
        setIsLoading(true);
        getfileData(
            state)
            .then((response) => response)
            .then((qc_one_data) => {
                console.log(qc_one_data.data, "*************");
                setData(qc_one_data.data);
                setIsLoading(false);
            });

    };

    function deleteDuplicateData(id) {
        console.log(id, "id")
        deleteDuplicates(state)
            .then((response) => response)
            .then((qc_one_data) => {

                console.log(qc_one_data.data, "*************");
                Swal.fire({
                    title: "Duplicates removed successfully",
                    icon: "success",
                    iconColor: '#68992F',
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2BA0C4",
                }).then(function () {
                    setData(qc_one_data.data);
                    setNextButton(true);
                    setRemoveButton(false)
                    // navigate("/qctwo", { state: id })
                });



            });
    }
    function handeClickBack() {
        navigate("/files")
    }
    function handleClickNext(id){
        console.log("move to next")
        navigate("/qctwo", { state: id})
    }
    return (
        <>
            <div id="qccard">
                <div id='nav'>
                    Quality Check -1 (Remove Duplicates)
                </div>
                <div id="rowCount"><b>TOTAL ROWS : {qc_one_data.total_rows}</b></div>
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
                                    qc_one_data.file_records?.map((item, index) => (
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
                    {removeButton ?
                        <button onClick={() => deleteDuplicateData(state)} >
                            Remove Duplicates
                        </button> :
                        <button style={{ backgroundColor: "gray" }} >
                            Remove Duplicates
                        </button>
                    }
                    {
                        nextButton ? (
                            <button onClick={() => handleClickNext(state)} >
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
        </>
    )
}

export default QcOne