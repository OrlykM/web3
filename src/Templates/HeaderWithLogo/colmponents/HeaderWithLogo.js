import React from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import styles from "../styles/style.module.scss"
function HeaderWithLogo()
{
    let navigate = useNavigate();

    return (
        <div className={"container-fluid"}>
            <header className={styles.header}>
                <nav className={styles.navbar}>
                    <Link className={styles.navbar_brand} to={"/"}>Advertisement</Link>
                </nav>
            </header>
        </div>
    );
}
export default HeaderWithLogo