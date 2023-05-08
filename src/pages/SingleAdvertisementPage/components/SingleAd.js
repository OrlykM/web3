import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "../styles/style.module.scss"
function SingleAd()
{
    const [data, setData] = useState([]);
    const [categorydata, setCategoryData] = useState([]);
    const [userdata, setUserData] = useState([]);

    const article_id = sessionStorage.getItem("ArticleId")
    var category_id, user_id;
    const options = {
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
            setData(result.data);
            category_id = result.data.id_category
            user_id = result.data.user_id

            const options2 = {
                url: `http://localhost:5000/category/${category_id}`,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                }
            };

            const options3 = {
                url: `http://localhost:5000/user/${user_id}`,
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    "Authorization": sessionStorage.getItem("Authorization")
                }
            };

            const result2 = await axios(options2);
            setCategoryData(result2.data);

            const result3 = await axios(options3);
            setUserData(result3.data);

        };

        fetchData();
    }, []);
    return (
        <>
            <div className="container">
            </div>
        </>
    );
}
export default SingleAd