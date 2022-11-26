import { useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Alert,
    AlertTitle,
    Button,
    Grid,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    FormHelperText
} from '@mui/material';
// axios
import axiosService from 'utils/axiosService';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from 'store/actions';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import useAuth from 'hooks/useAuth';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ==============================|| PROFILE 1 - CHANGE PASSWORD ||============================== //

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { user } = useAuth();
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };
    return (
        <Formik
            initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                currentPassword: Yup.string().max(255).required('Old password is required'),
                newPassword: Yup.string().max(255).required('New password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                    .required('Confirm password is required')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                try {
                    setSubmitting(true);
                    await axiosService
                        .post(
                            `change-password/${user.id}`,
                            JSON.stringify({ oldPassword: values.currentPassword, password: values.newPassword })
                        )
                        .then((response) => {
                            if (response.data.success === true) {
                                setSubmitting(false);
                                resetForm();
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
                        })
                        .catch((error) => {
                            dispatch({
                                type: SNACKBAR_OPEN,
                                open: true,
                                message: error.data.msg,
                                variant: 'alert',
                                alertSeverity: 'error'
                            });
                        });
                    // if (scriptedRef.current) {
                    //     setStatus({ success: true });
                    //     setSubmitting(false);
                    // }
                } catch (err: any) {
                    console.log(err.response);
                    setSubmitting(false);
                    dispatch({
                        type: SNACKBAR_OPEN,
                        open: true,
                        message: err.response.data.msg,
                        variant: 'alert',
                        alertSeverity: 'error'
                    });
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, resetForm, touched, values }) => (
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Alert severity="warning" variant="outlined" sx={{ borderColor: 'warning.dark' }}>
                            <AlertTitle>Alert!</AlertTitle>
                            Your Password will expire in every 3 months. So change it periodically.
                            <strong> Do not share your password</strong>
                        </Alert>
                        <Grid item xs={12} mt={2}>
                            <SubCard title="Change Password">
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
                                        <Grid item xs={12} md={6}>
                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.currentPassword && errors.currentPassword)}
                                                // sx={{ ...theme.typography.customInput }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-currentPassword-login">Current Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password-login"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={values.currentPassword}
                                                    name="currentPassword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle currentPassword visibility"
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    inputProps={{}}
                                                    label="Current Password"
                                                />
                                                {touched.currentPassword && errors.currentPassword && (
                                                    <FormHelperText error id="standard-weight-helper-text-currentPassword-login">
                                                        {errors.currentPassword}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={gridSpacing} sx={{ mb: 1.75 }}>
                                        <Grid item xs={12} md={6}>
                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.newPassword && errors.newPassword)}
                                                // sx={{ ...theme.typography.customInput }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-newPassword-login">New Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-newPassword-login"
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={values.newPassword}
                                                    name="newPassword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle newPassword visibility"
                                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    inputProps={{}}
                                                    label="New Password"
                                                />
                                                {touched.newPassword && errors.newPassword && (
                                                    <FormHelperText error id="standard-weight-helper-text-newPassword-login">
                                                        {errors.newPassword}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <FormControl
                                                fullWidth
                                                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                                // sx={{ ...theme.typography.customInput }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-confirmPassword-login">Confirm Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-confirmPassword-login"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={values.confirmPassword}
                                                    name="confirmPassword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle confirmPassword visibility"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    inputProps={{}}
                                                    label="Current Password"
                                                />
                                                {touched.confirmPassword && errors.confirmPassword && (
                                                    <FormHelperText error id="standard-weight-helper-text-confirmPassword-login">
                                                        {errors.confirmPassword}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid spacing={2} container justifyContent="flex-end" sx={{ mt: 3 }}>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" disabled={isSubmitting} type="submit">
                                                    Change Password
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item>
                                            <Button sx={{ color: theme.palette.error.main }} onClick={() => resetForm()}>
                                                Clear
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    {/* {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Sign In
                            </Button>
                        </AnimateButton>
                    </Box> */}
                                </form>
                            </SubCard>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Formik>
    );
};

export default ChangePassword;
