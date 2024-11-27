import React from 'react';
import './resource.css';
import { useNavigate } from 'react-router-dom';

// 将 ResourceCard 组件改为函数组件
const ResourceCard = ({ title, source, id,avai }) => {

    const user = localStorage.getItem('user');
    const isTeacher = user?.startsWith('21'); // 检查 id 是否以 '21' 开头

    const navigate = useNavigate();

    const handleClick = () => {
        if(isTeacher){
            navigate(`/main/setquestion/${id}`, {});
        }else{
            navigate(`/main/question/${id}`);
        }
    };

    if(avai === 0 && !isTeacher){
        return null;
    }

    return (
        <div className="resource-card" onClick={handleClick}>
            <div className="resource-info">
                <span className="resource-title">单选题：{title}</span>
                <span className="resource-source">{source}</span>
            </div>
        </div>
    );
};

export default ResourceCard;
