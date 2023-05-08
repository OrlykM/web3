import {Link} from "react-router-dom";
import React, {useState} from "react";
import styles from "../style/styles.module.scss"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ChangePassword from "../../ChangePasswordPage/components/ChangePassword";
function ResetPassword()
{
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) =>
    {

        event.preventDefault();
        const options = {
            url: 'http://localhost:5000/user',
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        };
        axios(options).then(res => {
            const data = res.data
            let isExists = false;
            data.forEach((item, index)=>
            {
                if (item.email === email)
                {
                    isExists = true
                    sessionStorage.setItem("Email", email)
                    navigate("/reset/password")
                }
            })
            if (!isExists)
            {
                alert("Account not exists")
                window.location.reload();
            }
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <label>
                Email:
            </label>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <Link to={"/reset/password"}><button type="submit">Reset password</button></Link>
            <br/>
        </form>
    );
}
export default ResetPassword