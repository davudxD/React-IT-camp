import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as yup from "yup";
import { ref } from "yup";
import "./SignUp.css";
import "bootstrap/dist/css/bootstrap.css";

const loginSchema = yup.object({
  email: yup.string().required("Nedostaje email").email("Neispravan email"),
  // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
  password: yup
    .string()
    .required("Unesite password")
    .min(9, "Password mora imati najmanje 9 karaktera.")
    .max(50),
  confirmPassword: yup
    .string()
    .required("Potvrdite password")
    .oneOf([ref("password")], "Passwords does not match"),
  fullName: yup.string().required("Username polje je obavezno"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="main">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
        }}
        onSubmit={(values, actions) => {
          fetch("https://js-course-server.onrender.com/user/signup", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.userId) {
                alert("Registracija uspesna");
                navigate("/login");
              } else {
                alert("Registracija neuspesna");
              }
              console.log(data);
            });
        }}
        validationSchema={loginSchema}
        // validate={(values) => {
        //   const errors = {};
        //   if (
        //     !values.error ||
        //     values.error.length < 10 ||
        //     values.error.length > 100
        //   ) {
        //     errors.email = "Neispravan email";
        //   }
        //   return errors;
        // }
      >
        {({
          values, // formikov state
          errors, // errors = { email: 'Neispravan email' }
          touched, // touched = { email: true }
          handleChange,
          handleBlur,
          handleSubmit,
        }) =>
          isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="forma">
              {/* <button
            onClick={() => {
              console.log(values, "values");
              console.log(errors, "errors");
              console.log(touched, "touched");
            }}
          >
            Console log states
          </button> */}
              <div className="input-div">
                <input
                  className="inp"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                />
                <p className="error-message">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div className="input-div">
                <input
                  className="inp"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                <p className="error-message">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className="input-div">
                <input
                  className="inp"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  placeholder="Confirm password"
                />
                <p className="error-message">
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </p>
              </div>
              <div className="input-div">
                <input
                  className="inp"
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  placeholder="Username"
                />
              </div>
              {/* <button className="signup-btn" onClick={handleSubmit} type="button">
            Submit
            </button> */}
              <button
                className="signup-btn"
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  // setTimeout(() => {handleSubmit()}, 1000);
                  handleSubmit();
                }}
              >
                Sign Up
              </button>
              <p
                className="have-acc"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 1000);
                }}
              >
                You already have an account?
              </p>
            </div>
          )
        }
      </Formik>
    </div>
  );
};

export default SignUp;
