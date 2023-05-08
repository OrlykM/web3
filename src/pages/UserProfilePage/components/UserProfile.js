import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../styles/style.module.scss"
function UserProfile()
{
    const [data, setData] = useState([]);
    const [locations, setLocation] = useState([])
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
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(options);
            setData(result.data);
        };
        const fetchLocations = async () => {
            const resul = await axios(options2);
            setLocation(resul.data)
            resul.data.forEach((item, index)=>{
            })
        };
        fetchData();
        fetchLocations()
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
        </>
    );
}
export default UserProfile