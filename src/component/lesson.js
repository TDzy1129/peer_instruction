import React, { useState, useEffect } from 'react';
import LessonList from './lessonList';
import { getLesson, addLesson } from '../api/lesson'; // 导入新增课堂的 API
import { Button, Modal, Input, message } from 'antd'; // 使用 Ant Design 的 Modal 和 Input 组件


function Lesson() {
    const [lessons, setLessons] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制 Modal 显示状态
    const [lessonName, setLessonName] = useState(''); // 存储输入的课堂名称
    const [lessonContent, setLessonContent] = useState(''); // 存储输入的课堂内容
    const courseId = localStorage.getItem('course_id');
    const userId = localStorage.getItem('user'); // 获取当前用户 ID

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLesson(courseId);
                setLessons(response[0]); // 更新课程列表
            } catch (err) {
                console.error('获取课程列表失败:', err);
            }
        };
        fetchData();
    }, [courseId]);

    // 判断是否为教师用户
    const isTeacher = userId?.startsWith('21');

    // 显示新增课堂的 Modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 关闭 Modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setLessonName(''); // 清空输入内容
        setLessonContent('');
    };

    // 提交新增课堂
    const handleAddLesson = async () => {
        if (!lessonName || !lessonContent) {
            message.error('请填写完整的课堂名称和内容！');
            return;
        }

        try {
            const response = await addLesson(courseId, lessonName, lessonContent);
            if (response) {
                console.log(response);
                message.success('课堂添加成功！');
                handleCancel(); // 关闭 Modal
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                message.error('添加课堂失败，请稍后重试！');
            }
        } catch (error) {
            console.error('添加课堂失败:', error);
            message.error('网络错误，请稍后重试！');
        }
    };

    return (
        <div className="app-container">
            <h3>课堂列表</h3>
            
            {/* 如果是教师，则显示按钮 */}
            {isTeacher && (
                <div className="add-lesson-btn">
                    <Button type="primary" onClick={showModal} style={{ margin: '10px' }}>
                        增添课堂
                    </Button>
                </div>
            )}
            
            {/* 课堂列表 */}
            <LessonList lessons={lessons}  />

            {/* Modal 用于输入课堂信息 */}
            <Modal
                title="新增课堂"
                open={isModalVisible}
                onOk={handleAddLesson}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
            >
                <div style={{ marginBottom: '10px' }}>
                    <Input
                        placeholder="请输入课堂名称"
                        value={lessonName}
                        onChange={(e) => setLessonName(e.target.value)}
                    />
                </div>
                <Input.TextArea
                    placeholder="请输入课堂内容"
                    value={lessonContent}
                    onChange={(e) => setLessonContent(e.target.value)}
                    rows={4}
                />
            </Modal>
        </div>
    );
}

export default Lesson;
