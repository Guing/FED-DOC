'use strict';
const axios = require('axios')


const BASE_URL = process.env.BLACK_CLI_BASE_URL?process.env.BLACK_CLI_BASE_URL:'http://blackfe.com:7001'

const request = axios.create({
    baseURL:BASE_URL,
    timeout:5000
})
request.interceptors.response.use(response=>{

    if(response.status === 200){
        return response.data;
    }
},error=>{
    return Promise.reject(error)
})
module.exports = request;