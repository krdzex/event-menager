import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { createUser } from '../ApiService/userApi';

const SignUp = () => {

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        redirect: false
    })
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        createUser(user).then(response => {
            if (firstTime) {
                document.getElementById("signUpForm").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setValues({ ...values, redirect: true })
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }


    if (values.redirect) return <Navigate to={"/signIn"} />
    return (
        <div className="registrationWrapper">
            <div className="cardWrapperSignUp shadow">
                <div className="signUpCard">
                    <div className="signUpForm" id="signUpForm">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <h3>Sign Up</h3>
                            <div className={values.firstName === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" className={errors.firstName ? "error" : "success"} value={values.firstName} onChange={onChange("firstName")} />
                                <span>First name</span>
                                <p>{errors.firstName}</p>
                            </div>
                            <div className={values.lastName === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" className={errors.lastName ? "error" : "success"} value={values.lastName} onChange={onChange("lastName")} />
                                <span>Last Name</span>
                                <p>{errors.lastName}</p>
                            </div>
                            <div className={values.email === "" ? "inputBox" : "inputBox active"}>
                                <input type="text" className={errors.email ? "error" : "success"} value={values.email} onChange={onChange("email")} />
                                <span>Email</span>
                                <p>{errors.email}</p>
                            </div>
                            <div className={values.password === "" ? "inputBox last" : "inputBox active last"}>
                                <input type="password" className={errors.password ? "error" : "success"} value={values.password} onChange={onChange("password")} />
                                <span>Password</span>
                                <p>{errors.password}</p>
                            </div>
                            <div className="buttons">
                                <input type="submit" />
                                <Link to="/signIn"> <div className="button">
                                    Login intead?
                                </div> </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;