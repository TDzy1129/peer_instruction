import React, { useState } from 'react';
import './group.css';

const Group = ({ groupName, members }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('User1');  // 你可以根据需要动态设置当前用户


    
    // 处理发送消息
    const handleSendMessage = () => {
        if (message.trim() === '') return; // 不发送空消息

        // 发送消息后更新消息列表
        const newMessage = {
            user: user,
            text: message,
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages([...messages, newMessage]);
        setMessage('');
    };

    return (
        <div className="discussion-group">
            <div className="group-header">
                <h2>{groupName} 小组讨论</h2>
                <div className="member-list">
                    <h3>成员：</h3>
                    <ul>
                        {members.map((member, index) => (
                            <li key={index}>{member}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="message-board">
                <h3>讨论内容：</h3>
                <div className="messages">
                    {messages.length === 0 ? (
                        <p>暂无消息</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div className="message" key={index}>
                                <span className="user">{msg.user}</span>: <span className="text">{msg.text}</span>
                                <span className="timestamp">({msg.timestamp})</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="send-message">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="输入你的消息..."
                />
                <button onClick={handleSendMessage}>发送</button>
            </div>
        </div>
    );
};

export default Group;
