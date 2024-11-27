import React from 'react';
import { Routes , Route} from 'react-router-dom';


import AuthForm from './component/login';
import Home from './component/home';
import TopNavigationBar from './component/topNavigationBar';
import Course from './component/course';
import CourseManager from './component/courseManagement';
import Resource from './component/resource';
import Lesson from './component/lesson';
import Question from './component/question';
import Notice from './component/notice';
import Setting from './component/setting';
import User from './component/user';
import Answer from './component/answer';
import SetQuestion from './component/setQuestion';
function App() {


  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      

      
      <Route path="/main" element={<TopNavigationBar />}>
        <Route index element={<Home />} />
        <Route path="/main/user" element={<User />} />
        <Route path="/main/notice" element={<Notice />} />
        <Route path="/main/setting" element={<Setting />} />
        <Route path='/main/question/:id' element={<Question />} />
        <Route path='/main/answer/:id' element={<Answer />} />
        <Route path='/main/setquestion/:id' element={<SetQuestion />} />
        <Route path="/main/course" element={<Course />} >

          <Route index element={<Lesson /> }/>
          
          <Route path="/main/course/management" element={<CourseManager />} />
        </Route>

        <Route path="/main/resource" element={<Resource />} />
      </Route>
    </Routes>
  );
}

export default App;