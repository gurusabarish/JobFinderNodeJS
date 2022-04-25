import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import config from "../../config";

import * as Yup from "yup";
import { Formik } from "formik";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

const EditProfile = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [createNew, setCreateNew] = useState(false);

  let initialData = {
    firstName: "",
    lastName: "",
    email: "",
  };

  useEffect(() => {
    console.log("EditProfile");
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/profile/${localStorage.getItem("token")}`
      );
      console.log(response);

      if (response.data.status === 200) {
        initialData = response.data.data;
      } else {
        setCreateNew(true);
      }
    } catch (err) {
      console.log("error fetching data", err);
    }
    setLoading(false);
  };

  // City
  const [openCity, setOpenCity] = React.useState(false);
  const handleCityClose = () => {
    setOpenCity(false);
  };
  const handleCityOpen = () => {
    setOpenCity(true);
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
              firstName: Yup.string().required("Required"),
              lastName: Yup.string().required("Required"),
              email: Yup.string().email().required("Required"),
              phone: Yup.number().required("Required"),
              city: Yup.string().required("Required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              setSubmitting(true);
              try {
                try {
                  console.log(values);
                  //   console.log(response);
                  if (createNew) {
                    console.log("Should be created");
                    const response = await axios.post(
                      `${config.apiURL}/api/profile`,
                      {
                        ...values,
                        _id: localStorage.getItem("token"),
                      }
                    );
                    console.log(response.data);
                    props.handleEditProfile(false);
                  } else {
                    console.log("Should be updated");
                  }
                  setStatus({ success: true });
                } catch (error) {
                  console.log("error creating account", error);
                  let errors = [];
                  error.errors.map((err) => {
                    return errors.push(err.message);
                  });
                  setStatus({ success: false });
                  setErrors({ submit: errors });
                }
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
              }
              setSubmitting(false);
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
                  <Grid item xs={12} sm={3}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.firstName && errors.firstName)}
                      className={classes.formControl}
                    >
                      <InputLabel>First Name</InputLabel>
                      <OutlinedInput
                        value={values.firstName}
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="firstName"
                      />
                    </FormControl>
                    {touched.firstName && errors.firstName && (
                      <FormHelperText error>
                        {" "}
                        {errors.firstName}{" "}
                      </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.lastName && errors.lastName)}
                      className={classes.formControl}
                    >
                      <InputLabel>Last Name</InputLabel>
                      <OutlinedInput
                        value={values.lastName}
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="lastName"
                      />
                    </FormControl>
                    {touched.lastName && errors.lastName && (
                      <FormHelperText error> {errors.lastName} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      className={classes.formControl}
                    >
                      <InputLabel>Email Address</InputLabel>
                      <OutlinedInput
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="email"
                      />
                    </FormControl>
                    {touched.email && errors.email && (
                      <FormHelperText error> {errors.email} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.phone && errors.phone)}
                      className={classes.formControl}
                    >
                      <InputLabel>Phone</InputLabel>
                      <OutlinedInput
                        value={values.phone}
                        type="number"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="phone"
                      />
                    </FormControl>
                    {touched.phone && errors.phone && (
                      <FormHelperText error> {errors.phone} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={3}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.country && errors.country)}
                      className={classes.formControl}
                    >
                      <InputLabel>Country</InputLabel>
                      <OutlinedInput
                        value={values.country}
                        name="country"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="country"
                      />
                    </FormControl>
                    {touched.country && errors.country && (
                      <FormHelperText error> {errors.country} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.state && errors.state)}
                      className={classes.formControl}
                    >
                      <InputLabel>State</InputLabel>
                      <OutlinedInput
                        value={values.state}
                        name="state"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="state"
                      />
                    </FormControl>
                    {touched.state && errors.state && (
                      <FormHelperText error> {errors.state} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.city && errors.city)}
                      className={classes.formControl}
                    >
                      <InputLabel>City</InputLabel>
                      <Select
                        value={values.city}
                        onChange={handleChange}
                        onClose={handleCityClose}
                        open={openCity}
                        onOpen={handleCityOpen}
                        name="city"
                        label="city"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {config.cities.map((city) => (
                          <MenuItem value={city}>{city}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.city && errors.city && (
                      <FormHelperText error>{errors.city}</FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  {/* <Grid item xs={12} sm={3}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.doorNo && errors.doorNo)}
                      className={classes.formControl}
                    >
                      <InputLabel>Door No</InputLabel>
                      <OutlinedInput
                        value={values.doorNo}
                        type="number"
                        name="doorNo"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="doorNo"
                      />
                    </FormControl>
                    {touched.doorNo && errors.doorNo && (
                      <FormHelperText error> {errors.doorNo} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid> */}
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
};

export default EditProfile;
