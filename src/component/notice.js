import React, { useState, useEffect } from 'react';
import './notice.css'; // Assuming you have your styles in a separate CSS file.

const Notice = () => {
    // 模拟从缓存中获取用户身份
    const userType = localStorage.getItem('userType') || 'teacher'; // 'student' or 'teacher' or 'admin'
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3; // 示例总页数

    useEffect(() => {
        // 示例通知数据
        const notificationsData = [
            { title: '课程安排调整', sender: '张老师', preview: '由于天气原因，本周的课程安排有所调整...', type: 'teacher' },
            { title: '系统维护通知', sender: '管理员', preview: '系统将在本周六进行维护，预计停机...', type: 'admin' },
            { title: '新课上线', sender: '李老师', preview: '我们将上线新的Python课程，欢迎参加...', type: 'teacher' },
            { title: '考试通知', sender: '管理员', preview: '期末考试将于下个月进行，请做好准备...', type: 'admin' },
            { title: '作业截止日期更改', sender: '王老师', preview: '请注意，作业的截止日期已更改为下周一...', type: 'teacher' },
            { title: '课程反馈调查', sender: '管理员', preview: '请参加本学期的课程反馈调查，以帮助我们改进...', type: 'admin' },
            { title: '暑假课程安排', sender: '张老师', preview: '我们将在暑假提供一些额外的课程，请提前注册...', type: 'teacher' },
            { title: '服务器维护通知', sender: '管理员', preview: '下周二的服务器维护会影响到平台的使用，请留意...', type: 'admin' },
            { title: '课堂互动调查', sender: '李老师', preview: '请填写课堂互动的调查问卷，以帮助改进教学...', type: 'teacher' },
            { title: '课程推荐', sender: '管理员', preview: '根据您的学习历史，推荐以下课程...', type: 'admin' },
        ];

        setNotifications(notificationsData);
    }, []);

    // 显示通知列表（根据当前页）
    const displayNotifications = () => {
        const startIndex = (currentPage - 1) * 5; // 每页显示5条通知
        const endIndex = startIndex + 5;
        return notifications.slice(startIndex, endIndex);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageSelect = (event) => {
        setCurrentPage(parseInt(event.target.value, 10));
    };

    return (
        <div>
            {/* 顶部导航栏 */}

            {/* 主体内容 */}
            <div className="main-content">
                <div className="notification-list">
                    {/* 根据身份添加“发送通知”按钮 */}
                    {(userType === 'teacher' || userType === 'admin') && (
                        <button
                            className="send-notification-button"
                            onClick={() => alert('发送通知功能待实现！')}
                        >
                            发送通知
                        </button>
                    )}

                    {/* 显示通知列表 */}
                    {displayNotifications().map((notification, index) => (
                        <div
                            className={`notification ${notification.type}-notification`}
                            key={index}
                        >
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-sender">发送者: {notification.sender}</div>
                            <div className="notification-preview">{notification.preview}</div>
                        </div>
                    ))}
                </div>

                {/* 翻页和选择页数 */}
                <div className="pagination">
                    <button
                        className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
                        onClick={handlePrevPage}
                    >
                        上一页
                    </button>
                    <select id="page-select" value={currentPage} onChange={handlePageSelect}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        {/* 这里可以根据总页数动态生成选项 */}
                    </select>
                    <button
                        className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
                        onClick={handleNextPage}
                    >
                        下一页
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Notice;
