import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import styles from "../styles/style.module.scss"
function AllAd(){
    const [data, setData] = useState([]);
    const options = {
        url: 'http://localhost:5000/advertisement/public',
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
            setData(result.data);
        };

        fetchData();
    }, []);

    return (
        <>
            {data.map((item, index) => (
                <div className={styles.listing}>
                    <h2>{item.title}</h2>
                    <p>{item.about}</p>
                    <p className={"date"}>{item.publishingDate}</p>
                    <Link to={"/ad/show"} >
                        <button className={styles.select_btn}
                                onClick={() =>{sessionStorage.setItem("ArticleId", item.id)}}>Show</button></Link>
                </div>
            ))}
        </>
    );
}
export default AllAd