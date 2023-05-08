import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../styles/style.module.scss"

function UsersList(){
    const [data, setData] = useState([]);
    const [locations, setLocation] = useState([])
    const options = {
        url: 'http://localhost:5000/user',
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
    let role;
    return (
        <>
                <ul className={styles.user_list}>
                    {data.map((item) => (
                        <li className={styles.user_card}>
                            <h3>First Name: {item.firstName}</h3>
                            <p className="role">
                                Role: {(()=>{
                                    if(item.isAdmin)
                                    {
                                        return "Administrator"
                                    }
                                    else {
                                        if(item.userStatus === "premium")
                                        {
                                            return "Premium User"
                                        }
                                        else
                                        {
                                            return "Regular User"
                                        }
                                    }
                            })()}
                                {role}
                            </p>
                            <p>Last Name: {item.lastName}</p>
                            <p>Email: {item.email}</p>
                            <p>Phone: {item.phone}</p>
                            <p>Location:{locations.forEach((i, index)=>{
                                if(i.id === item.idlocation)
                                {
                                    city_name = i.city;
                                }
                            })} {city_name}</p>
                        </li>
                    ))}
                </ul>
        </>
    );
}
export default UsersList;