import axios from "axios";
import service from "../Service";

export const importData = async (data) => {
    axios.get(state)
    return axios
    .post(service.baseUrl + "/api/import-data", data, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        validateStatus: function (status) {
            return status < 500;
        },
    }).then((response) => {
        return response;
    })
}

export const getExcelData = async (data) => {
    return axios.get(data).then((response) => {
        return response
    })
}