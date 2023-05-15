import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import axios from "axios";

function EditPage()
{
    let navigate = useNavigate();
    const { register, getValues } = useForm();
    const [localaddata, setLocalAd] = useState([]);
    const [publicaddata, setPublicAd] = useState([]);
    const article_id = sessionStorage.getItem("ArticleId")
    const is_local = sessionStorage.getItem("IsLocal")
    const options = {
        url: `http://localhost:5000/advertisement/public/${article_id}`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    const options_local = {
        url: `http://localhost:5000/advertisement/public/${article_id}`,
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
            const result_local = await axios(options_local);
            setLocalAd(result_local.data);
            setPublicAd(result.data);
        };
        fetchData();
    }, []);

    const handleSubmit = () =>
    {
        if (getValues("title") === null && getValues("about") === null)
        {
            navigate("/user")
        }
        else if(getValues("title") !== null && getValues("about") !== null)
        {
            const options1 = {
                url: `http://localhost:5000/advertisement/public/${article_id}`,
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    title: getValues("title"),
                    about: getValues("about")
                }
            };
            const options1_local = {
                url: `http://localhost:5000/advertisement/local/${article_id}`,
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    title: getValues("title"),
                    about: getValues("about")
                }
            };
            if (is_local === "1")
            {
                axios(options1_local)
            }
            else
            {
                axios(options1)
            }

            navigate("/user")
        }
        else if(getValues("title") !== null && getValues("about")=== null)
        {
            const options1 = {
                url: `http://localhost:5000/advertisement/public/${article_id}`,
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    title: getValues("title")
                }
            };
            const options1_local = {
                url: `http://localhost:5000/advertisement/local/${article_id}`,
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    title: getValues("title")
                }
            };
            if (is_local === "1")
            {
                axios(options1_local)
            }
            else
            {
                axios(options1)
            }

            navigate("/user")
        }
        else if (getValues("title") === null && getValues("about") !== null)
        {
            const options1 = {
                url: `http://localhost:5000/advertisement/public/${article_id}`,
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    about: getValues("about")
                }
            };
            const options1_local = {
                url: `http://localhost:5000/advertisement/local/${article_id}`,
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                },
                data: {
                    about: getValues("about")
                }
            };
            if (is_local === "1")
            {
                axios(options1_local)
            }
            else
            {
                axios(options1)
            }
            navigate("/user")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <label>
                    Advertisement title:
                    <input type="text"
                           placeholder={is_local ?localaddata.title:publicaddata.title}
                           name="title" {...register("title")} />
                </label>

                <label>
                    Advertisement description:
                    <textarea name="description" placeholder={is_local ?localaddata.about:publicaddata.about}
                              rows="5" {...register("about")} ></textarea>
                </label>

                <button type="submit">Edit</button>
            </form>
        </>
    );
}
export default EditPage