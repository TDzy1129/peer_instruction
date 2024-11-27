import './resource.css';
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ResourceCard from './resourceCard';
import { Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { selectTeacherQ, selectCourseQ} from '../api/question';
import { getTeacherCourse, getStudentCourse } from '../api/course';

const Resource = () => {
    const [resources, setResources] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const id = localStorage.getItem('user');
    const isTeacher = id?.startsWith('21'); // 检查 id 是否以 '21' 开头

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                let course
                // 判断用户是否是教师
                if (id.startsWith('21')) { 
                    // 如果是教师，查询全部题目
                    course = await getTeacherCourse(id); // 获取课程数据
                    response = await selectTeacherQ(id);
                } else {
                    // 如果是学生，根据课程查询题目
                    course = await getStudentCourse(id); // 获取课程数据
                    const courseIds = course[0]?.map(item => item.course_id) || [];
                    const studentQuestions = await Promise.all(
                        courseIds.map(courseId => selectCourseQ(courseId)) // 根据课程 ID 查询题目
                    );
                    response = studentQuestions.flat(); // 合并题目数据
                }
    
                setResources(response[0]); // 设置题目数据
    
                setMenuItems([
                    { key: '全部', label: '全部', course_id: '' }, // 添加 "全部" 选项
                    ...course[0].map(item => ({ 
                        key: item.course_name, 
                        label: item.course_name, 
                        course_id: item.course_id 
                    })) // 动态生成课程选项
                ]);
            } catch (err) {
                console.error('获取题目失败:', err);
            }
        };
    
        fetchData();
    }, [id]);
    

    // 点击菜单项时的回调，设置 selectedCategory 为 course_id
    const handleMenuClick = (info) => {
        const selectedItem = menuItems.find(item => item.key === info.key);
        setSelectedCategory(selectedItem?.course_id || ''); // 获取选中项的 course_id
    };

    // 根据 selectedCategory 过滤资源列表
    const filteredResources = resources.filter(resource => 
        selectedCategory === '' || resource.course_id === selectedCategory
    );

    const handleAddQuestion = () => {
        navigate('/main/setQuestion/-1');  // 跳转到设置题目的页面
    };

    return (
        <div>
            <div className="menu">
                <Link to='../course/management'>课程管理</Link>
                <Link to='../resource'>资源管理</Link>
            </div>

            <div className="category-bar">
                <span>选择分类:</span>
                <Dropdown
                    menu={{
                        items: menuItems,
                        onClick: handleMenuClick,
                    }}
                >
                    <Button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                        {menuItems.find(item => item.course_id === selectedCategory)?.label || '全部'} <DownOutlined />
                    </Button>
                </Dropdown>
            </div>

            {/* 条件渲染增加题目按钮 */}
            {isTeacher && (
                <div className="add-button-container">
                    <Button type="primary" onClick={handleAddQuestion}>
                        增加题目
                    </Button>
                </div>
            )}

            <div className="resource-list">
                {filteredResources.map((resource, index) => (
                    <ResourceCard
                        key={index}
                        name={resource.course_id}
                        title={resource.content}
                        source=""
                        avai={resource.available}
                        id={resource.h_w_id}
                    />
                ))}
            </div>

            <Outlet />
        </div>
    );
};

export default Resource;
