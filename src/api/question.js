import axiosInstance from './axiosInstance';

export const selectLessonQ = async (lessonId) => { 
    const response = await axiosInstance.post('/question/selectLessonQ', { lessonId});
    return response.data;
}

export const selectCourseQ = async (courseId) => {
    const response = await axiosInstance.post('/question/selectCourseQ', { courseId });
    return response.data;
}

export const selectQ = async (h_w_id) => {
    const response = await axiosInstance.post('/question/selectQ', { h_w_id });
    return response.data;
}

export const selectTeacherQ = async (teacherId) => {
    const response = await axiosInstance.post('/question/selectTeacherQ', { teacherId });
    return response.data;
}

export const addQ = async ( content, available, teacher_id, course_id, lesson_id, option_a, option_b, option_c, option_d, answer) => {
    const response = await axiosInstance.post('/question/addQ', {  content, available, teacher_id, course_id, lesson_id, option_a, option_b, option_c, option_d, answer });
    return response.data;
}

export const updateQ = async (h_w_id, content, available, teacher_id, course_id, lesson_id, option_a, option_b, option_c, option_d, answer) => {
    const response = await axiosInstance.post('/question/updateQ', { h_w_id, content, available, teacher_id, course_id, lesson_id, option_a, option_b, option_c, option_d, answer });
    return response.data;
}

export const deleteQ = async (h_w_id) => {
    const response = await axiosInstance.post('/question/deleteQ', { h_w_id });
    return response.data;
}