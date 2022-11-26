// material-ui
import { Button, Grid, TextField, Box } from '@mui/material';

import axiosService from 'utils/axiosService';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import useAuth from 'hooks/useAuth';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //

const PersonalAccount = () => {
    const { user, updateProfile } = useAuth();
    const dispatch = useDispatch();
    return (
        <>
            <Formik
                initialValues={{
                    name: user?.name,
                    email: user?.email,
                    gender: user?.gender,
                    address: user?.address,
                    fatherName: user?.father_name,
                    motherName: user?.mother_name,
                    phone: user?.phone,
                    nationalId: user?.national_id,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    fatherName: Yup.string().max(255).required('Father name is required'),
                    motherName: Yup.string().max(255).required('Mother name is required'),
                    address: Yup.string().max(255).required('Address is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    // console.log(values);
                    const formData = new FormData();
                    formData.append('name', values.name);
                    formData.append('email', values.email);
                    formData.append('gender', values.gender);
                    formData.append('address', values.address);
                    formData.append('father_name', values.fatherName);
                    formData.append('mother_name', values.motherName);
                    formData.append('national_id', values.nationalId);
                    try {
                        setSubmitting(true);
                        await axiosService
                            .post(`edit-user/${user.id}`, formData, {
                                headers: {
                                    'Content-type': 'multipart/form-data'
                                }
                            })
                            .then((response) => {
                                if (response.data.success === true) {
                                    updateProfile();
                                    setSubmitting(false);
                                    dispatch({
                                        type: SNACKBAR_OPEN,
                                        open: true,
                                        message: response.data.msg,
                                        variant: 'alert',
                                        alertSeverity: 'success'
                                    });
                                } else {
                                    dispatch({
                                        type: SNACKBAR_OPEN,
                                        open: true,
                                        message: response.data.msg,
                                        variant: 'alert',
                                        alertSeverity: 'error'
                                    });
                                }
                            });
                    } catch (err: any) {
                        console.log(err.response);
                        // setSubmitting(false);
                        // dispatch({
                        //     type: SNACKBAR_OPEN,
                        //     open: true,
                        //     message: err.response.data.msg,
                        //     variant: 'alert',
                        //     alertSeverity: 'error'
                        // });
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, resetForm, touched, values }) => (
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={6}>
                            <SubCard title="Personal Information">
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                id="name"
                                                fullWidth
                                                type="text"
                                                label="Name"
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                id="fatherName"
                                                fullWidth
                                                type="text"
                                                label="Father Name"
                                                name="fatherName"
                                                value={values.fatherName}
                                                onChange={handleChange}
                                                error={touched.fatherName && Boolean(errors.fatherName)}
                                                helperText={touched.fatherName && errors.fatherName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                id="motherName"
                                                fullWidth
                                                type="text"
                                                label="Mother Name"
                                                name="motherName"
                                                value={values.motherName}
                                                onChange={handleChange}
                                                error={touched.motherName && Boolean(errors.motherName)}
                                                helperText={touched.motherName && errors.motherName}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                id="outlined-multiline-address"
                                                label="Address"
                                                multiline
                                                fullWidth
                                                rows={3}
                                                name="address"
                                                value={values.address}
                                                onChange={handleChange}
                                                error={touched.address && Boolean(errors.address)}
                                                helperText={touched.address && errors.address}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                id="nationalId"
                                                fullWidth
                                                type="text"
                                                label="National ID"
                                                name="nationalId"
                                                value={values.nationalId}
                                                onChange={handleChange}
                                                error={touched.nationalId && Boolean(errors.nationalId)}
                                                helperText={touched.nationalId && errors.nationalId}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box sx={{ mt: 4 }}>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color={undefined}
                                                sx={{ backgroundColor: '#07c0e7' }}
                                            >
                                                Save
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </form>
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SubCard title="Social Information">
                                <form noValidate autoComplete="off">
                                    <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                                        <Grid item>
                                            <FacebookIcon />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <TextField fullWidth label="Facebook Profile Url" />
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" size="small" color="secondary">
                                                    Connect
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                                        <Grid item>
                                            <TwitterIcon />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <TextField fullWidth label="Twitter Profile Url" />
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" size="small" color="secondary">
                                                    Connect
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                    <Grid container alignItems="center" spacing={gridSpacing}>
                                        <Grid item>
                                            <LinkedInIcon />
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <TextField fullWidth label="LinkedIn Profile Url" />
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" size="small" color="secondary">
                                                    Connect
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            </SubCard>
                        </Grid>
                    </Grid>
                )}
            </Formik>
        </>
    );
};

export default PersonalAccount;
