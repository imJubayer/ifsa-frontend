import React from 'react';
import axiosService from 'utils/axiosService';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    // Checkbox,
    FormControl,
    // FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery,
    Paper,
    styled
    // DialogContentText,
    // Radio,
    // RadioGroup,
    // Divider
} from '@mui/material';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StringColorProps } from 'types';

// style constant
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary
}));

const Register = ({ ...others }) => {
    const phoneRegExp = /^((\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const theme = useTheme();
    const [pp, setPp] = React.useState<any>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    // const customization = useSelector((state: DefaultRootStateProps) => state.customization);
    const [showPassword, setShowPassword] = React.useState(false);
    // const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    // const [formats, setFormats] = React.useState<Array<string>>([]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    // const handleChangeButton = (e: any) => {
    //     console.log(e.currentTarget.value);
    // };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    // const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    //     setFormats(newFormats);
    // };

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    password: '',
                    profile_image: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                    phone: Yup.string()
                        .matches(phoneRegExp, 'Phone number is not valid')
                        .min(11, 'Must be 11 digits')
                        .max(14, 'Max 14 digits')
                        .required('Phone is required'),
                    email: Yup.string().email('Must be a valid email').max(255),
                    address: Yup.string().max(255),
                    password: Yup.string().min(8, 'Password is too short - should be 8 chars minimum.').required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                    const formData = new FormData();
                    formData.append('name', values.name);
                    formData.append('phone', values.phone);
                    formData.append('email', values.email);
                    formData.append('address', values.address);
                    formData.append('password', values.password);
                    formData.append('profile_image', pp[0]);
                    try {
                        await axiosService
                            .post(`addUser`, formData, {
                                headers: {
                                    'Content-type': 'multipart/form-data'
                                }
                            })
                            .then((response) => {
                                if (response.data.success === true) {
                                    resetForm();
                                    setSubmitting(false);
                                    dispatch({
                                        type: SNACKBAR_OPEN,
                                        open: true,
                                        message: 'Registration has been successfully completed.',
                                        variant: 'alert',
                                        alertSeverity: 'success'
                                    });
                                    setTimeout(() => {
                                        navigate('/user-list');
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
                            });
                        // .catch((error) => {
                        //     dispatch({
                        //         type: SNACKBAR_OPEN,
                        //         open: true,
                        //         message: error.response.data.msg,
                        //         variant: 'alert',
                        //         alertSeverity: 'error'
                        //     });
                        // });
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
                                <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
                                    Register
                                </Typography>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            id="name"
                                            margin="normal"
                                            name="name"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.name}
                                            error={touched.name && Boolean(errors.name)}
                                            helperText={touched.name && errors.name}
                                            // sx={{ ...theme.typography.customInput }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            id="address"
                                            margin="normal"
                                            name="address"
                                            type="text"
                                            onChange={handleChange}
                                            value={values.address}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                            // sx={{ ...theme.typography.customInput }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            id="email"
                                            margin="normal"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            // sx={{ ...theme.typography.customInput }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={matchDownSM ? 0 : 2}
                                    marginTop={1}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h5" sx={{ ...theme.typography.customInput }}>
                                            Login Credentials
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            id="phone"
                                            type="string"
                                            name="phone"
                                            label="Phone"
                                            value={values.phone}
                                            onChange={handleChange}
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                            // sx={{ ...theme.typography.customInput }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            sx={{ marginTop: 2 }}
                                            // sx={{ ...theme.typography.customInput }}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password-register"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                name="password"
                                                label="Password"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    changePassword(e.target.value);
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{}}
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                        {strength !== 0 && (
                                            <FormControl fullWidth>
                                                <Box sx={{ mb: 2 }}>
                                                    <Grid container spacing={2} alignItems="center">
                                                        <Grid item>
                                                            <Box
                                                                style={{ backgroundColor: level?.color }}
                                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                            />
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                                {level?.label}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </FormControl>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            focused
                                            margin="normal"
                                            label="Profile Image"
                                            type="file"
                                            name="profile_image"
                                            onChange={(e: any) => {
                                                console.log(e);
                                                setPp(e.target.files);
                                            }}
                                            error={touched.profile_image && Boolean(errors.profile_image)}
                                            helperText={touched.profile_image && errors.profile_image}
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
                            </Box>
                        </form>
                    </Item>
                )}
            </Formik>
        </>
    );
};

export default Register;
