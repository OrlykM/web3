import styles from "../styles/styles.module.scss"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
function Approve()
{
    let navigate = useNavigate();
    const options = {
        url: `http://localhost:5000/advertisement/public`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    const options_local = {
        url: `http://localhost:5000/advertisement/local`,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Authorization": sessionStorage.getItem("Authorization")
        }
    };
    const [publicData, setPublicData] = useState([]);
    const [localData, setLocalData] = useState([]);
    useEffect(() => {
        const fetchData = async () =>
        {
            const result = await axios(options)
            const result_local = await axios(options_local)
            setPublicData(result.data)
            setLocalData(result_local.data)
        }
        fetchData()
    })

    return (
      <>
          <div className={styles.container}>
              {publicData.map((item, index) => (
                  <div className={styles.listing}>
                      {item.status === "confirmed" ? <>
                          <h2>{item.title}</h2>
                          <p>{item.about}</p>
                          <p className={"date"}>{item.publishingDate}</p>
                          {(()=>{
                              if(item.status === "active")
                              {
                                  return <>
                                      <span>Status:<p className={styles.active}> Active </p></span>
                                  </>
                              }
                              if(item.status === "closed")
                              {
                                  return <>
                                      <span>Status:<p className={styles.disabled}> Closed </p></span>
                                  </>
                              }
                              if(item.status === "confirmed")
                              {
                                  return <>
                                      <span>Status:<p className={styles.notconfirmed}> Need to approve </p></span>
                                  </>
                              }
                          })()}
                          <button onClick={
                              () =>
                              {
                                  const options_approve = {
                                      url: `http://localhost:5000/advertisement/public/${item.id}`,
                                      method: 'PUT',
                                      headers: {
                                          'Access-Control-Allow-Origin': '*',
                                          'Content-Type': 'application/json',
                                          "Authorization": sessionStorage.getItem("Authorization")
                                      },
                                      data: {
                                          status: "active"
                                      }
                                  };
                                  axios(options_approve)
                                  navigate("/ad")
                              }
                          } className={styles.approve_btn}>Approve</button>

                          <button onClick={
                              () =>
                              {
                                  const options_approve = {
                                      url: `http://localhost:5000/advertisement/public/${item.id}`,
                                      method: 'PUT',
                                      headers: {
                                          'Access-Control-Allow-Origin': '*',
                                          'Content-Type': 'application/json',
                                          "Authorization": sessionStorage.getItem("Authorization")
                                      },
                                      data: {
                                          status: "closed"
                                      }
                                  };
                                  axios(options_approve)
                                  navigate("/ad")
                              }
                          } className={styles.close_btn}>Decline</button>
                      </>: null}
                  </div>
              ))}
              {localData.map((item, index) => (
                  <div className={styles.listing}>
                      {item.status === "confirmed" ? <>
                          <h2>{item.title}</h2>
                          <p>{item.about}</p>
                          <p className={"date"}>{item.publishingDate}</p>
                          {(()=>{
                              if(item.status === "active")
                              {
                                  return <>
                                      <span>Status:<p className={styles.active}> Active </p></span>
                                  </>
                              }
                              if(item.status === "closed")
                              {
                                  return <>
                                      <span>Status:<p className={styles.disabled}> Closed </p></span>
                                  </>
                              }
                              if(item.status === "confirmed")
                              {
                                  return <>
                                      <span>Status:<p className={styles.notconfirmed}> Need to approve </p></span>
                                  </>
                              }
                          })()}
                          <button onClick={
                              () =>
                              {
                                  const options_approve = {
                                      url: `http://localhost:5000/advertisement/local/${item.id}`,
                                      method: 'PUT',
                                      headers: {
                                          'Access-Control-Allow-Origin': '*',
                                          'Content-Type': 'application/json',
                                          "Authorization": sessionStorage.getItem("Authorization")
                                      },
                                      data: {
                                          status: "active"
                                      }
                                  };
                                  axios(options_approve)
                                  window.location.reload(false);
                              }
                          } className={styles.approve_btn}>Approve</button>

                          <button onClick={
                              () =>
                              {
                                  const options_approve = {
                                      url: `http://localhost:5000/advertisement/local/${item.id}`,
                                      method: 'PUT',
                                      headers: {
                                          'Access-Control-Allow-Origin': '*',
                                          'Content-Type': 'application/json',
                                          "Authorization": sessionStorage.getItem("Authorization")
                                      },
                                      data: {
                                          status: "closed"
                                      }
                                  };
                                  axios(options_approve)
                                  window.location.reload(false);
                              }
                          } className={styles.close_btn}>Decline</button>
                      </>: null}
                  </div>
              ))}
          </div>
      </>
    );
}
export default Approve

