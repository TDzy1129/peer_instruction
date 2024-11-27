import  './topNavigationBar.css';
import React  from 'react';
import { Link ,Outlet } from 'react-router-dom';


class course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }


    render() {
        return (
            <div>
                <div className="menu">
                    <Link to='management'>课程管理</Link>
                    <Link to='../resource'>资源管理</Link>
                </div>
    
                <Outlet />
            </div>
        )
    }
}

export default course;