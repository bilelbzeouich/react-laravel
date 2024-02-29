import axios from "axios";
import { redirect } from "react-router-dom";

axios.interceptors.request.use(function (config) {
    if (localStorage.token != undefined) {
        setAuth(true)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token
    }
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error.response.status)
    if (error.response.status == 401) {
        console.log('logout');
    } elseif(error.response.status == 500)
    {
        redirect('/error-500')
    }
    return Promise.reject(error);
});