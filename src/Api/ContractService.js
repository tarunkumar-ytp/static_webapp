import axios from "axios";
import service from "../Service";

export const contractList = async () => {
  console.log("....");
  console.log(service.baseUrl + "/api/get_contract_list");
  return axios
    .get(
      service.baseUrl + "/api/get_contract_list",

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        validateStatus: function (status) {
          return status < 500;
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
