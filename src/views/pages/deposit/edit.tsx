/* eslint-disable no-nested-ternary */
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import axiosService from 'utils/axiosService';
// material-ui
import {
    Button,
    Dialog,
    // DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    TextField,
    Typography,
    Box,
    // Paper,
    // styled,
    useMediaQuery
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { SNACKBAR_OPEN } from 'store/actions';

// style constant
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     // padding: theme.spacing(1),
//     color: theme.palette.text.secondary
// }));

const Transition = React.forwardRef((props: TransitionProps & { children: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
));

type editModalProps = {
    depositId?: number | string;
    editModalopen: boolean;
    setEditModalOpen: (value: boolean) => void;
    deposit: any;
};

export default function EditDeposit({ depositId, editModalopen, setEditModalOpen, deposit, ...others }: editModalProps) {
    const theme = useTheme();
    const dispatch = useDispatch();
    // const [deposit, setDeposit] = React.useState([]);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const handleClose = () => {
        setEditModalOpen(false);
    };

    // React.useEffect(() => {
    //     const init = async () => {
    //         try {
    //             await axiosService.get(`deposits/${depositId}`).then((resp) => {
    //                 if (resp.data.success === true) {
    //                     setDeposit(resp.data.response);
    //                 }
    //             });
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
    //     init();
    // }, []);

    return (
        <div>
            <Dialog
                open={editModalopen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Edit Deposit</DialogTitle>
                <Divider sx={{ pt: 1 }} />
                <DialogContent>
                    <Formik
                        initialValues={{
                            fund_raising: deposit?.fund_raising,
                            fine: deposit?.fine,
                            submit: null
                        }}
                        enableReinitialize
                        validationSchema={Yup.object().shape({
                            fund_raising: Yup.number(),
                            fine: Yup.number()
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                            deposit.fund_raising = values.fund_raising;
                            deposit.fine = values.fine;
                            try {
                                await axiosService.patch(`deposits/${deposit?.id}`, deposit).then((response) => {
                                    if (response.data.success === true) {
                                        resetForm();
                                        setSubmitting(false);
                                        setEditModalOpen(false);
                                        dispatch({
                                            type: SNACKBAR_OPEN,
                                            open: true,
                                            message: 'Updated successfully.',
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
                            <form noValidate onSubmit={handleSubmit} {...others}>
                                <Box sx={{ width: '100%' }}>
                                    <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
                                        Edit Deposit
                                    </Typography>
                                    <Grid container spacing={matchDownSM ? 0 : 2}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                fullWidth
                                                focused
                                                label="Fund Raising"
                                                id="fund_raising"
                                                margin="normal"
                                                name="fund_raising"
                                                type="number"
                                                onChange={handleChange}
                                                value={values?.fund_raising}
                                                error={touched.fund_raising && Boolean(errors.fund_raising)}
                                                helperText={touched.fund_raising && errors.fund_raising}
                                                // sx={{ ...theme.typography.customInput }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                fullWidth
                                                focused
                                                label="Fine"
                                                id="fine"
                                                margin="normal"
                                                name="fine"
                                                type="number"
                                                onChange={handleChange}
                                                value={values?.fine}
                                                error={touched.fine && Boolean(errors.fine)}
                                                helperText={touched.fine && errors.fine}
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* <Grid container spacing={matchDownSM ? 0 : 2}>
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
                                                sx={{ ...theme.typography.customInput }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl
                                                fullWidth
                                                // error={Boolean(touched.email && errors.email)}
                                                sx={{ ...theme.typography.customInput }}
                                            >
                                                <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-email-register"
                                                    type="email"
                                                    value={values.email}
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    inputProps={{}}
                                                />
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="standard-weight-helper-text--register">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
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
                                                sx={{ ...theme.typography.customInput }}
                                            />
                                        </Grid>
                                    </Grid> */}
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
                                                Update
                                            </Button>
                                        </AnimateButton>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}
