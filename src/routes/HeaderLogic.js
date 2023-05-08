import {Outlet} from "react-router-dom";
import HeaderNotLogined from "../Templates/HeaderNotLogined";
import HeaderLogined from "../Templates/HeaderLogined";
import axios from "axios";
import {useEffect, useState} from "react";
import HeaderAdmin from "../Templates/HeaderAdmin/components/HeaderAdmin";
const IsLoginedHeader = () =>
{
    let auth = sessionStorage.getItem("Authorization")
    const [data, setData] = useState([]);
    const options = {
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
            const result = await axios(options);
            setData(result.data);
        };

        fetchData();
    }, []);

    if (!auth){
        return(<HeaderNotLogined/>)
    }
    else
    {
        if (data.isAdmin === true)
        {
            return(<HeaderAdmin/>)
        }
        else {
            return(<HeaderLogined/>)
        }
    }
}
export default IsLoginedHeader