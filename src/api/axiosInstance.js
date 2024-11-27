import axios from 'axios';



// 创建 axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://192.168.56.1:5000/api', // 后端接口的基础路径
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;
