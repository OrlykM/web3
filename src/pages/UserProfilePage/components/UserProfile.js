import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../styles/style.module.scss"

function UserProfile()
{
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [locations, setLocation] = useState([])
    const [publicad, setPublicAd] = useState([])
    const [localad, setLocalAd] =  useState([])

    const options = {
        url: 'http://localhost:5000/user/self',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    const options2 = {
        url: 'http://localhost:5000/locations',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    const options3 = {
        url: 'http://localhost:5000/advertisement/public',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    const options4 = {
        url: 'http://localhost:5000/advertisement/local',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(options);
            const resul = await axios(options2);
            const res = await axios(options3);
            const ress = await axios(options4);
            setLocation(resul.data)
            setData(result.data);
            setLocalAd(ress.data);
            setPublicAd(res.data);
        };
        fetchData();
    }, []);

    let city_name;
    return (
        <>
            <div className={styles.container}>
                <div className={styles.value}>
                    <span className={styles.label}>Name:</span>
                    <span className={styles.name}>{data.firstName}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Surname:</span>
                    <span className="surname">{data.lastName}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Email:</span>
                    <span className="email">{data.email}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Phone:</span>
                    <span className="phone">{data.phone}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Role:</span>
                    <span className="role">
                                 {(()=>{
                        if(data.isAdmin)
                        {
                            return "Administrator"
                        }
                        else {
                            if(data.userStatus === "premium")
                            {
                                return "Premium User"
                            }
                            else
                            {
                                return "Regular User"
                            }
                        }
                    })()}</span>
                </div>
                <div className={styles.value}>
                    <span className={styles.label}>Location:</span>
                    <span className="location">{locations.forEach((i, index)=>{
                        if(i.id === data.idlocation)
                        {
                            city_name = i.city;
                        }
                    })} {city_name}</span>
                </div>
            </div>
            <br/><br/><br/>
            <div>
                <h1>MY POSTS</h1>
                <br/>
                <h2>Public posts</h2>
                <br/>
                {publicad.map((item, index) => (
                    <div className={styles.listing}>
                        {item.user_id === data.id ? <>
                            <h2>{item.title}</h2>
                            <p className={"date"}>{item.publishingDate}</p>
                            {(()=>{
                                    if(item.status === "active")
                                    {
                                        return <>
                                            <span>Status:<p className={styles.active}> Active </p></span>
                                        </>
                                    }
                                    if(item.status === "closed")
                                    {
                                        return <>
                                            <span>Status:<p className={styles.disabled}> Closed </p></span>
                                        </>
                                    }
                                    if(item.status === "confirmed")
                                    {
                                        return <>
                                            <span>Status:<p className={styles.notconfirmed}> Confirmed </p></span>
                                        </>
                                    }
                            })()}
                            <Link to={"/ad/edit"} >
                                <button className={styles.select_btn}
                                        onClick={() =>{
                                            if ("location_id" in item)
                                            {
                                                sessionStorage.setItem("ArticleId", item.id)
                                                sessionStorage.setItem("IsLocal", 1)
                                            }
                                            else
                                            {
                                                sessionStorage.setItem("ArticleId", item.id)
                                                sessionStorage.setItem("IsLocal", 0)
                                            }}}>Edit</button></Link>
                        </>: null}
                    </div>
                ))}
                <br/>
                <h2>Local posts</h2>
                <br/>
                <div className={styles.listing}>
                    {localad.map((item, index) => (
                        <div className={styles.listing}>
                            {item.user_id === data.id ? <>
                                <h2>{item.title}</h2>
                                <p className={"date"}>{item.publishingDate}</p>
                                {(()=>{
                                    if(item.status === "active")
                                    {
                                        return <>
                                            <span>Status:<p className={styles.active}> Active </p></span>
                                        </>
                                    }
                                    if(item.status === "closed")
                                    {
                                        return <>
                                            <span>Status:<p className={styles.disabled}> Closed </p></span>
                                        </>
                                    }
                                    if(item.status === "confirmed")
                                    {
                                        return <>
                                            <span>Status:<p className={styles.notconfirmed}> Confirmed </p></span>
                                        </>
                                    }
                                })()}
                                <Link to={"/ad/edit"} >
                                    <button className={styles.select_btn}
                                            onClick={() =>{
                                                if ("location_id" in item)
                                                {
                                                    sessionStorage.setItem("ArticleId", item.id)
                                                    sessionStorage.setItem("IsLocal", 1)
                                                }
                                                else
                                                {
                                                    sessionStorage.setItem("ArticleId", item.id)
                                                    sessionStorage.setItem("IsLocal", 0)
                                                }}}>Edit</button></Link>
                            </>: null}
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}
export default UserProfile