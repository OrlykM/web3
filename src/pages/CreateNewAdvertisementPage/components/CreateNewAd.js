import {useForm} from "react-hook-form";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate  } from 'react-router-dom';
import styles from "../styles/style.module.scss"
function CreateNewAd()
{
    let navigate = useNavigate();
    const { register, getValues } = useForm();
    const [data, setData] = useState([]);
    const [locations, setLocation] = useState([])
    const date = new Date()
    const options1 = {
        url: 'http://localhost:5000/category',
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
            const result = await axios(options1);
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
    const handleSubmit = (e) => {
        e.preventDefault()
        const options = {
            url: 'http://localhost:5000/advertisement/public',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                title: getValues("title"),
                about: getValues("about"),
                status: "active",
                publishingDate: `${date.getDate()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                id_category: 1
            }
        };
        console.log("beb")
        axios(options)
        navigate('/ad');
    }

    return (
        <>
                <form onSubmit={handleSubmit}>
                    <label>
                        Advertisement title:
                        <input type="text" name="title" {...register("title")} required/>
                    </label>
                    <br/>
                    <label>
                        Description:
                        <textarea name="description" rows="5" {...register("about")} required></textarea>
                    </label>
                    <br/>
                    <label>
                        Category:
                        <select name="category" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </label>
                    <br/>
                    <button type="submit" >Create new ad</button>
                </form>
        </>
    );
}
export default CreateNewAd