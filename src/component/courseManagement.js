import React from "react";
import { Link } from "react-router-dom";
import  './courseManagement.css';


import Interaction from "./interaction";
import Group from "./group";
// import Discussion from "./discussion";


class CourseManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: 1
        }
        this.Click1 = this.Click1.bind(this);
        this.Click2 = this.Click2.bind(this);
        // this.Click3 = this.Click3.bind(this);
    }

    

    Click1(){
        this.setState({
            menu: 1
        })
    }
    Click2() {
        
        this.setState({
            menu: 2
        })
    }
    // Click3() {
    //     this.setState({
    //         menu: 3
    //     })
    // }
    render(){

        const menu = this.state.menu
        const members = ['Alice', 'Bob', 'Charlie', 'Dave'];
        return (
            <div className="manager">
                <div className="nav">
                    <h3>课程管理</h3>
                    <Link onClick={this.Click1}>课堂互动</Link>
                    {/* <Link onClick={this.Click2}>小组学习</Link> */}
                    {/* <Link onClick={this.Click3}>学习评估</Link> */}
                </div>
                
                <div className="content">
                    <h2>课程内容</h2>
                    {menu === 1 && <Interaction />}
                    {/* {menu === 2 && <Group groupName="React 学习小组" members={members}/>} */}
                    {/* {menu === 3 && <Discussion />} */}
                </div>
            </div>

        )
    }
}

export default CourseManager;