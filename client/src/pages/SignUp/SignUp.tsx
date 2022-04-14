import { useState } from "react";
import { Link } from "react-router-dom";

import { Alert, TextField } from "@mui/material";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";

import "./SignUp.css";

import { logo } from "../../assets/icon";

interface Values {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export function SignUp() {
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [verify, setVerify] = useState(false);
  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(8, "Must 8 characters or less")
        .required("required"),
      email: Yup.string().email("Invalid email adress").required("required"),
      password: Yup.string()
        .required("required")
        .min(8, "Password must contain at least 8 characters"),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords doesn't match"
      ),
    }),

    onSubmit: async (values) => {
      setDisabled(true);
      const { email, password, username, passwordConfirmation } = values;
      let body = {
        name: username,
        password,
        passwordConfirmation,
        email,
      };

      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      };

      const url = `${process.env.REACT_APP_ROOT_API}/auth/register`;
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.status === 200 || response.status === 201) {
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
            setVerify(true);
          }, 1000);
        } else {
          setError(data.msg);
          setDisabled(false);
        }
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <div className="signup">
      {alert && (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            width: "350px",
            right: "4px",
            top: "20px",
          }}
        >
          Successfully registered
        </Alert>
      )}
      <Link to="/">
        <div className="logo-form">{logo()}</div>
      </Link>
      {!verify ? (
        <>
          <div className="card-layout">
            <div className="card-header">
              <h1>Sign up</h1>
            </div>
            <form
              method="post"
              className="signup-form"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                name="username"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="error-message">{formik.errors.username}</p>
              )}
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                value={formik.values.email}
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error-message">{formik.errors.email}</p>
              )}
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                type="password"
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error-message">{formik.errors.password}</p>
              )}
              <TextField
                id="outlined-basic"
                label="confirm password"
                variant="outlined"
                name="passwordConfirmation"
                type="password"
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
              />
              {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation && (
                  <p className="error-message">
                    {formik.errors.passwordConfirmation}
                  </p>
                )}
              <p className="error-message">{error}</p>
              <button
                className="signup-form__btn"
                type="submit"
                disabled={disabled}
              >
                Sign up
              </button>
            </form>
            <div className="or-operator">
              <span className="or-text">Already have an account?</span>
            </div>
            <Link to="/login">
              <button className="signup-form__btn signin-btn">Sign in</button>
            </Link>
          </div>
          )
        </>
      ) : (
        <>
          <div className="email-verify">
            Link has been send to your email, please verify &#127881; &#127881;
            &#127881;
          </div>
        </>
      )}
    </div>
  );
}
