import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearError } from '../../Features/authSlice';
import style from "./ErrorStyle.module.scss";

const ErrorPage = () => {
    const { errorMessage, error } = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const location = useLocation()

    console.log(location.pathname);

    const path = location?.pathname.split("/")[1]

    useEffect(() => {
        let timer;
    
        switch (error) {
          case errorMessage?.includes("duplicate") &&
            errorMessage?.includes("username"):
            setMessage("Username has taken");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 3000);
    
            return () => clearTimeout(timer);
           
    
          case errorMessage?.includes("duplicate") && errorMessage?.includes("email"):
            setMessage("Email has taken");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 3000);
    
            return () => clearTimeout(timer);

          case errorMessage?.includes("duplicate") &&
            errorMessage?.includes("password"):
            setMessage("Password has taken");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 3000);
    
            return () => clearTimeout(timer);
    
          default:
            setMessage("Sorry there is an error occurred just wait for 3 seconds");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 3000);
    
            return () => clearTimeout(timer);
        }
      }, [error]);
    
  return (
    <section className={style.main}>
        <div className={style.container}>
             <h3>{message}</h3> 
             <h5> 
              You will be navigated to {path} page automatically in 3 seconds
            </h5>
        </div>
    </section>
  )
}

export default ErrorPage