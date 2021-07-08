import axios from "axios";
import Cookies from "universal-cookie/es6";
import AppConstant from "./AppConstant";

class Ajax {
    constructor() {
        const cookies = new Cookies();
        const token = cookies.get(AppConstant.APP_COOKIE);

        // this.BE_URL = "http://localhost:8080/renmin";
        this.BE_URL = process.env.REACT_APP_BE_URL;
        this.API_URL = this.BE_URL + "/api/"; // Development
        this.route = "";
        this.requestBody = {};
        this.formData = {};
        this.successCallback = () => {};
        this.errorCallback = () => {};
        this.progressCallback = () => {};
        this.axiosConfig = {
            headers: { Authorization: `Bearer ${token}` }
        }
    }

    sendPost() {
        axios.post(this.API_URL + this.route, this.requestBody, this.axiosConfig)
        .then((r) => {
            this.successCallback(r);
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.status === 422)
                this.errorCallback(error.response);
        })
    }

    sendGet() {
        axios.get(this.API_URL + this.route, this.axiosConfig)
        .then((r) => {
            this.successCallback(r);
        })
    }

    sendUpload() {
        axios.post(this.API_URL + this.route, this.formData, {
            onUploadProgress: (evt) => {
                this.progressCallback(evt);
            },
            ...this.axiosConfig
        })
        .then((r) => {
            this.successCallback(r);
        })
        .catch((error) => {
            console.log(error.response);
            if(error.response.status === 422)
                this.errorCallback(error.response);
        })
    }

    static post(params) {
        let ajax = new Ajax();
        ajax.route = params.route;
        ajax.requestBody = params.requestBody ?? {};
        ajax.successCallback = params.success;
        ajax.errorCallback = params.error;
        ajax.sendPost();
    }

    static get(params) {
        let ajax = new Ajax();
        ajax.route = params.route;
        ajax.requestBody = params.requestBody ?? {};
        ajax.successCallback = params.success;
        ajax.sendGet();
    }

    static upload(params) {
        let ajax = new Ajax();
        ajax.route = params.route;
        ajax.formData = params.formData ?? {};
        ajax.successCallback = params.success;
        ajax.errorCallback = params.error;
        ajax.progressCallback = params.progress;
        ajax.sendUpload();
    }

    static be_url() {
        let ajax = new Ajax();

        return ajax.BE_URL;
    }
}

export default Ajax;