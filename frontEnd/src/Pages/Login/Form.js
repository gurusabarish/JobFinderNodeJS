import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import config from "../../config";

// Yub and FormIK
import * as Yup from "yup";
import { Formik } from "formik";

// axios
import axios from "axios";

import {
  FormControl,
  // FormControlLabel,
  FormHelperText,
  // Grid,
  // IconButton,
  // InputAdornment,
  InputLabel,
  OutlinedInput,
  // Stack,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

const SignInForm = (props, { ...others }) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);

  return (
    <Formik
      initialValues={{
        password: "",
        email: "",
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required("Password is required"),
        email: Yup.string()
          .email("Invalid email address")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setSubmitting(true);
          try {
            const response = await axios.post(
              `${config.apiURL}/api/auth/signin`,
              values
            );

            console.log(response);
            console.log(values);

            if (response.status === 200) {
              localStorage.setItem("token", response.data.data._id);
              setRedirect(true);
            }
            setStatus({ success: true });
            setSubmitting(false);
          } catch (error) {
            console.log("error signing up", error);
            setStatus({ success: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          {redirect && <Navigate to="/" />}

          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            className={classes.formControl}
          >
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email"
            />
          </FormControl>
          {touched.email && errors.email && (
            <FormHelperText error>{errors.email}</FormHelperText>
          )}
          <Box mb={2} />

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            className={classes.formControl}
          >
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type="password"
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Password"
            />
          </FormControl>
          {touched.password && errors.password && (
            <FormHelperText error>{errors.password}</FormHelperText>
          )}
          <Box mb={2} />

          <Typography variant="body2" align="center">
            Create an account? <Link to="/signup">SignUp</Link>
          </Typography>

          {errors.submit && (
            <Box
              sx={{
                mt: 3,
              }}
            >
              {Array.isArray(errors.submit) ? (
                <>
                  {errors.submit.map((err) => {
                    return <FormHelperText error>{err}</FormHelperText>;
                  })}
                </>
              ) : (
                <FormHelperText error>{errors.submit}</FormHelperText>
              )}
            </Box>
          )}

          <Box
            sx={{
              mt: 2,
            }}
          >
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign In
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignInForm;
