import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation, } from 'react-router-dom'
import ReportListCompont from './component/report/ReportListCompont';
import ReportComponents from './component/report/ReportComponents';
import TeacherComponent from './component/lecturer/TeacherComponent';
import LecturerList from './component/lecturer/LecturerList';
import LoginComponent from './component/auth/LoginComponent';
function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginComponent/>}/>
        <Route path='/reportlist' element={<ReportListCompont/>}/>
        <Route path='/' element={<ReportComponents/>}/>
        <Route path='/teacher' element={<TeacherComponent/>}/>
        <Route path='/teacherList' element={<LecturerList/>}/>
      </Routes>
    </>
  );
}

export default App;
