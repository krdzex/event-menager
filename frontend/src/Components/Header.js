import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authHelper from '../Auth/authHelper';



const Header = ({ title }) => {
    const [active, setActive] = useState(false)
    const [hover, setHover] = useState({ hover1: false, hover2: false, hover3: false, hover4: false })

    return (
        <div className="headerWrapper">
            <div className={active ? "menu active" : "menu"} onBlur={() => console.log("A")}>
                <div className="toggle" >
                    <Icon icon="carbon:add" onClick={() => setActive(!active)} />
                </div>
                <li style={{ "--i": 0 }} onMouseEnter={() => setHover({ ...hover, hover1: true })} onMouseLeave={() => setHover({ ...hover, hover1: false })}>
                    <Link to="/dashboard" >
                        <Icon icon="carbon:dashboard" />
                    </Link>
                </li>
                <div className="explanation" style={hover.hover1 ? { left: "135px", position: "absolute", display: "block" } : { display: "none" }}>
                    Dashboard
                </div>
                <li style={{ "--i": 1 }} onMouseEnter={() => setHover({ ...hover, hover2: true })} onMouseLeave={() => setHover({ ...hover, hover2: false })}>
                    <Link to="/createEvent" >
                        <Icon icon="gridicons:create" />
                    </Link>
                </li>
                <div className="explanation" style={hover.hover2 ? { left: "185px", position: "absolute", display: "block" } : { display: "none" }}>
                    Create event
                </div>
                <li style={{ "--i": 2 }} onMouseEnter={() => setHover({ ...hover, hover3: true })} onMouseLeave={() => setHover({ ...hover, hover3: false })}>
                    <Link to="/myRegistrations" >
                        <Icon icon="icomoon-free:profile" />
                    </Link>
                </li>
                <div className="explanation" style={hover.hover3 ? { left: "235px", position: "absolute", display: "block" } : { display: "none" }}>
                    My registrations
                </div>
                <li style={{ "--i": 3 }} onMouseEnter={() => setHover({ ...hover, hover4: true })} onMouseLeave={() => setHover({ ...hover, hover4: false })}>
                    <Link to="/" onClick={() => { authHelper.signOut(); window.location.reload() }}>
                        <Icon icon="ant-design:logout-outlined" />
                    </Link>
                </li>
                <div className="explanation" style={hover.hover4 ? { left: "285px", position: "absolute", display: "block" } : { display: "none" }}>
                    Sign out
                </div>
            </div>
            <div className="title">
                {title}
            </div>
        </div>
    );
};

export default Header;