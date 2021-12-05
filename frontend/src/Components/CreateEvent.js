import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Header from './Header';
import authHelper from '../Auth/authHelper';
import { createEvent } from '../ApiService/eventApi';
import { closePopUp, openPopUp } from '../Actions';
import { useDispatch } from 'react-redux';

const CreateEvent = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [date, setDate] = useState(false)
    const [values, setValues] = useState({
        img: "",
        title: "",
        eventDescription: "",
        eventPrice: "",
        eventDate: "",
        categorie: "",
        redirect: false
    })

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("img", values.img)
        formData.append("categorie", values.categorie)
        formData.append("eventDate", values.eventDate)
        formData.append("eventPrice", values.eventPrice)
        formData.append("author", authHelper.isAuthentcated().user._id)
        formData.append("eventDescription", values.eventDescription)
        formData.append("title", values.title)
        createEvent(formData).then(response => {
            if (firstTime) {
                document.getElementById("createEventForm").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setValues({ ...values, redirect: true })
                dispatch(openPopUp("Successfuly created event!"))
                setTimeout(() => {
                    dispatch(closePopUp())
                }, 3000);
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }

    const onReleaseCategorie = () => {
        if (values.categorie === "") {
            setValues({ ...values, categorie: "" })
        }
    }
    const onChangeFile = (e) => {
        setValues({ ...values, img: e.target.files[0] })
    }


    if (values.redirect) return <Navigate to={"/dashboard"} />
    return (
        <div className="createEvent">
            <div className="mainWrapper shadow">
                <Header title="Create event" />
                <div className="createForm">
                    <div className="createEventCard">
                        <div className="createEventForm" id="createEventForm">
                            <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                                <div className="imageUpload">
                                    <span>Image:</span>
                                    <input type="file" name="img" className="addFile" onChange={onChangeFile} />
                                    {errors.img && (<span style={{ color: "red" }}>Cant be empty image!</span>)}
                                </div>
                                <div className={values.title === "" ? "inputBox" : "inputBox active"}>
                                    <input type="text" className={errors.title ? "error" : "success"} value={values.title} onChange={onChange("title")} />
                                    <span>Title:</span>
                                    <p>{errors.title}</p>
                                </div>
                                <div className={values.eventDescription === "" ? "inputBox" : "inputBox active"}>
                                    <input type="text" className={errors.eventDescription ? "error" : "success"} value={values.eventDescription} onChange={onChange("eventDescription")} />
                                    <span>Event description:</span>
                                    <p>{errors.eventDescription}</p>
                                </div>
                                <div className={values.eventPrice === "" ? "inputBox" : "inputBox active"}>
                                    <input type="number" step="0.01" min="0" className={errors.eventPrice ? "error" : "success"} value={values.eventPrice} onChange={onChange("eventPrice")} />
                                    <span>Event price:</span>
                                    <p>{errors.eventPrice}</p>
                                </div>
                                <div className="lastInputBox">
                                    <div className={values.eventDate === "" ? "inputBox" : "inputBox active"}>
                                        <input style={{ height: "27px" }} type={date ? "date" : "text"} className={errors.eventDate ? "error" : "success"} value={values.eventDate} onChange={onChange("eventDate")} onFocus={() => setDate(true)} onBlur={() => setDate(false)} />
                                        <span>Event date:</span>
                                        <p>{errors.eventDate}</p>
                                    </div>
                                    <div className={values.categorie === "" ? "inputBox last" : "inputBox active last"} style={{ width: "100%" }}>
                                        <input type="text" list="categorie" className={errors.categorie ? "error" : "success"} onMouseDown={() => setValues({ ...values, categorie: "" })} value={values.categorie} onKeyDown={(event) => {
                                            event.preventDefault();
                                        }} onChange={onChange("categorie")} onBlur={() => onReleaseCategorie()} />
                                        <datalist id="categorie">
                                            <option value="Courses" />
                                            <option value="Meetups" />
                                        </datalist>
                                        <span>Categorie:</span>
                                        <p>{errors.categorie}</p>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <input type="submit" />
                                    <Link to="/dashboard"> <div className="button">
                                        Cancel
                                    </div> </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreateEvent;