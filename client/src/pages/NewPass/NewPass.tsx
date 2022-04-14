import { TextField } from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import * as Yup from "yup";
import { logo } from "../../assets/icon";

interface Values {
  password: string;
  confirmPassword: string;
}

export default function NewPass(props: any) {
  const navigate = useNavigate();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get("token");
  const email = new URLSearchParams(search).get("email");

  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("required")
        .min(8, "Password must contain at least 8 characters"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords doesn't match"
      ),
    }),
    onSubmit: async (values: { password: any; confirmPassword: any }) => {
      const { password, confirmPassword } = values;
      let body = {
        password,
        token,
        email,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const url = `${process.env.REACT_APP_ROOT_API}auth/reset-password`;
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if ((data.msg = "success")) {
          localStorage.setItem("token", data.token);
          navigate(`/login`);
        } else {
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
          <h1>New Password</h1>
        </div>
        <form className="signin-form" onSubmit={formik.handleSubmit}>
          <TextField
            id="outlined-basic"
            label="password"
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">{formik.errors.password}</p>
          )}
          <TextField
            id="outlined-basic"
            label="confirm password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error-message">{formik.errors.confirmPassword}</p>
          )}
          <button className="signup-form__btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
