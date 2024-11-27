import axiosInstance from './axiosInstance';

// 登录接口
export const loginUser = async (username, password) => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    return response;
};

export const registerUser = async (username, password) => {
    const response = await axiosInstance.post('/auth/register', { username, password });
    return response;
};



// 获取用户信息接口