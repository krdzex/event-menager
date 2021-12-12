import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import BlockedRoute from './Auth/BlockedRoute';
import PrivateRoute from './Auth/PrivateRoute';
import CreateEvent from './Components/CreateEvent';
import Dashboard from './Components/Dashboard';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import MyRegistrations from './Components/MyRegistrations';


const MainRouter = () => {
    const popUp = useSelector(state => state.popUpReducer)

    return (
        <div className="mainRouterWrapper">
            <div className={popUp.show ? "popUp show" : "popUp"}><Icon icon="flat-color-icons:ok" className="popUpIcon" />{popUp.content}</div>
            <Routes>
                <Route path="/" element={<BlockedRoute />}>
                    <Route path="" element={<Navigate replace to="/signIn" />} />
                    <Route path="signIn" element={<SignIn />} />
                    <Route path="signUp" element={<SignUp />} />
                </Route>

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="" element={<Navigate replace to="/dashboard" />} />
                    <Route exact path="dashboard" element={<Dashboard />} />
                    <Route exact path="createEvent" element={<CreateEvent />} />
                    <Route exact path="myRegistrations" element={<MyRegistrations />} />
                </Route>
            </Routes>
        </div>

    );
};

export default MainRouter;