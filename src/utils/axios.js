
import axios from "axios";
let baseURL =process.env.NODE_ENV === "production" ? "http://127.0.0.1" : "/juanpi";

const instance = axios.create({
    baseURL: baseURL,  //如果配置了Vue 的反向代理，直接写代理标识即可
    // timeout: 1000,//请求发生延迟时间
    // headers: {
    //     "X": "12312",  //配置发送时，附加在请求头上的信息
    // }
})

export default instance;