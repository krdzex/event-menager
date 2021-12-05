import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import BlockedRoute from './Auth/BlockedRoute';
import PrivateRoute from './Auth/PrivateRoute';
import CreateEvent from './Components/CreateEvent';
import Dashboard from './Components/Dashboard';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import MyRegistrations from './Components/MyRegistrations';
import { makeDecision } from './ApiService/eventApi';
import { closeRequest } from './Actions';

const MainRouter = () => {
    const popUp = useSelector(state => state.popUpReducer)
    const popUpRequest = useSelector(state => state.requestPopUpReducer)
    const dispatch = useDispatch()
    const onDecisionClick = async (data, status, id) => {
        let result = await makeDecision(data.eventId, { whoRequest: data.whoIsRequestingId, newStatus: status })
        dispatch(closeRequest(id))
    }


    return (
        <div className="mainRouterWrapper">
            <div className={popUp.show ? "popUp show" : "popUp"}><Icon icon="flat-color-icons:ok" className="popUpIcon" />{popUp.content}</div>
            <div className={popUpRequest.requests.length > 0 ? "popUpRequest show" : "popUpRequest"}>
                {popUpRequest.requests.map((request, id) => (
                    <div key={id}>
                        <div className="information">
                            <p>{request.whoRequest} is requesting to register to your event {request.titleOfEvent}</p>
                        </div>
                        <div className="requestButtons">
                            <div className="add" onClick={() => onDecisionClick(request, "Approve", id)}>
                                Accept
                            </div>
                            <div className="decline" onClick={() => onDecisionClick(request, "Denied", id)}>
                                Reject
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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