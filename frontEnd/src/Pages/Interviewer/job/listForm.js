import React, { useEffect, useState } from "react";

import config from "../../../config";

// Yub and FormIK
import * as Yup from "yup";
import { Formik } from "formik";

// axios
import axios from "axios";

import {
  FormControl,
  // FormControlLabel,
  FormHelperText,
  Grid,
  Select,
  MenuItem,
  // IconButton,
  // InputAdornment,
  InputLabel,
  //   OutlinedInput,
  // Stack,
  Box,
  Button,
  //   Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// style constant
const useStyles = makeStyles((theme) => ({
  formControl: {
    backgroundColor: config.formColor,
  },
}));

const ListForm = (props) => {
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
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const classes = useStyles();
  const [companies, setCompanies] = useState([]);

  // company list
  const [openCompany, setOpenCompany] = React.useState(false);
  const handleCompanyClose = () => {
    setOpenCompany(false);
  };
  const handleCompanyOpen = () => {
    setOpenCompany(true);
  };

  return (
    <Formik
      initialValues={{
        company: "",
      }}
      validationSchema={Yup.object().shape({
        company: Yup.string().max(255).required("Required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setSubmitting(true);
          try {
            const response = await axios.get(
              `${config.apiURL}/api/company/${values.company}`
            );

            console.log(response);
            console.log(values);

            if (response.status === 200) {
              props.handleData(response.data.data.job);
            }
            // console.log(response);
            console.log(values);
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
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={9}>
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
                    <MenuItem value={company._id}>{company.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {touched.company && errors.company && (
                <FormHelperText error>{errors.company}</FormHelperText>
              )}
              <Box mb={2} />
            </Grid>
            <Grid item xs={12} sm={3}>
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
                  Submit
                </Button>
              </Box>
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
        </form>
      )}
    </Formik>
  );
};

export default ListForm;
