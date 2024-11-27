import React from 'react';
import { useNavigate } from 'react-router-dom';
import './lessonList.css';

const LessonList = ({ lessons }) => {
    const navigate = useNavigate();

    // 处理点击跳转的方法
    const handleCardClick = (lessonId) => {
        localStorage.setItem('lesson_id', lessonId);
        navigate(`/main/course/management`);
    };

    return (
        <div className="lesson-list">
            {lessons.map((lesson) => (
                <div 
                    className="lesson-card" 
                    key={lesson.lesson_id} 
                    onClick={() => handleCardClick(lesson.lesson_id)}
                >
                    <h2 className="lesson-title">{lesson.lesson_name}</h2>
                    <p className="lesson-description">{lesson.lesson_content}</p>
                    <p className="lesson-code">课程代码: {lesson.course_id}</p>
                </div>
            ))}
        </div>
    );
};

export default LessonList;
