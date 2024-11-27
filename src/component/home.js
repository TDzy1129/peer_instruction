import React from 'react';
import CourseList from './courseList';
import './home.css'
class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='app-container'>
                <h1>课程列表</h1>
                <CourseList courses />
            </div>
        );
    }
}

export default Home;