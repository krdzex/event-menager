import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { listEventsByUser, makeDecision } from '../ApiService/eventApi';
import { userInfo } from '../ApiService/userApi';
import authHelper from '../Auth/authHelper';
import Header from './Header';

const MyRegistrations = () => {
    const [allRequests, setAllRequests] = useState([])
    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        let allRequests = [];
        let myEvents = await listEventsByUser(authHelper.isAuthentcated().user._id)
        for (let i = 0; i < myEvents.length; i++) {
            for (let j = 0; j < myEvents[i].requests.length; j++) {
                myEvents[i].requests[j].eventId = myEvents[i]._id
                myEvents[i].requests[j].eventTitle = myEvents[i].title
                myEvents[i].requests[j].eventPrice = myEvents[i].eventPrice
                myEvents[i].requests[j].eventDescription = myEvents[i].eventDescription
                myEvents[i].requests[j].eventDate = moment(myEvents[i].eventDate).format('MM/DD/YYYY')
                let author = await userInfo(myEvents[i].requests[j].whoRequest)
                myEvents[i].requests[j].emailOfWhoRequest = author.email
                allRequests.push(myEvents[i].requests[j])
            }
        }
        setAllRequests(allRequests)
    }


    const onDecisionClick = async (eventId, whoRequest, newStatus) => {
        let result = await makeDecision(eventId, { whoRequest: whoRequest, newStatus: newStatus })
        getData();
    }

    return (
        <div className="dashBoardWrapper">
            <div className="mainWrapper shadow">
                <Header title="My Registrations" />
                <div className="registrations">
                    {allRequests.map((request, id) => (
                        <div className="requestCard" key={id}>
                            <h3>{request.eventTitle}</h3>
                            <div className="informations">
                                <div>Event date: {request.eventDate}</div>
                                <div>Event price: {request.eventPrice}BAM</div>
                                <div>User: {request.emailOfWhoRequest}</div>
                                <div >Status: <span className={request.status}>{request.status}</span></div>
                            </div>
                            {request.status === "Pending" ? <div className="requestButtons">
                                <div className="add" onClick={() => onDecisionClick(request.eventId, request.whoRequest, "Approve")}>
                                    Accept
                                </div>
                                <div className="decline" onClick={() => onDecisionClick(request.eventId, request.whoRequest, "Denied")}>
                                    Reject
                                </div>
                            </div> : <div className="requestButtons disabled">
                                <div className="add">
                                    Accept
                                </div>
                                <div className="decline">
                                    Reject
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyRegistrations;