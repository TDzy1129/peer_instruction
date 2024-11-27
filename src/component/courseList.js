import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './courseList.css';
import { getTeacherCourse, getStudentCourse, addCourse, joinCourse, getCourse } from '../api/course';
import { Button, Modal, Input, message } from 'antd'; // 引入 Ant Design 的 Modal 和 Input

const CourseList = () => {
    const navigate = useNavigate();
    const Id = localStorage.getItem('user');
    const [courses, setCourse] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制 Modal 显示与隐藏
    const [courseName, setCourseName] = useState('');
    const [courseContent, setCourseContent] = useState('');
    const [courseCode, setCourseCode] = useState(''); // 用于学生加入课程
    const TorS = Id?.substring(0, 2) === '11' ? 1 : (Id?.substring(0, 2) === '21' ? 0 : null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (TorS === 0) { // 如果是教师
                    const response = await getTeacherCourse(Id);
                    console.log(response);
                    setCourse(response[0]); // 更新课程列表
                } else if (TorS === 1) { // 如果是学生
                    const response = await getStudentCourse(Id);
                    console.log(response);
                    setCourse(response[0]); // 更新课程列表
                }
            } catch (err) {
                console.error('获取课程列表失败:', err);
            }
        };
        fetchData();
    }, [Id, TorS]);

    const handleCourseClick = (courseId) => {
        localStorage.setItem('course_id', courseId);
        navigate(`/main/course`); // 跳转到课程详情页，动态传递课程 ID
    };

    // 判断是否为教师
    const isTeacher = TorS === 0;

    // 显示 Modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // 关闭 Modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 提交课程的回调函数（教师添加课程）
    const handleAddCourse = async () => {
        if (!courseContent || !courseName) {
            message.error('请填写完整的课程名称和内容！');
            return;
        }

        try {
            const response = await addCourse(courseName, courseContent, Id);
            if (response) {
                message.success('课程添加成功！');
                handleCancel(); // 关闭 Modal
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                message.error('添加课程失败，请稍后重试！');
            }
        } catch (error) {
            console.error('添加课程失败:', error);
            message.error('网络错误，请稍后重试！');
        }
    };

    // 提交课程的回调函数（学生加入课程）
    const handleJoinCourse = async () => {
        if (!courseCode) {
            message.error('请输入课程代码！');
            return;
        }

        try {
            const course = await getCourse(courseCode);
            const response = await joinCourse(Id, courseCode, course[0][0].course_content, course[0][0].course_name);
            console.log(response);
            if (response) {
                message.success('成功加入课程！');
                handleCancel(); // 关闭 Modal
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                message.error('加入课程失败，请稍后重试！');
            }
        } catch (error) {
            console.error('加入课程失败:', error);
            message.error('网络错误，请稍后重试！');
        }
    };

    return (
        <div className="course-list" >
            {/* 如果是教师，则显示增加课程按钮 */}
            {isTeacher ? (
                <div className="add-course-btn">
                    <Button type="primary" onClick={showModal} style={{ margin: '10px' }}>
                        增加课程
                    </Button>
                </div>
            ) : (
                // 如果是学生，则显示加入课程按钮
                <div className="add-course-btn">
                    <Button type="primary" onClick={showModal} style={{ margin: '10px' }}>
                        加入课程
                    </Button>
                </div>
            )}

            {/* 课程列表 */}
            {courses && courses.length > 0 ? (
                courses.map((course) => (
                    <div
                        className="course-card"
                        key={course.course_id}
                        onClick={() => handleCourseClick(course.course_id)}
                    >
                        <h2 className="course-title">{course.course_name}</h2>
                        <p className="course-code">课程代码: {course.course_id}</p>
                        <p className="course-description">{course.course_content}</p>
                    </div>
                ))
            ) : (
                <p>没有找到课程</p>
            )}

            {/* 增加或加入课程的 Modal */}
            <Modal
                title={isTeacher ? '添加新课程' : '加入课程'}
                open={isModalVisible}
                onOk={isTeacher ? handleAddCourse : handleJoinCourse}
                onCancel={handleCancel}
            >
                {isTeacher ? (
                    <div>
                        <Input
                            placeholder="请输入课程名称"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                        <Input.TextArea
                            placeholder="请输入课程内容"
                            value={courseContent}
                            onChange={(e) => setCourseContent(e.target.value)}
                            rows={4}
                        />
                    </div>
                ) : (
                    <Input
                        placeholder="请输入课程代码"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                    />
                )}
            </Modal>
        </div>
    );
};

export default CourseList;
