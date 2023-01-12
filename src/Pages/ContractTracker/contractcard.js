import React, { useState, useEffect } from "react";
import { NavItem } from "react-bootstrap";
import { contractList } from "../../Api/ContractService";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function ContractCard() {
  return (
    <>
      <div id="ctcard">
        <div id="nav">Contract Card</div>

        <div id="contractinfo-card">
          <div id="contractinfo-card-header">
            Contract Name : Pittsburgh PA BP Gas
          </div>
         
          {/* style={{ width: "50%", textAlign: "left", marginLeft: "1%" }} */}
          <div className="row" style={{ display: "flex" }}>
            <div className="col-sm-4" style={{ width: "50%", textAlign: "left", marginLeft: "1%" }}>
              <div className="row" style={{display:"flex"}}>
                <div className="col" style={{ width: "25%",}}>
                  <h5>Parent Contract</h5>
                  <h5>Terminal Market</h5>
                  <h5>Supplier</h5>
                  <h5>Primary Terminal</h5>
                  <h5>Secondary Terminal</h5>
                  <h5>Product Category</h5>
                  <h5>With Notes</h5>
                  <h5>Historical Contract Analysis</h5>
                </div>
                <div className="col" style={{ width: "5%",}}>
                  <h5>:</h5> <h5>:</h5> <h5>:</h5> <h5>:</h5> <h5>:</h5> <h5>:</h5><h5>:</h5><h5>:</h5> 

                </div>
               
                <div className="col" style={{ width: "70%",}}>
                  <h5>BP Gas</h5>
                  <h5>Pittsburgh PA</h5>
                  <h5>BP</h5>
                  <h5>BK Coraopolis</h5>
                  <h5>LHT Coraopolis</h5>
                  <h5>Gasoline</h5>
                  <h5 id="card_text">This contract is the contract we like to use in our
                figma examples. Notes, might have commas or em -- and other
                $pᵝcial characters.</h5>
                <h5>CLICK THRU LINK TO DL Location
                (with option to open?)</h5>
                </div>
              </div>
              {/* <h5>Parent Contract : BP Gas </h5>
              <h5>Terminal Market : Pittsburgh PA</h5>
              <h5>Supplier : BP </h5>
              <h5>Primary Terminal : BK Coraopolis</h5>
              <h5>Secondary Terminal : LHT Coraopolis</h5>
              <h5>Product Category : Gasoline </h5>
              <h5>
                With Notes : This contract is the contract we like to use in our
                figma examples. Notes, might have commas or em -- and other
                $pᵝcial characters.{" "}
              </h5>
              <h5>
                Historical Contract Analysis : CLICK THRU LINK TO DL Location
                (with option to open?){" "}
              </h5> */}
            </div>
            <div className="col-sm-4" style={{ width: "50%", textAlign: "left", marginLeft: "1%" }}>
            <div className="row" style={{display:"flex"}}>
                <div className="col" style={{ width: "25%",}}>
                  <h5>Product List</h5>
                  <h5>Committed Volume</h5>
                  <h5>Start Date</h5>
                  <h5>End Date</h5>
                  <h5>Last Change</h5>
                  <h5>Last Negotiated By</h5>
                  <h5>Current WIP</h5>
                  <h5>Home System Code</h5>
                  <h5>Copy of Contract on File</h5>
                </div>
                <div className="col" style={{ width: "5%",}}>
                  <h5>:</h5> <h5>:</h5> <h5>:</h5> <h5>:</h5> <h5>:</h5> <h5>:</h5><h5>:</h5><h5>:</h5> <h5>:</h5> 

                </div>
               
                <div className="col" style={{ width: "70%",}}>
                  <h5>87E10, 93E10</h5>
                  <h5>15,00,0000</h5>
                  <h5>8/15/2021</h5>
                  <h5>8/14/2022</h5>
                  <h5>7/14/2022</h5>
                  <h5>Employee Name</h5>
                  <h5>CLICK THRU LINK TO WIP DL location (with option to
                open?)</h5>
                <h5>THIS_IS the link they need to connect this to
                their system</h5>
                <h5 id="card_text">Link to the .pdf file they load into
                blob storage, if they loaded a scan of it.</h5>
                </div>
              </div>




              {/* <h5>Product List : 87E10, 93E10</h5>
              <h5>Committed Volume : 15,00,0000</h5>
              <h5>Start Date : 8/15/2021</h5>
              <h5>End Date : 8/14/2022</h5>
              <h5>Last Change : 7/14/2022</h5>
              <h5>Last Negotiated By : Employee Name</h5>
              <h5>
                Current WIP : CLICK THRU LINK TO WIP DL location (with option to
                open?)
              </h5>
              <h5>
                Home System Code : THIS_IS the link they need to connect this to
                their system{" "}
              </h5>
              <h5>
                Copy of Contract on File : Link to the .pdf file they load into
                blob storage, if they loaded a scan of it.{" "}
              </h5> */}
            </div>
          </div>
        </div>

        <div className="products_main_card">
          <div id="productinfo-card">
            <div id="contractinfo-card-header">
              Product Name : 87E10 | Product Line Items : Regular | Last Updated
              Date : 7/14/2022 | TERMINAL SWITCH DATES : NONE
            </div>
            <div className="row" style={{ display: "flex" }}>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  Line Items
                </div>
                <h5>Ethanol </h5>
                <h5>RINS</h5>
                <h5>Product</h5>
              </div>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  INDEX DISPLAY NAME
                </div>
                <h5>OPIS CHI ETH </h5>
                <h5>OPIS USA RIN</h5>
                <h5>Platts NYH REG </h5>
              </div>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  DIFF or PERCENT
                </div>
                <h5>0 </h5>
                <h5>75%</h5>
                <h5>0.07 </h5>
              </div>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  Percent Ethanol
                </div>
                <h5> 10%</h5>
                <h5></h5>
                <h5></h5>
              </div>
            </div>
          </div>
          <div id="productinfo-card">
            <div id="contractinfo-card-header">
              Product Name : 87E10 | Product Line Items : Regular | Last Updated
              Date : 7/14/2022 | TERMINAL SWITCH DATES : NONE
            </div>
            <div className="row" style={{ display: "flex" }}>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  Line Items
                </div>
                <h5>Ethanol </h5>
                <h5>RINS</h5>
                <h5>Product</h5>
              </div>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  INDEX DISPLAY NAME
                </div>
                <h5>OPIS CHI ETH </h5>
                <h5>OPIS USA RIN</h5>
                <h5>Platts NYH REG </h5>
              </div>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  DIFF or PERCENT
                </div>
                <h5>0 </h5>
                <h5>75%</h5>
                <h5>0.07 </h5>
              </div>
              <div
                style={{ width: "30%", textAlign: "center", marginTop: "1%" }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "large",
                    fontWeight: "bold",
                    marginTop: "1px",
                  }}
                >
                  Percent Ethanol
                </div>
                <h5> 10%</h5>
                <h5></h5>
                <h5></h5>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="ctinnercard">
          <div
            style={{
              textAlign: "center",
              fontSize: "large",
              fontWeight: "bold",
              padding:'5px'
            }}
          >
            Contract Name : Pittsburgh PA BP Gas
          </div>
          <hr id="ctcardline" />
          <div className="row" style={{ display: "flex" }}>
            <div style={{ width: "50%", textAlign: "left", marginLeft: "1%" }}>
              <h5>Parent Contract : BP Gas </h5>
              <h5>Terminal Market : Pittsburgh PA</h5>
              <h5>Supplier : BP </h5>
              <h5>Primary Terminal : BK Coraopolis</h5>
              <h5>Secondary Terminal : LHT Coraopolis</h5>
              <h5>Product Category : Gasoline </h5>
              <h5>
                With Notes : This contract is the contract we like to use in our
                figma examples. Notes, might have commas or em -- and other
                $pᵝcial characters.{" "}
              </h5>
              <h5>
                Historical Contract Analysis : CLICK THRU LINK TO DL Location
                (with option to open?){" "}
              </h5>
            </div>
            <div style={{ width: "50%", textAlign: "left" }}>
              <h5>Product List : 87E10, 93E10</h5>
              <h5>Committed Volume : 15,00,0000</h5>
              <h5>Start Date : 8/15/2021</h5>
              <h5>End Date : 8/14/2022</h5>
              <h5>Last Change : 7/14/2022</h5>
              <h5>Last Negotiated By : Employee Name</h5>
              <h5>
                Current WIP : CLICK THRU LINK TO WIP DL location (with option to
                open?)
              </h5>
              <h5>
                Home System Code : THIS_IS the link they need to connect this to
                their system{" "}
              </h5>
              <h5>
                Copy of Contract on File : Link to the .pdf file they load into
                blob storage, if they loaded a scan of it.{" "}
              </h5>
            </div>
          </div>
          <hr id="ctcardline" />
          <div id="ctsubinnercard">
          <div
            style={{
              textAlign: "center",
              fontSize: "large",
              fontWeight: "bold",
              padding:'10px'
            }}
          >
            Product Name : 87E10 | Product Line Items : Regular | Last Updated
            Date : 7/14/2022 | TERMINAL SWITCH DATES : NONE
          </div>
          <hr id="ctcardline" />
          <div className="row" style={{ display: "flex" }}>
            <div style={{ width: "30%", textAlign: "center", marginTop: "2%" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "large",
                  fontWeight: "bold",
                  marginTop: "1px",
                }}
              >
                Line Items
              </div>
              <h5>Ethanol </h5>
              <h5>RINS</h5>
              <h5>Product</h5>
            </div>
            <div style={{ width: "30%", textAlign: "center", marginTop: "2%" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "large",
                  fontWeight: "bold",
                  marginTop: "1px",
                }}
              >
                INDEX DISPLAY NAME
              </div>
              <h5>OPIS CHI ETH </h5>
              <h5>OPIS USA RIN</h5>
              <h5>Platts NYH REG </h5>
            </div>
            <div style={{ width: "30%", textAlign: "center", marginTop: "2%" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "large",
                  fontWeight: "bold",
                  marginTop: "1px",
                }}
              >
                DIFF or PERCENT
              </div>
              <h5>0 </h5>
              <h5>75%</h5>
              <h5>0.07 </h5>
            </div>
            <div style={{ width: "30%", textAlign: "center", marginTop: "2%" }}>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "large",
                  fontWeight: "bold",
                  marginTop: "1px",
                }}
              >
                Percent Ethanol
              </div>
              <h5> 10%</h5>
              <h5></h5>
              <h5></h5>
            </div>
          </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
export default ContractCard;
