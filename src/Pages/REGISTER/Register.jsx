import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../../Components/ERROR-PAGE/ErrorPage";
import AuthForm from "../../Components/AUTH-FORM/AuthForm";
import style from "./Register.module.scss";

const Register = () => {
  const { error } = useSelector((state) => state.auth);


  return (
    <section className={style["register-main"]}>
      <main className={style["form-container"]}>
        {error ? (
          <ErrorPage />
        ) : (
          <AuthForm formType={"register"} schema={"registerSchema"} />
        )}
      </main>
    </section>
  );
};

export default Register;