import React, { useState } from 'react';
import './user.css'; // 引入外部 CSS 文件

const UserPage = () => {
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [emailNotifications, setEmailNotifications] = useState('yes');
    const [securityQuestion, setSecurityQuestion] = useState('pet');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 保存设置函数
    const saveSettings = () => {
        alert('设置已保存！');
    };

    // 重置密码函数
    const resetPassword = () => {
        alert('密码已重置！');
    };

    // 退出登录函数
    const logout = () => {
        alert('您已成功退出登录！');
        window.location.href = '../'; // 跳转到登录页面
    };

    return (
        <div>
            {/* 顶部导航栏 */}

            {/* 主体内容 */}
            <div className="main-content">
                <div className="account-settings">
                    <h2>账户设置</h2>

                    {/* 账户信息查看 */}
                    <div className="setting-item">
                        <label htmlFor="current-username">当前用户名</label>
                        <input type="text" id="current-username" value="现有用户名" readOnly />
                    </div>

                    {/* 设置用户名 */}
                    <div className="setting-item">
                        <label htmlFor="username">用户名</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="请输入新用户名"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* 设置头像 */}
                    <div className="setting-item">
                        <label htmlFor="avatar">头像上传</label>
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                        />
                    </div>

                    {/* 邮件通知设置 */}
                    <div className="setting-item">
                        <label htmlFor="email-notifications">邮件通知</label>
                        <select
                            id="email-notifications"
                            value={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.value)}
                        >
                            <option value="yes">接收</option>
                            <option value="no">不接收</option>
                        </select>
                    </div>

                    {/* 安全问题 */}
                    <div className="setting-item">
                        <label htmlFor="security-question">安全问题</label>
                        <select
                            id="security-question"
                            value={securityQuestion}
                            onChange={(e) => setSecurityQuestion(e.target.value)}
                        >
                            <option value="pet">q1</option>
                            <option value="school">q2</option>
                        </select>
                        <input
                            type="text"
                            id="security-answer"
                            placeholder="回答"
                            value={securityAnswer}
                            onChange={(e) => setSecurityAnswer(e.target.value)}
                        />
                    </div>

                    {/* 重置密码 */}
                    <div className="setting-item">
                        <label htmlFor="new-password">新密码</label>
                        <input
                            type="password"
                            id="new-password"
                            placeholder="请输入新密码"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="setting-item">
                        <label htmlFor="confirm-password">确认新密码</label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="请确认新密码"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="setting-item">
                        <button onClick={resetPassword}>重置密码</button>
                    </div>

                    {/* 保存按钮 */}
                    <div className="setting-item">
                        <button onClick={saveSettings}>保存设置</button>
                    </div>

                    {/* 退出登录 */}
                    <button className="logout-button" onClick={logout}>
                        退出登录
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
