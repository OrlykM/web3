import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import styles from "../styles/style.module.scss"
function AllAd(){
    const [data, setData] = useState([]);
    const [localdata, setLocalData] = useState([]);
    const [mixedData, setMixedData] = useState([]);
    const options = {
        url: 'http://localhost:5000/advertisement/public',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    const options2 = {
        url: 'http://localhost:5000/advertisement/local',
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    const handleClick = () =>
    {

    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(options);
            const result2 = await axios(options2);
            setData(result.data);
            setLocalData(result2.data);
            setMixedData(result.data.concat(result2.data))
        };
        fetchData();
        shuffle(mixedData)
    }, []);
    return (
        <>
            {mixedData.map((item, index) => (
                <div className={styles.listing}>
                    {item.status === "active" ? <>
                        <h2>{item.title}</h2>
                        <p>{item.about}</p>
                        <p className={"date"}>{item.publishingDate}</p>
                        <Link to={"/ad/show"} >
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
                                        }
                                    }}>Show</button></Link>
                    </>: null}
                </div>
            ))}
        </>
    );
}
export default AllAd