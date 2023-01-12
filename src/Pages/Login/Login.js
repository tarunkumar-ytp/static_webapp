
import React, { Component, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { Card, Button } from "react-bootstrap";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { config, authenticationParameters } from "../../Config";

const Login = () => {

  const navigate = useNavigate();
  const ClientApplication = new PublicClientApplication(config);
  const login = () => {
    try {
      ClientApplication.loginPopup({
        authenticationParameters,
        prompt: "select_account"
      }).then(response => {
        console.log(response)
        console.log("response : ", response.account)
        navigate("/Etl")
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (

    // <div className="col-lg-6 justify-content-center" id="login-card">
    //   <div className="">
    //     <img
    //       className="Logo"
    //       src={require("../../Assets/Images/logo.png")}
    //       alt="logo"
    //     />
    //   </div>
    //   <div className="">
    //     <h3 id="header_text">Welcome to Login Page</h3>
    //   </div>
    //   <div className="card-footer text-muted">
    //     <Button id="login_button" onClick={() => login()}>Login</Button>
    //   </div>
    // </div>
    <div className="container">
    <Card id="loginCard">
      <div id="divCard">
      <Card.Img id="img-logo" variant="top" src={require("../../Assets/Images/logo.png")} />
      <Card.Body>
        <h2>Welcome to EN-SSI</h2>

      </Card.Body>
      <Card.Body>
        <Button id="login_button" onClick={() => login()}>Login</Button>
      </Card.Body>
      </div>
    </Card>
    </div>

  );
}

export default Login;