import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import config from "../../../config";

import * as Yup from "yup";
import { Formik } from "formik";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

function CreateJob(props) {
  const fetchData = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `${config.apiURL}/api/interviewer/${localStorage.getItem("token")}`
      );

      console.log(response);

      if (response.status === 200) {
        setCompanies(response.data.data.company);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // company list
  const [openCompany, setOpenCompany] = React.useState(false);
  const handleCompanyClose = () => {
    setOpenCompany(false);
  };
  const handleCompanyOpen = () => {
    setOpenCompany(true);
  };

  // City
  const [openCity, setOpenCity] = React.useState(false);
  const handleCityClose = () => {
    setOpenCity(false);
  };
  const handleCityOpen = () => {
    setOpenCity(true);
  };

  const initialData = {
    title: "",
    description: "",
    city: "",
    company: "",
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
              company: Yup.string().required("Required"),
              title: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              city: Yup.string().required("Required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                try {
                  console.log(values);
                  const response = await axios.post(
                    `${config.apiURL}/api/job`,
                    {
                      ...values,
                    }
                  );

                  console.log(response);
                  console.log(values);
                  props.handleCreateJob(false);

                  setStatus({ success: true });
                  setSubmitting(false);
                } catch (error) {
                  console.log("error creating", error);
                  let errors = [];
                  error.errors.map((err) => {
                    return errors.push(err.message);
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
            }) => (
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.company && errors.company)}
                      className={classes.formControl}
                    >
                      <InputLabel>Company</InputLabel>
                      <Select
                        value={values.company}
                        onChange={handleChange}
                        onClose={handleCompanyClose}
                        open={openCompany}
                        onOpen={handleCompanyOpen}
                        name="company"
                        label="company"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {companies.map((company) => (
                          <MenuItem value={company._id}>
                            {company.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.company && errors.company && (
                      <FormHelperText error>{errors.company}</FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.title && errors.title)}
                      className={classes.formControl}
                    >
                      <InputLabel>Job role</InputLabel>
                      <OutlinedInput
                        value={values.title}
                        name="title"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="title"
                      />
                    </FormControl>
                    {touched.title && errors.title && (
                      <FormHelperText error> {errors.title} </FormHelperText>
                    )}
                    <Box mb={2} />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.description && errors.description)}
                      className={classes.formControl}
                    >
                      <InputLabel>Job Description</InputLabel>
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

export default CreateJob;
