import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import './interactionCard.css';

const InteractionCard = ({ type, description, self_status, index }) => {
    // 使用 useState 来管理状态
    console.log(self_status)
    const status = self_status?"answered":"unanswered";
    const [statusText, setStatusText] = useState('未作答'); // 初始状态显示为 未作答/未发布

    const navigate = useNavigate();

    // 获取 user 的前两位数字
    const id = localStorage.getItem('user');
    
    useEffect(() => {
        if (id && id.length >= 2) {
            const prefix = id.substring(0, 2); // 提取前两位数字
            if (prefix === '11') {
                setStatusText(status === 'answered' ? '已作答' : '未作答'); // 根据 answered 状态设置发布状态
            } else if (prefix === '21') {
                setStatusText(status === 'answered' ? '已发布' : '未发布'); // 根据 answered 状态设置作答状态
            } else {
                console.log('用户前两位数字不符合跳转规则');
            }
        }
    }, [id, status]); // 当 id 或 status 变化时重新计算 statusText


    // 点击后跳转到指定页面
    const handleClick = () => {
        const user = localStorage.getItem('user');
        
        if (user && user.length >= 2) {
            // 提取前两位数字
            const prefix = user.substring(0, 2); 
            console.log(prefix);
            // 根据前两位数字跳转不同网址
            if (prefix === '11') {
                navigate(`/main/question/${index}`);
            } else if (prefix === '21') {
                if(status === 'answered'){
                    navigate(`/main/answer/${index}`);
                }
                else{
                    navigate(`/main/setquestion/${index}`);
                }
            } else {
                console.log('用户前两位数字不符合跳转规则');
            }
        } else {
            console.log('用户信息无效');
        }
    };


    if(self_status===null){
        return null;
    }

    return (
        <div className="interaction-card" onClick={handleClick}>
            <div>
                <div className="interaction-type">{type}</div>
                <div className="interaction-description">{description}</div>
            </div>
            <div className={`status ${status === 'answered' ? 'answered' : 'unanswered'}`}>
                {statusText} {/* 显示根据 id 前两位数字判断的状态 */}
            </div>
        </div>
    );
};

export default InteractionCard;
