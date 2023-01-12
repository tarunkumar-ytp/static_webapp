import axios from "axios";
import service from "../Service";

export const dataPrecheck = async (data) => {
    return axios
        .post(service.baseUrl + "/api/file-data-precheck",data, {
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
        });
};

export const getPointedData = async (data) => {
    return axios
        .post(service.baseUrl + "/api/pointing-fields",data, {
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

export const getDbColumns = async () => {
    return axios
        .get(service.baseUrl + "/api/get-pointed-db-columns" ,
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

export const loadResults = async (data) => {
    return axios
        .post(service.baseUrl + "/api/load-results",data, {
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
        });
};

export const getViewResults = async () => {
    return axios
        .get(service.baseUrl + "/api/view-results" ,
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
