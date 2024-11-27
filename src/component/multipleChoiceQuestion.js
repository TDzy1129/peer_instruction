import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './multipleChoiceQuestion.css';
import {  selectSingleRecord, insertRecord } from '../api/answer';

const MultipleChoiceQuestion = ({ question, options, correctAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();
    const user = localStorage.getItem('user');
    const course_id = localStorage.getItem('course_id');

    const insertRecordAsync = async (letter) => {
        try {
            const response = await selectSingleRecord(id,user,course_id)
            if(!response[0]) {
                await insertRecord(id, user, course_id, letter);
                console.log('Record inserted successfully:', response);
            }
            else{
                console.log('Record already exists:', response);
            }
        } catch (error) {
            console.error('Error inserting record:', error);
        }
    };

    const handleOptionClick = async (option, letter) => {
        setSelectedOption(letter); // 将选项字母存储到 selectedOption
        const correctOption = options[["A", "B", "C", "D"].indexOf(correctAnswer)];
        if (option === correctOption) {
            setIsCorrect(true);
            console.log(letter); // 打印正确的选项字母
        } else {
            setIsCorrect(false);
        }

        
        insertRecordAsync(letter);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="question-container">
            <h2 className="question">{question}</h2>
            <div className="options-container">
                {options.map((option, index) => {
                    const letter = ["A", "B", "C", "D"][index]; // 将索引映射到选项字母
                    return (
                        <button
                            key={index}
                            className={`option ${selectedOption === letter ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(option, letter)} // 传递选项内容和对应的字母
                        >
                            {letter}. {option}
                        </button>
                    );
                })}
            </div>
            {selectedOption && (
                <p className="feedback-message">
                    {isCorrect ? '答对了!' : '再试一次!'}
                </p>
            )}
            <button className="back-button" onClick={handleBackClick}>
                返回
            </button>
        </div>
    );
};

export default MultipleChoiceQuestion;
