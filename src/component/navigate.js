import React from 'react';
import { useNavigate } from 'react-router-dom';

// 这个组件只负责传递 navigate 函数
const NavigateProvider = ({ children }) => {
    const navigate = useNavigate();
    return React.cloneElement(children, { navigate });
};

export default NavigateProvider;
