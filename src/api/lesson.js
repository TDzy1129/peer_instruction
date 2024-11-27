import axiosInstance from './axiosInstance';

export const getLesson = async ( courseId) => {
    const response = await axiosInstance.post(`/lesson/getLesson`, { courseId});
     return response.data;
};

export const addLesson = async (course_id, lesson_name, lesson_content ) => {
    const response = await axiosInstance.post(`/lesson/addLesson`, { course_id, lesson_name, lesson_content });
    return response.data;
};

