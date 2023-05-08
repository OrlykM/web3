import { Outlet, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
const IsLogined = () =>
{
    let auth = sessionStorage.getItem("Authorization")
    if (!auth){
        return(<Navigate to="/login"/>)
    }
    else
    {
        return(<Outlet/>)
    }
}

export default IsLogined