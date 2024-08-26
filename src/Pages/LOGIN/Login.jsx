import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../../Components/ERROR-PAGE/ErrorPage";
import AuthForm from "../../Components/AUTH-FORM/AuthForm";
import style from "./Login.module.scss";

const Login = () => {
  const { error } = useSelector((state) => state.auth);
 
  return (
      <section className={style.main}>
        {error ? (
          <ErrorPage/>
        ) : (
          <AuthForm formType={"login"} schema={"loginSchema"}/>
        )}
      </section>
    
  );
};

export default Login;