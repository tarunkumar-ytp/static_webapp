import axios from "axios";
import service from "../Service";

export const add_holidays = async (batch_id) => {
    return axios
        .post(service.baseUrl + "/api/qc2addholidays?batch_id=" + batch_id, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            validateStatus: function (status) {
                return status < 500;
            },
        }
        )
        .then((response) => {
            console.log(response);
            return response;
        });
};

export const deleteDuplicates = async (batch_id) => {
    return axios
        .delete(
            service.baseUrl +
            "/api/deleteDuplicates?batch_id=" +
            batch_id,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                validateStatus: function (status) {
                    return status < 500;
                },
            }
        )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            throw err;
        });
};

export const get_metrices = async (batch_id) => {
    return axios
        .get(
            service.baseUrl +
            "/api/getQcMetrixData?batch_id=" +
            batch_id,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                validateStatus: function (status) {
                    return status < 500;
                },
            }
        )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            throw err;
        });
};

export const getfileData = async (batch_id) => {
    console.log(batch_id)
    return axios
        .get(
            service.baseUrl +
            "/api/file?batch_id=" +
            batch_id,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                validateStatus: function (status) {
                    return status < 500;
                },
            }
        )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            throw err;
        });
};

export const filesList = async () => {
    return axios
        .get(
            service.baseUrl +
            "/api/files-data",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // "Ocp-Apim-Subscription-Key": "2bfaefdb27184e3584fa1848e4619075",
                    // "Access-Control-Allow-Origin":  "*",



                },
                validateStatus: function (status) {
                    return status < 500;
                },
            }
        )
        .then((response) => {
            return response;
        })
        .catch((err) => {
            throw err;
        });
};

export const add_metrics = async (final_data) => {
    return axios
        .post(service.baseUrl + "/api/post_metrics", final_data,{
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            validateStatus: function (status) {
                return status < 500;
            },
        }
        )
        .then((response) => {
            console.log(response);
            return response;
        });
};
