import React, { useEffect } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import config from "./../../../config";

import * as Yup from "yup";
import { Formik } from "formik";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

function CreateCompany(props) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const initialData = {
    name: "",
    description: "",
  };

  return (
    <>
      {loading ? (
        <Typography align="center" variant="body2" sx={{ mt: 5, mb: 1 }}>
          Loading....
        </Typography>
      ) : (
        <Box sx={{ width: "100%" }} px={{ xs: 0, sm: 5 }} pt={{ xs: 0, sm: 3 }}>
          <Formik
            initialValues={initialData}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                try {
                  console.log(values);
                  const response = await axios.post(
                    `${config.apiURL}/api/company`,
                    {
                      ...values,
                      userID: localStorage.getItem("token"),
                    }
                  );

                  console.log(response);
                  console.log(values);
                  props.handleCreateCompany(false);

                  setStatus({ success: true });
                  setSubmitting(false);
                } catch (error) {
                  console.log("error creating account", error);
                  let errors = [];
                  error.errors.map((err) => {
                    return errors.push(err.message);
                    // alert.show(err.message, {
                    //     position: positions.BOTTOM_CENTER,
                    //     timeout: 4000, // custom timeout just for this one alert
                    //     type: 'error',
                    //     offset: '60px',
                    // });
                  });
                  setStatus({ success: false });
                  setErrors({ submit: errors });
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
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.name && errors.name)}
                      className={classes.formControl}
                    >
                      <InputLabel>Company Name</InputLabel>
                      <OutlinedInput
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="name"
                      />
                    </FormControl>
                    {touched.name && errors.name && (
                      <FormHelperText error> {errors.name} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.description && errors.description)}
                      className={classes.formControl}
                    >
                      <InputLabel>Company Description</InputLabel>
                      <OutlinedInput
                        value={values.description}
                        name="description"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="description"
                      />
                    </FormControl>
                    {touched.description && errors.description && (
                      <FormHelperText error>
                        {" "}
                        {errors.description}{" "}
                      </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>
                </Grid>

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
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  pt={{ xs: 0, sm: 2 }}
                >
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      )}
    </>
  );
}

export default CreateCompany;
