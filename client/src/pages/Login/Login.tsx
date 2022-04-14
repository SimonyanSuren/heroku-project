import { Link, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import "./Login.css";
import * as Yup from "yup";
import { logo } from "../../assets/icon";
import { useNavigate } from "react-router-dom";
import emailValidationApi from "../../services/api/emailvalidation.api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import currentUserSlice from "../../store/currentUser";

interface Values {
  email: string;
  password: string;
}

export function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUser } = currentUserSlice.actions;
  const [disabled, setDisabled] = useState(false);
  let params = useParams();

  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email adress").required("required"),
      password: Yup.string()
        .required("required")
        .min(8, "Password must contain at least 8 characters"),
    }),
    onSubmit: async (values) => {
      setDisabled(true);
      const { email, password } = values;
      let body = {
        password,
        email,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const url = `${process.env.REACT_APP_ROOT_API}auth/login`;
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.user) {
          localStorage.setItem("token", data.token);
          dispatch(setUser(data.user));
          navigate(`/`);
        } else {
          setError(data.msg);
        }
      } catch (error) {
        return error;
      }
    },
  });

  return (
    <div className="login">
      <Link to="/">
        <div className="logo-form">{logo()}</div>
      </Link>
      <div className="card-layout card-login">
        <div className="card-header">
          <h1>Sign in</h1>
        </div>
        <form className="signin-form" onSubmit={formik.handleSubmit}>
          <TextField
            id="outlined-basic"
            label="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error-message">{formik.errors.email}</p>
          )}
          <TextField
            id="outlined-basic"
            label="password"
            name="password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Link to={"./forgot"}>
            <p className="forgotpass">Forgot passoword?</p>
          </Link>
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">{formik.errors.password}</p>
          )}
          {error && <p className="error-message">Invalid email or password</p>}
          <button
            className="signup-form__btn"
            type="submit"
            disabled={disabled}
          >
            Sign in
          </button>
        </form>
        <div className="or-operator">
          <span className="or-text">new here?</span>
        </div>
        <Link to="/signup">
          <button className="signup-form__btn signin-btn">Sign up</button>
        </Link>
      </div>
    </div>
  );
}
