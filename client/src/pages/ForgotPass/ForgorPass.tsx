import { TextField } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import IconButton from "@mui/material/IconButton";

import { logo } from "../../assets/icon";
import "./ForgotPass.css";

interface Values {
  email: string;
}

export default function ForgotPass() {
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState("");

  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email adress").required("required"),
    }),
    onSubmit: async (values) => {
      const { email } = values;
      let body = {
        email,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const url = `${process.env.REACT_APP_ROOT_API}auth/forgot-password`;
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if ((data.msg = "success")) {
          setAlert(
            `An email with a password reset link has been sent to your email ${email}. Check your email and click on the link to proceed!`
          );
          //navigate(`/login`);
        } else {
          setError(data.msg);
        }
      } catch (error) {
        return error;
      }
    },
  });
  return (
    <div className="forgotpass-container">
      <Link to="/">
        <div className="logo-form">{logo()}</div>
      </Link>
      <div className="card-layout forgot">
        <div className="card-header">
          <h1>Forgot password?</h1>
          <p>Reset password in two quick steps</p>
        </div>
        <form
          className="signin-form forgot-form"
          onSubmit={formik.handleSubmit}
        >
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
          {alert && <p className="aler-message">{alert}</p>}
          {error && <p className="error-message">Invalid email</p>}
          <button className="signup-form__btn" type="submit">
            Reset
          </button>
          <div className="back-btn">
            <Link to="/login">
              <IconButton
                sx={{
                  width: "80px",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "gray",
                }}
              >
                Back
              </IconButton>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
