import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuthCalls from "../../Custom-hooks/useAuthCalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../../Helpers/formValidation";
import { formRegisterInputs, formLoginInputs } from "../../Helpers/formInputs";
import { DevTool } from "@hookform/devtools";
import style from "./AuthStyle.module.scss";
import QuillEditor from "../QUILL/QuillEditor";

const schemaMap = {
  loginSchema,
  registerSchema,
};

const AuthForm = ({ formType, schema }) => {
  const { registerUser, login } = useAuthCalls();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resolvedSchema = schemaMap[schema];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(resolvedSchema) });

  const handleQuillChange = (name, content) => {
    setValue(name, content);
  };

  const onSubmit = (data) => {
    console.log("submit data", data);
    formType == "register"
      ? dispatch(registerUser(data))
      : dispatch(login(data));
  };

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  const handleNavigate = () => {
    formType === "login" ? navigate("/register") : navigate("/login");
  };

  return (
    <section className={style["auth-main"]}>
      <main className={style["form-container"]}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {formType == "register"
            ? formRegisterInputs.map((item) =>
                item.type == "quill" ? (
                  <section key={item.name} className="input-group">
                    <label htmlFor={item.id} className="user-label">
                      {item.label}
                    </label>
                    <QuillEditor
                      value={getValues(item.name) || ""}
                      onChange={(content) =>
                        handleQuillChange(item.name, content)
                      }
                    />
                    
                  </section>
                ) : (
                  <section key={item.name} className={style["input-group"]}>
                    <input
                      data-test={item["data-test"]}
                      type={item.type}
                      id={item.name}
                      name={item.name}
                      placeholder=" "
                      {...register(item.name)}
                    />
                    <label htmlFor={item.name} className={style["user-label"]}>
                      {item.label}
                    </label>
                    <p className={style.error}>{errors[item.name]?.message}</p>
                  </section>
                )
              )
            : formLoginInputs.map((item) => (
                <section key={item.name} className={style["input-group"]}>
                  <input
                    data-test={item["data-test"]}
                    type={item.type}
                    id={item.name}
                    name={item.name}
                    placeholder=" "
                    {...register(item.name)}
                  />
                  <label htmlFor={item.name} className={style["user-label"]}>
                    {item.label}
                  </label>
                  <p className={style.error}>{errors[item.name]?.message}</p>
                </section>
              ))}
          <button type="submit" disabled={isSubmitting} data-test="loginSubmit">
            
            {isSubmitting
              ? "Submitting..."
              : formType === "register"
              ? "Register"
              : "Login"}
          </button>
          {
            <section className={style["auth-button"]}>
              <span>
                {formType === "login"
                  ? "Don't have an account?"
                  : "Already have an account"}
              </span>
              <button
                style={{ width: "5rem", marginLeft: "1rem" }}
                onClick={handleNavigate}
                data-test="loginRegisterButton"
              >
                {formType === "login" ? "Register" : "Login"}
              </button>
            </section>
          }
        </form>
        {/* <DevTool control={control} /> */}
      </main>
    </section>
  );
};

export default AuthForm;