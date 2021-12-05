import React, { useCallback, useEffect, useState } from 'react';
import { deleteEvent, listEvents, listEventsByCategorie, listEventsByUser, sendRequest } from '../ApiService/eventApi';
import Header from './Header';
import moment from "moment"
import authHelper from '../Auth/authHelper';
import { Icon } from '@iconify/react';
import { io } from 'socket.io-client';
import { userInfo } from '../ApiService/userApi';
import { closePopUp, closeRequestPopUp, openPopUp, openRequestPopUp } from '../Actions';
import { useDispatch } from 'react-redux';
const Dashboard = () => {

    const [events, setEvents] = useState([])
    const [categorie, setCategorie] = useState("")
    const [socket] = useState(() => io("localhost:4400"));
    const dispatch = useDispatch()

    useEffect(() => {
        socket?.emit("join_dashboard", authHelper.isAuthentcated().user.email)
    }, [socket])

    const reciveMessage = useCallback((data) => {
        dispatch(openRequestPopUp(data))
    }, [dispatch]);

    useEffect(() => {
        return () => {
            dispatch(closeRequestPopUp())
        }
    }, [])


    useEffect(() => {

        socket?.off("recive_request").on('recive_request', data => {
            reciveMessage(data)
        })
    })

    const onRequestClick = async (data) => {

        let sending = await sendRequest(data._id, { whoRequest: authHelper.isAuthentcated().user._id, status: "Pending" })
        let author = await userInfo(data.author);
        let informations = {
            whoIsAuthor: author.email,
            whoIsRequesting: authHelper.isAuthentcated().user.email,
            whoIsRequestingId: authHelper.isAuthentcated().user._id,
            eventTitle: data.title,
            eventId: data._id
        }
        socket.emit("send_request", informations)
        if (categorie === "" || categorie === "All events") {
            getAllData()
        } else if (categorie === "My events") {
            getMyData()
        } else {
            getCategorieData()
        }
        dispatch(openPopUp("Successfuly requested!"))
        setTimeout(() => {
            dispatch(closePopUp())
        }, 3000);
    }

    const getAllData = async () => {
        let allEvents = await listEvents()
        for (let i = 0; i < allEvents.length; i++) {
            let eventDateFormat = moment(allEvents[i].eventDate).format('MM/DD/YYYY')
            allEvents[i].eventDate = eventDateFormat
            if (allEvents[i].author !== authHelper.isAuthentcated().user._id) {
                allEvents[i].isMine = false
            } else {
                allEvents[i].isMine = true
            }
            for (let j = 0; j < allEvents[i].requests.length; j++) {
                if (allEvents[i].requests[j].whoRequest === authHelper.isAuthentcated().user._id) {
                    allEvents[i].status = allEvents[i].requests[j].status;
                }
            }
        }
        setEvents(allEvents)
    }

    const getMyData = async () => {
        let allEvents = await listEventsByUser(authHelper.isAuthentcated().user._id)
        for (let i = 0; i < allEvents.length; i++) {
            let eventDateFormat = moment(allEvents[i].eventDate).format('MM/DD/YYYY')
            allEvents[i].eventDate = eventDateFormat
            if (allEvents[i].author !== authHelper.isAuthentcated().user._id) {
                allEvents[i].isMine = false
            } else {
                allEvents[i].isMine = true
            }
        }
        setEvents(allEvents)
    }

    const getCategorieData = async () => {
        let allEvents = await listEventsByCategorie(categorie)
        for (let i = 0; i < allEvents.length; i++) {
            let eventDateFormat = moment(allEvents[i].eventDate).format('MM/DD/YYYY')
            allEvents[i].eventDate = eventDateFormat
            if (allEvents[i].author !== authHelper.isAuthentcated().user._id) {
                allEvents[i].isMine = false
            } else {
                allEvents[i].isMine = true
            }
            for (let j = 0; j < allEvents[i].requests.length; j++) {
                if (allEvents[i].requests[j].whoRequest === authHelper.isAuthentcated().user._id) {
                    allEvents[i].status = allEvents[i].requests[j].status;
                }
            }
        }
        setEvents(allEvents)
    }

    useEffect(() => {

        if (categorie === "" || categorie === "All events") {
            getAllData()
        } else if (categorie === "My events") {
            getMyData()
        } else {
            getCategorieData()
        }
    }, [categorie])

    const onReleaseCategorie = () => {
        if (categorie === "") {
            setCategorie("")
        }
    }
    const onChange = (event) => {
        setCategorie(event.target.value)
    }

    const onDeleteClick = async (id) => {
        let eventArrayCopy = events.filter((event) => event._id !== id)
        setEvents(eventArrayCopy)
        let result = await deleteEvent(id)
        dispatch(openPopUp("Successfuly deleted event!"))
        setTimeout(() => {
            dispatch(closePopUp())
        }, 3000);
    }
    return (
        <div className="dashBoardWrapper">
            <div className="mainWrapper shadow">
                <div className="filter">
                    <input type="text" list="categorie" placeholder="Filter" onMouseDown={() => setCategorie("")} value={categorie} onKeyDown={(event) => {
                        event.preventDefault();
                    }} onChange={onChange} onBlur={() => onReleaseCategorie()} />
                    <datalist id="categorie">
                        <option value="All events" />
                        <option value="My events" />
                        <option value="Courses" />
                        <option value="Meetups" />
                    </datalist>
                </div>
                <Header />
                <div className="gridWrapper">
                    <div className="allEventsGrid">
                        {events.map((event, id) => (
                            <div className="eventCard" key={id}>
                                <div className="eventImage">
                                    <img src={process.env.PUBLIC_URL + `/images/${event.img}`} alt="img"></img>
                                </div>
                                <div className="eventDetails">
                                    <h2 className="eventTitle">
                                        {event.title}
                                    </h2>
                                    <div className="eventInformations">
                                        <p>Event Date: {event.eventDate}</p>
                                        <p>Event Price: {event.eventPrice} BAM</p>
                                        <p>Event Description: {event.eventDescription}</p>
                                    </div>
                                    {event.author === authHelper.isAuthentcated().user._id ? "" : event?.status ? <div className={"statusDiv " + event.status.toLowerCase()}>
                                        {event.status}
                                    </div> : <div className="registrationButton" onClick={() => onRequestClick(event)}>
                                        Make request
                                    </div>}
                                </div>
                                {event.isMine && (<div className="deletButton" onClick={() => onDeleteClick(event._id)}>
                                    <Icon icon="fluent:delete-20-filled" />
                                </div>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;