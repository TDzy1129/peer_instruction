import React, { useState, useEffect } from "react";
import "./interaction.css";
import InteractionCard from "./interactionCard";
import { selectLessonQ } from "../api/question";
import { selectSingleRecord } from "../api/answer";

const Interaction = () => {
    const [questions, setQuestion] = useState([]);
    const lessonId = localStorage.getItem('lesson_id');


    useEffect(() => {
        const fetchData = async () => {
            try {
                // 获取课堂题目
                const response = await selectLessonQ(lessonId);
                const questions = response[0];
    
                // 获取 student_id 并判断前两位
                const studentId = localStorage.getItem('user');
                const prefix = studentId?.substring(0, 2);
    
                if (prefix === '11') {
                    // 查询每个问题的回答记录并设置 available 属性
                    const updatedQuestions = await Promise.all(
                        questions.map(async (question) => {
                            const { h_w_id, course_id } = question;
                            try {
                                // 查询单条回答记录
                                const record = await selectSingleRecord(h_w_id, studentId, course_id);
                                return {
                                    ...question,
                                    record: record[0] || null, // 添加回答记录到问题对象
                                    available: question.available? (record[0] ? 1 : 0) : null, // 如果有记录，设置 available 为 1，否则为 0
                                };
                            } catch (err) {
                                console.error(`获取单条回答记录失败: h_w_id=${h_w_id}`, err);
                                return { ...question, record: null, available: null }; // 查询失败时默认 available 为 0
                            }
                        })
                    );
                    setQuestion(updatedQuestions); // 更新问题列表，包含回答记录和 available 属性
                } else {
                    // 非学生用户或无需查询记录，默认 available 为 0
                    const defaultQuestions = questions.map((q) => ({
                        ...q
                    }));
                    setQuestion(defaultQuestions);
                }
            } catch (err) {
                console.error('获取课堂题目失败:', err);
            }
        };
    
        fetchData();
    }, [lessonId]);
    

    return (
        <div>
            {questions.map((question, index) => (
                <InteractionCard
                    key={index}
                    type={"单选题"}
                    description={question.content}
                    self_status={question.available}
                    index={question.h_w_id}
                />
            ))}
        </div>
    );
};

export default Interaction;
