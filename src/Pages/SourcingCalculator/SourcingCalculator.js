import React, { Component } from "react";
import "./sourcingcalculator.css";
import { useMediaQuery } from "react-responsive";
// import { useMediaQuery } from '@mui/material';
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { makeStyles } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LineChart from "./Chart";

//for table item
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//stepper component
const steps = [
  "Contract Review",
  "Analysis Dates",
  "Volume and Product Split",
  "Index Review",
  " step Confirmation",
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function createData(name, volume, Completeness) {
  return { name, volume, Completeness };
}

const rows = [
  createData("Start Date", 159),
  createData("End Date", 237),
  createData("Days", 262),
  createData("Volume", 305),
  createData("Regular", 356),
  createData("Premium", 356),
];
const rows2 = [
  createData("Plats NYH Reg", 159, 3),
  createData("Plats NYH prem", 237, 4),
  createData("OPIS CHI Eth", 262, 5),
  createData("OPIS USA RIN", 305, 2),
];

const SourcingCalculator = () => {
  const isDesktopOrLaptop = useMediaQuery(
    { minDeviceWidth: 1224 },
    { deviceWidth: 1600 } // `device` prop
  );
  //dropdown menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div class="card">
      {isDesktopOrLaptop && (
        <>
          <div className="row">
            <div style={{ display: "flex" }}>
              <div style={{width:'30%'}}>
                <div className="button_style">
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Pittsburgh
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      Pittsburgh
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      Atlanta,GA
                    </MenuItem>
                  </StyledMenu>
                </div>
              </div>
              <div style={{width:'50%'}}>
                <h1 style={{margin:'0px'}}>WIP PITT GAS CONTRACT BID 2022</h1>
              </div>
              <div style={{width:'30%', }}>
              
               <button>
               SENSITIVITY ANALYSIS VIEW
               </button>

               {/* <div className="sc_container">
               <div className="toggle-switch">
                    <input type="checkbox" className="checkbox" />
                    <label className="label">
                      <span className="inner" />
                      <span className="switch" />
                    </label>
                  </div>
               </div> */}

               {/* <button style={{background:'white'}}> */}
               <img
                              style={{ height: '38px',marginBottom:'-15px'}}
                              src={require("../../Assets/Icons/magicbutton.png")}
                              alt="icon"
                            />
               {/* </button> */}
               <button>
                Add New
               </button>
              </div>
            </div>
            {/* <div style={{ display: "flex", width: "30%" }}>
              <div>
                <div className="button_style">
                  <Button
                    id="demo-customized-button"
                    aria-controls={open ? "demo-customized-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Pittsburgh
                  </Button>
                  <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      "aria-labelledby": "demo-customized-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} disableRipple>
                      Pittsburgh
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                      Atlanta,GA
                    </MenuItem>
                  </StyledMenu>
                </div>
              </div>
              <div style={{ float: "center", width: "30%" }}>
                <div className="bid">WIP PITT GAS CONTRACT BID 2022</div>
              </div>
              <div style={{ float: "right", width: "50%",display:'flex' }}>
                <Button id="sensitivity_button">
                  SENSITIVITY ANALYSIS VIEW
                </Button>
                <div className="sc_container">
                  <div className="toggle-switch">
                    <input type="checkbox" className="checkbox" />
                    <label className="label">
                      <span className="inner" />
                      <span className="switch" />
                    </label>
                  </div>
                </div>
                <div>
                  <img
                    style={{ height: "25px", width: "25px" }}
                    src={require("../../Assets/Icons/downloadImage.png")}
                    alt="icon"
                  />
                </div>

                <Button id="add_new_button">Add New</Button>
              </div>
            </div> */}
          </div>

          <div id="setup">
            <Accordion className="head">
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {<ExpandMoreIcon />}
                <Typography className="head1"> Analysis Setup</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box sx={{ width: "100%" }}>
                    <Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={6} md={4}>
                        <Item>
                          <div className="head">
                            Volume for Sourcing Calculator
                          </div>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 80 }}
                              size="small"
                              aria-label="a dense table"
                            >
                              <TableHead></TableHead>
                              <TableBody>
                                {rows.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="tc"
                                    >
                                      {row.name}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.volume}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Item>

                        <Item>
                          <div className="head">Index Library </div>
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ minWidth: 80 }}
                              size="small"
                              aria-label="a dense table"
                            >
                              <TableHead>
                                <TableRow className="table_row">
                                  <TableCell>Index</TableCell>
                                  <TableCell>Average</TableCell>
                                  <TableCell>Completeness&nbsp;(g)</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rows2.map((row) => (
                                  <TableRow
                                    key={row.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell
                                      component="th"
                                      scope="row"
                                      className="tc"
                                    >
                                      {row.name}
                                    </TableCell>
                                    <TableCell>{row.volume}</TableCell>
                                    <TableCell>{row.Completeness}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Item>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Item id="ch">
                          <div className="head">Weekly Volume Curve</div>
                          <LineChart />
                        </Item>
                      </Grid>
                      <Grid item xs={6} md={4}>
                        <Item id="ch">
                          {" "}
                          <div className="head">Montly Volume Curve</div>
                          <LineChart />
                        </Item>
                      </Grid>
                    </Grid>
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div id="setup">
            <Accordion className="head">
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {<ExpandMoreIcon />}
                <Typography className="head1"> Bid Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box sx={{ width: "100%" }}>
               
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div id="setup">
            <Accordion className="head">
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {<ExpandMoreIcon />}
                <Typography className="head1"> Normilization</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box sx={{ width: "100%" }}>
                
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div id="setup">
            <Accordion className="head">
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {<ExpandMoreIcon />}
                <Typography className="head1">Results</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Box sx={{ width: "100%" }}>
                  
                  </Box>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      )}
    </div>
  );
};

export default SourcingCalculator;
