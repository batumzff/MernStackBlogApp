import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearError } from '../../Features/authSlice';
import { clearBlogError } from '../../Features/BlogSlice';
import style from "./ErrorStyle.module.scss";

const ErrorPage = ({ msg, blogError }) => {
    const { errorMessage, error } = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const location = useLocation()

    // console.log(location.pathname);

    const path = location?.pathname.split("/")[1]

    useEffect(() => {
        let timer;
    
        switch (error || blogError) {
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

          case errorMessage?.includes("check your username/email and password"):
            setMessage(" Credentials are wrong please check your username/email and password");
            timer = setTimeout(() => {
              dispatch(clearError());
            }, 3000);
    
            return () => clearTimeout(timer);

            case msg?.includes("There is no such a blog"):
              setMessage("Sorry the Blog you are looking for is deleted by the owner");
              timer = setTimeout(() => {
                dispatch(clearBlogError());
              }, 3000);
      
              return () => clearTimeout(timer);
             
      
            case msg?.includes("The blog you are looking for has been removed or deleted"):
              setMessage("The blog you are looking for has been deleted");
              timer = setTimeout(() => {
                dispatch(clearBlogError());
              }, 3000);
      
              return () => clearTimeout(timer);
  
            case msg?.includes("E11000 duplicate key error collection: blogAPI.categories"):
              setMessage("The category already exists");
              timer = setTimeout(() => {
                dispatch(clearBlogError());
              }, 3000);
      
              return () => clearTimeout(timer);
  
            case msg?.includes("Comment not found"):
              setMessage("Sorry there is no such a comment");
              timer = setTimeout(() => {
                dispatch(clearBlogError());
              }, 3000);
      
              return () => clearTimeout(timer);
  
            case msg?.includes("Blog not found"):
              setMessage("Blog not found");
              timer = setTimeout(() => {
                dispatch(clearBlogError());
              }, 3000);
      
              return () => clearTimeout(timer);
      
      
          default:
            setMessage("Sorry there is an error occurred just wait for 3 seconds");
            timer = setTimeout(() => {
              dispatch(clearError());
              dispatch(clearBlogError());
            }, 3000);
    
            return () => clearTimeout(timer);
        }
      }, [error, blogError]);

      
      
      // console.log("error from auth : ",error);
      // console.log("errorMessage from auth : ",errorMessage);
      // console.log("msg from blogError : ",msg);
      // console.log("blogError from blogError : ",blogError);
    
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