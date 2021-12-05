import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { signin } from '../Auth/authApi';
import authHelper from '../Auth/authHelper';
const SignIn = () => {

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
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
            email: values.email || undefined,
            password: values.password || undefined
        }
        signin(user).then(response => {
            if (firstTime) {
                document.getElementById("signInForm").className += " afterFirst"
                setFirstTime(false)
            }
            if (!response.email) {
                authHelper.authenticate(response, () => {
                    setErrors({})
                    setValues({ ...values, redirect: true })
                })
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }


    if (values.redirect) return <Navigate to={"/dashboard"} />
    return (
        <div className="registrationWrapper">
            <div className="cardWrapper shadow">
                <div className="signInCard">
                    <div className="signInForm" id="signInForm">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <h3>Sign In</h3>
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
                                <Link to="/signUp"> <div className="button">
                                    New Account
                                </div> </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;