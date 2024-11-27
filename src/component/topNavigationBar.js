import React  from 'react';
import { Link ,Outlet } from 'react-router-dom';
import  './topNavigationBar.css';

function TopNavigationBar() {
    return (
        <div>
            <div className="TopNavigationBar">
                <div className='logo'>
                    <Link to="./">主页</Link>
                </div>


                <div className="user">
                    <Link to="/main/notice">通知</Link>
                    <Link to="/main/user">账户</Link>
                    <Link to="/main/setting">设置</Link>
                </div>
            </div>


            <Outlet />
        </div>

        
    )
}

export default TopNavigationBar