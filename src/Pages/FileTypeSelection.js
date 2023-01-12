import React, { useState, useEffect, useRef } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useLocation } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


const FileTypeSelection = () => {
    const [value, setValue] = React.useState("");
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const navigate = useNavigate();
    const state = useLocation();

    function handeClick() {
        navigate("/FilePrecheck", { state: { url: state.state.url, fileName: state.state.fileName, fileType: value } })
    }

    return (
        <>
            <div id="card" style={{ height: '800px' }}>
                <div id='nav'>
                ETL Working Progress
                </div>               
                <FormControl>
                <h3 >Choose File Type</h3>
                    {/* <FormLabel >Choose File Type</FormLabel> */}
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="Spot-Opis" control={<Radio />} label="Spot-Opis"  onChange={handleChange}/>
                        <FormControlLabel value="Spot-Platts" control={<Radio />} label="Spot-Platts" onChange={handleChange}/>
                        <FormControlLabel value="Rack-Opis" control={<Radio />} label="Rack-Opis" onChange={handleChange}/>                       
                    </RadioGroup>
                </FormControl><br />
                <button style={{ marginTop: "50px" }} onClick={() => handeClick()}>Next</button>
            </div>
        </>
    )
}

export default FileTypeSelection;
