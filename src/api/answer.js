import axiosInstance from './axiosInstance';

export const selectRecord = async (h_w_id) => { 
    const response = await axiosInstance.post('/answer/select', { h_w_id });
    return response.data;
}

export const insertRecord = async (h_w_id, student_id, course_id, answer) => {
    const response = await axiosInstance.post('/answer/insert', {h_w_id, student_id, course_id, answer});
    return response.data;
}

export const selectSingleRecord = async (h_w_id, student_id, course_id) => {
    const response = await axiosInstance.post('/answer/selectSingle', {h_w_id, student_id, course_id});
    return response.data;
}