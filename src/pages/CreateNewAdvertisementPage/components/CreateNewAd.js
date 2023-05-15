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
    const [userdata, setUser] = useState([]);
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
        url: 'http://localhost:5000/user/self',
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
            const result2 = await axios(options2);
            setData(result.data);
            setUser(result2.data)
        };
        fetchData();
    }, []);

    const [photo, setPhoto] = useState(null);

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("photo", photo);
        let category_id;
        data.forEach((item, index) =>
        {
              if(item.name === getValues("idcategory"))
              {
                  category_id = item.id;
              }
        })
        if(getValues("isChoosed") === "public")
        {
            const options1 = {
                url: 'http://localhost:5000/advertisement/public',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    title: getValues("title"),
                    id_category: category_id,
                    status: "confirmed",
                    about: getValues("about"),
                    photoUrl: formData.get("photo")
                }
            };
            axios(options1)
            navigate("/user")
        }
        else
        {
            const options1 = {
                url: 'http://localhost:5000/advertisement/local',
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    title: getValues("title"),
                    id_category: category_id,
                    status: "confirmed",
                    about: getValues("about"),
                    photoUrl: formData.get("photo"),
                    location_id: userdata.idlocation
                }
            };
            axios(options1)
            navigate("/user")
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Choose type of advertisment
                    <br/>
                    <input type="radio" name="type" value="public" {...register("isChoosed")} checked /> Public
                    <br/>
                    <input type="radio" name="type" value="local" {...register("isChoosed")}/> Local
                </label>

                <label>
                    Advertisement title:
                    <input type="text" name="title" {...register("title")} required/>
                </label>

                <label>
                    Advertisement description:
                    <textarea name="description" rows="5" {...register("about")} required></textarea>
                </label>

                <label>
                    Category:
                    <select name="category" {...register("idcategory")} required>
                        <option value="books">Books</option>
                        <option value="electronics">Electronics</option>
                        <option value="vehicles">Vehicles</option>
                    </select>
                </label>
                <label>
                    Photo:
                    <input type="file" name="photo" onChange={handlePhotoChange}/>
                </label>
                <button type="submit">Create</button>
            </form>
        </>
    );
}
export default CreateNewAd