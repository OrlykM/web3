import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/style.module..scss"
function HeaderNotLogined()
{
    return (
        <>
            <div className={"container-fluid"}>
                <header className={styles.header}>
                    <nav className={styles.navbar}>
                        <Link className={styles.navbar_brand} to={"/"}>Advertisement</Link>
                        <ul className="nav justify-content-end">
                            <li className={styles.nav_item}>
                                <Link className={styles.nav_link} to={"/register"}>Register</Link>
                            </li>
                            <li className={styles.nav_item}>
                                <Link className={styles.nav_link}  to={"/login"}>Log in</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        </>
    );
}
export default HeaderNotLogined