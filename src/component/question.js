import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MultipleChoiceQuestion from './multipleChoiceQuestion';
import { selectQ } from '../api/question';
import './question.css'

const Question = () => {
    const handleAnswer = (isCorrect) => {
        console.log(isCorrect ? '答对了！' : '答错了！');
    };

    const {id} = useParams()
    
    const [content, setContent] = useState("")
    const [options, setOptions] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState("")

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await selectQ(id);
                const h_w = response
                setContent(h_w[0][0].content)
                setOptions([h_w[0][0].option_a, h_w[0][0].option_b, h_w[0][0].option_c, h_w[0][0].option_d]);
                setCorrectAnswer(h_w[0][0].answer);
            } catch (err) {
                console.error('获取题目失败:', err);
            }

        };


        fetchData();
    }, [id]); 


    
    return (
    <div className="ap-container">
        {content ? (
            <MultipleChoiceQuestion
                question={content}
                options={options}
                correctAnswer={correctAnswer}
                onAnswer={handleAnswer}
            />
        ) : (
            <p>加载中...</p>
        )}
    </div>
    );
};

export default Question;