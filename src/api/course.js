import axiosInstance from './axiosInstance';

export const addCourse = async (courseName, courseContent, teacherId) => {
    const response = await axiosInstance.post(`/course/addCourse`, { courseName, courseContent, teacherId });
     return response.data;
};

export const getTeacherCourse = async (teacherId) => {
    const response = await axiosInstance.post(`/course/getTeacherCourse`,{ teacherId });
    return response.data;
};

export const getStudentCourse = async (studentId) => {
    const response = await axiosInstance.post(`/course/getStudentCourse`, { studentId });
    return response.data;
};

export const joinCourse = async (studentId, courseId, courseContent, courseName) => {
    const response = await axiosInstance.post(`/course/joinCourse`, { studentId, courseId, courseContent, courseName });
    return response.data;
};

export const getCourse = async (courseId) => {
    const response = await axiosInstance.post(`/course/getCourse`, { courseId });
    return response.data;
};