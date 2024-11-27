import React, { useState } from 'react';
import './setting.css'; // 引入外部 CSS 文件

const SettingPage = () => {
    const [privacy, setPrivacy] = useState('public');
    const [notification, setNotification] = useState('email');
    const [language, setLanguage] = useState('zh');
    const [theme, setTheme] = useState('light');

    // 保存设置函数
    const saveSettings = () => {
        alert('设置已保存！');
    };

    // 导出数据函数
    const exportData = () => {
        alert('数据已导出！');
    };

    // 跳转到帮助与支持页面
    const goToHelpSupport = () => {
        window.location.href = 'help.html'; // 跳转到帮助与支持页面
    };

    return (
        <div>


            {/* 主体内容 */}
            <div className="main-content">
                <div className="settings">
                    <h2>设置</h2>

                    {/* 隐私设置 */}
                    <div className="setting-item">
                        <label htmlFor="privacy-settings">隐私设置</label>
                        <select
                            id="privacy-settings"
                            value={privacy}
                            onChange={(e) => setPrivacy(e.target.value)}
                        >
                            <option value="public">公开</option>
                            <option value="friends">仅朋友可见</option>
                            <option value="private">私密</option>
                        </select>
                    </div>

                    {/* 通知偏好 */}
                    <div className="setting-item">
                        <label htmlFor="notification-preferences">通知偏好</label>
                        <select
                            id="notification-preferences"
                            value={notification}
                            onChange={(e) => setNotification(e.target.value)}
                        >
                            <option value="email">邮件通知</option>
                            <option value="sms">短信通知</option>
                            <option value="app">应用内通知</option>
                        </select>
                    </div>

                    {/* 语言设置 */}
                    <div className="setting-item">
                        <label htmlFor="language-settings">语言设置</label>
                        <select
                            id="language-settings"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <option value="zh">简体中文</option>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                    </div>

                    {/* 主题设置 */}
                    <div className="setting-item">
                        <label htmlFor="theme-settings">主题设置</label>
                        <select
                            id="theme-settings"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="light">浅色模式</option>
                            <option value="dark">深色模式</option>
                        </select>
                    </div>

                    {/* 数据导出 */}
                    <div className="setting-item">
                        <button onClick={exportData}>导出学习数据</button>
                    </div>

                    {/* 帮助与支持 */}
                    <div className="setting-item">
                        <button onClick={goToHelpSupport}>帮助与支持</button>
                    </div>

                    {/* 保存按钮 */}
                    <div className="setting-item">
                        <button onClick={saveSettings}>保存设置</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
