import './App.css';
import React, { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import PostJob from './pages/PostJob';
import AppliedJobs from './pages/AppliedJobs';
import Profile from './pages/Profile';
import PacmanLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from 'react-redux';
import JobsInfo from './pages/JobsInfo';
import Register from './pages/Register';
import PostedJobs from './pages/PostedJobs';
import EditJob from './pages/EditJob';
import PrivateRoute, { TeacherRoute } from './pages/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';
import { getAlljobs } from './redux/actions/jobActions';
import { getAllUsers } from './redux/actions/userAction';
import UserInfo from './pages/UserInfo';


function App() {
  const dispatch = useDispatch();
  const { loader } = useSelector(state => state.loaderReducer)

  // Get All Jobs And Users Because these states are accesible to all the components 
  useEffect(() => {
    dispatch(getAlljobs());
    dispatch(getAllUsers());

  }, [])
  return (
    <>
      {/* Routes Part */}

      {loader && <div className="sweet-loading text-center">
        <PacmanLoader color="#36d7b7" size={40} />
      </div>}

      <Routes>


        {/* Routes Which are not protected  */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



        {/* Only Authentic User Access These Routes  */}

        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<Home />} />

        </Route>
        <Route exact path='/profile' element={<PrivateRoute />}>
          <Route path={'/profile'} element={<Profile />} />

        </Route>


        <Route exact path='/postjob' element={<TeacherRoute />}>
          <Route path="/postjob" element={<PostJob />} />

        </Route>


        <Route exact path='/editjob/:id' element={<TeacherRoute />}>
          <Route path="/editjob/:id" element={<EditJob />} />

        </Route>


        <Route exact path='/posted' element={<TeacherRoute />}>
          <Route path={'/posted'} element={<PostedJobs />} />

        </Route>
        <Route exact path='/jobs/:id' element={<PrivateRoute />}>
          <Route path={'/jobs/:id'} element={<JobsInfo />} />

        </Route>

        <Route exact path='/appliedjobs' element={<PrivateRoute />}>
          <Route path={'/appliedjobs'} element={<AppliedJobs />} />

        </Route>

        <Route exact path='/appliedjobs' element={<PrivateRoute />}>
          <Route path={'/appliedjobs'} element={<AppliedJobs />} />

        </Route>


        <Route exact path='/users/:id' element={<PrivateRoute />}>
          <Route path={'/users/:id'} element={<UserInfo />} />

        </Route>


        {/*  404 Page */}


        <Route exact path='*' element={<PrivateRoute />}>
          <Route path='*' element={<NotFoundPage />} />

        </Route>





      </Routes>

    </>
  );
}

export default App;

