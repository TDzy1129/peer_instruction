import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../api/auth';
import { selectRecord } from '../api/answer';

function AuthForm({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(isLogin )
    e.preventDefault();
    setError('');
  
    // 添加验证逻辑
  

  

  
    if (isLogin) {
      const h_w_id = "11";
      try {
        const response = await loginUser(username, password);
        
        console.log('登录成功:', response.data);
        navigate('/main');
        // 保存会话信息 (如需要保存到 localStorage 或状态管理器)
        localStorage.setItem('user', username);
        localStorage.setItem('h_w_id', "11");
        console.log(localStorage.getItem(h_w_id))
      }catch (err) {
        setError('用户名或密码错误');
        console.error('登录失败:', err);
      }
    } else {
      console.log('注册:', { username, password });
      try {
        const response = await registerUser(username, password);
        console.log('注册成功:', response);
        setIsLogin(!isLogin)
        // 保存会话信息 (如需要保存到 localStorage 或状态管理器)
        localStorage.setItem('user', JSON.stringify(response.user));
      } catch (err) {
        setError('注册失败，请稍后后重试');
        console.error('注册失败:', err);
    }
  }
  };

  return (
    <div className="auth-container">
    <div className="auth-form">
      <h2>{isLogin ? '登录' : '注册'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>用户名：</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
          />
        </div>
        <div className="form-group">
          <label>密码：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
          />
        </div>
        {error && <p className="error">{error}</p>}

          <button className="submit-btn" onClick={onLogin}>
            {isLogin ? '登录' : '注册'}
          </button>

      </form>
      <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
        切换到{isLogin ? '注册' : '登录'}
      </button>
    </div>
  </div>
  );
}

export default AuthForm;