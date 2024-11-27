import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './setQuestion.css';
import { Dropdown, Input, Button, Switch } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getTeacherCourse } from '../api/course';
import { getLesson } from '../api/lesson';
import { addQ, selectQ, updateQ , deleteQ} from '../api/question';

const SetQuestion = () => {
    // 初始化状态
    const [questionContent, setQuestionContent] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('A');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [existingQuestion, setExistingQuestion] = useState(null); 

    const navigate = useNavigate()

    const teacher_id = localStorage.getItem('user');

    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await selectQ(id);
    
                // 如果 response[0] 不为空，则更新状态
                if (response[0] && Object.keys(response[0]).length > 0) {
                    console.log(response[0][0].content);
                    setExistingQuestion(response[0][0].h_w_id);
                    setQuestionContent(response[0][0].content);
                    setOptions([response[0][0].option_a, response[0][0].option_b, response[0][0].option_c, response[0][0].option_d]);
                    setCorrectAnswer(response[0][0].answer);
                    setIsVisible(response[0][0].available);
                    setSelectedCourse(response[0][0].course_id)
                    setSelectedClass(response[0][0].lesson_id)
                } else {
                    console.log('No data available');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
    
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getTeacherCourse(teacher_id);
                setCourses(response[0]);
                if (selectedCourse) {
                    const lessonResponse = await getLesson(selectedCourse);
                    setClasses(lessonResponse[0]);
                }
            } catch (err) {
                console.error('Error fetching courses:', err);
            }
        };
        fetchCourses();
    }, [teacher_id, selectedCourse]);

    useEffect(() => {
        const fetchData = async () =>{
            try{
                if(selectedCourse!==''){
                    const response = await getLesson(selectedCourse)
                    // setSelectedClass(selectedClass)
                    setClasses(response[0]);
                    console.log(response[0]);
                }
            }catch{
                console.error('Error fetching data');
            }
        }
        fetchData();
    },[selectedCourse]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const onSave = async () => {
        if (!questionContent || options.some(opt => opt === '') || !selectedCourse || !selectedClass) {
            alert('请完整填写所有字段！');
            return;
        }
        try {
            await updateQ(
                existingQuestion,
                questionContent, 
                isVisible, 
                teacher_id, 
                selectedCourse,  
                selectedClass, 
                options[0], 
                options[1], 
                options[2], 
                options[3], 
                correctAnswer
            );
            alert('题目修改成功！');
            navigate(-1); // 跳转回资源页面
        } catch (error) {
            console.error('修改题目失败:', error);
            alert('题目修改失败，请稍后再试。');
        }
    };

    const onAdd = async () => {
        if (!questionContent || options.some(opt => opt === '') || !selectedCourse || !selectedClass) {
            alert('请完整填写所有字段！');
            return;
        }
        try {
            await addQ(
                questionContent, 
                isVisible, 
                teacher_id, 
                selectedCourse,  
                selectedClass, 
                options[0], 
                options[1], 
                options[2], 
                options[3], 
                correctAnswer
            );
            alert('题目添加成功！');
            navigate(-1); // 跳转回资源页面
        } catch (error) {
            console.error('添加题目失败:', error);
            alert('题目添加失败，请稍后再试。');
        }
    };

    const handleBack = () => {
        navigate(-1); // 返回到上一个页面
    };

    const onDelete = async () => {
        if (window.confirm('确认删除此题目吗？')) {
            try {
                await deleteQ(existingQuestion);
                alert('题目删除成功！');
                navigate(-1); // 跳转回资源页面
            } catch (error) {
                console.error('删除题目失败:', error);
                alert('题目删除失败，请稍后后再试。');
            }
        }
    };

    const handleSaveOrAdd = () => {
        existingQuestion ? onSave() : onAdd();
    };

    return (
        <div className="set-question-container">
            <h2>{existingQuestion ? '编辑题目' : '添加新题目'}</h2>
            <div className="form-group">
                <label>题干：</label>
                <Input.TextArea
                    rows={3}
                    value={questionContent}
                    onChange={(e) => setQuestionContent(e.target.value)}
                    placeholder="请输入题目内容"
                />
            </div>
            <div className="form-group">
                <label>选项：</label>
                {options.map((option, index) => (
                    <Input
                        key={index}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`选项 ${String.fromCharCode(65 + index)}`}
                        className="option-input"
                    />
                ))}
            </div>
            <div className="form-group">
                <label>正确答案：</label>
                <Dropdown
                    menu={{
                        items: ['A', 'B', 'C', 'D'].map((answer) => ({
                            key: answer,
                            label: answer,
                        })),
                        onClick: (info) => setCorrectAnswer(info.key),
                    }}
                >
                    <Button>
                        {correctAnswer} <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div className="form-group">
                <label>所属课程：</label>
                <Dropdown
                    menu={{
                        items: courses.map(course => ({
                            key: course.course_id,
                            label: course.course_name,
                        })),
                        onClick: (info) => setSelectedCourse(info.key),
                    }}
                >
                    <Button>
                        {selectedCourse
                            ? courses.find(course => String(course.course_id) === String(selectedCourse))?.course_name || '请选择课程'
                            : '请选择课程'}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div className="form-group">
                <label>所属课堂：</label>
                <Dropdown
                    menu={{
                        items: classes.map(classItem => ({
                            key: classItem.lesson_id,
                            label: classItem.lesson_name,
                        })),
                        onClick: (info) => setSelectedClass(info.key),
                    }}
                >
                    <Button>
                        {selectedClass
                            ? classes.find(cls => String(cls.lesson_id) === String(selectedClass))?.lesson_name || '请选择课堂'
                            : '请选择课堂'}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
            <div className="form-group">
                <label>是否可见：</label>
                <Switch checked={isVisible} onChange={(checked) => setIsVisible(checked)} />
            </div>
            <div className="button-group">
                {!existingQuestion ? (
                    <Button type="primary" onClick={handleSaveOrAdd}>
                        添加题目
                    </Button>
                ) : (
                    <>
                        <Button type="primary" onClick={handleSaveOrAdd}>
                            保存题目
                        </Button>
                        <Button danger onClick={onDelete}>
                            删除题目
                        </Button>
                    </>
                )}
            </div>
            <Button onClick={handleBack} style={{ marginTop: '10px' }}>
                    返回
            </Button>
        </div>
    );
};

export default SetQuestion;
