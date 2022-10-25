import { useState, useEffect } from 'react';
import axiosService from 'utils/axiosService';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid, TextField, Typography, useMediaQuery, Paper, styled, MenuItem } from '@mui/material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';

// style constant
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

const Register = ({ ...others }) => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const init = async () => {
            try {
                await axiosService.get('users').then((resp) => {
                    if (resp.data.success === true) {
                        setUsers(resp.data.response);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        };
        init();
    }, []);

    return (
        <>
            <Formik
                initialValues={{
                    user_id: '',
                    account_type: '',
                    account_lot: 1,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    user_id: Yup.number().required('User is required'),
                    account_type: Yup.number().required('Account type is required'),
                    account_lot: Yup.number().min(1).required('Lot is required').max(20)
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    try {
                        await axiosService
                            .post(`accounts`, values)
                            .then((response) => {
                                if (response.data.success === true) {
                                    resetForm();
                                    setSubmitting(false);
                                    dispatch({
                                        type: SNACKBAR_OPEN,
                                        open: true,
                                        message: 'Account has been created successfully.',
                                        variant: 'alert',
                                        alertSeverity: 'success'
                                    });
                                    setTimeout(() => {
                                        navigate('/accounts');
                                    }, 1000);
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
                                    message: error.response.data.msg,
                                    variant: 'alert',
                                    alertSeverity: 'error'
                                });
                            });
                    } catch (err: any) {
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: err.response.data.response,
                            variant: 'alert',
                            alertSeverity: 'error'
                        });
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values, resetForm }) => (
                    <Item>
                        <form noValidate onSubmit={handleSubmit} {...others}>
                            <Box sx={{ margin: 4 }}>
                                <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>
                                    Create Account
                                </Typography>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            id="outlined-select-currency"
                                            fullWidth
                                            select
                                            label="User"
                                            name="user_id"
                                            value={values.user_id}
                                            onChange={handleChange}
                                            error={touched.user_id && Boolean(errors.user_id)}
                                            helperText={touched.user_id && errors.user_id}
                                            // sx={{ ...theme.typography.customInput }}
                                        >
                                            {users.map((option: any) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Account type"
                                            id="type"
                                            margin="normal"
                                            name="account_type"
                                            onChange={handleChange}
                                            value={values.account_type}
                                            error={touched.account_type && Boolean(errors.account_type)}
                                            helperText={touched.account_type && errors.account_type}
                                        >
                                            <MenuItem value={1}>IFSA - 1</MenuItem>
                                            <MenuItem value={2}>IFSA - 2</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Share Lot"
                                            id="account_lot"
                                            margin="normal"
                                            name="account_lot"
                                            type="number"
                                            onChange={handleChange}
                                            value={values.account_lot}
                                            error={touched.account_lot && Boolean(errors.account_lot)}
                                            helperText={touched.account_lot && errors.account_lot}
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
                                            Create
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </Box>
                        </form>
                    </Item>
                )}
            </Formik>
        </>
    );
};

export default Register;
