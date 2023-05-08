import React from "react";
import {Link} from "react-router-dom";
import styles from  "../styles/style.module..scss"
function HeaderLogined()
{
    return (
        <div>
            <header className="header">
                <nav className="navbar">
                    <Link className="navbar-brand" to={"/"}>Advertisement</Link>
                    <ul className="nav justify-content-end">

                        <li className="nav-item">
                            <Link className="nav-link" to={"/userslist"}>All users</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to={"/ad"}>All ads show</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/user"}>See Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/ad/create"}>Create new ad</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/user/settings"}>Settings</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" onClick={()=>{
                                if (sessionStorage.getItem("Authorization") != null)
                                {
                                    sessionStorage.clear()
                                }
                                if (localStorage.getItem("Authorization") != null)
                                {
                                    localStorage.clear()
                                }
                                window.location.reload(false);
                            }}>Exit</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}
export default HeaderLogined