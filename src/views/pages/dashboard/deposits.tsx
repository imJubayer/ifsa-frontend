import { useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import { Grid, IconButton, Typography, CircularProgress, Backdrop, Button, Tooltip } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
// project imports
import Chip from 'ui-component/extended/Chip';
// axios
import axiosService from 'utils/axiosService';

// Assets
import DetailsIcon from '@mui/icons-material/Details';
import LooksOneIcon from '@mui/icons-material/LooksOneRounded';
import LooksTwoIcon from '@mui/icons-material/LooksTwoRounded';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';

declare module '@mui/material/styles' {
    interface Components {
        [key: string]: any;
    }
}

type DepositPropsType = {
    deposits: any;
    setDepositUpdate: (value: boolean) => void;
};

const DashboardDeposits = ({ deposits, setDepositUpdate }: DepositPropsType) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const approveAlert = (index: number, id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: deposits[index].status === 0 ? `Approve for IFSA ID-${deposits[index].ifsa_id}!` : 'Disapprove!!!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: deposits[index].status === 0 ? 'Yes, approve it!' : 'Yes, disapprove!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleStatus(index, id);
                setDepositUpdate(true);
                deposits[index].status === 0 && Swal.fire('Approved!', 'Deposit has been approved.', 'success');
            }
        });
    };
    const handleStatus = (index: number, id: number) => {
        const init = async () => {
            setLoading(true);
            try {
                await axiosService.get(`deposit/approve/${id}`).then((resp) => {
                    if (resp.data.success === true) {
                        deposits[index].status = resp.data.response.status ? 1 : 0;
                        deposits[index].aprroved_at = resp.data.response.approved_at;
                        setLoading(false);
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: resp.data.msg,
                            variant: 'alert',
                            alertSeverity: resp.data.response.status ? 'success' : 'warning'
                        });
                    }
                });
            } catch (err: any) {
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: err.response.data.msg,
                    variant: 'alert',
                    alertSeverity: 'error'
                });
                setLoading(false);
            }
        };
        init();
    };

    const columns = [
        {
            name: '#',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any, rowIndex: any) => (
                    <>
                        <Typography variant="overline" gutterBottom>
                            {(dataIndex + 1).toLocaleString('en-US', {
                                minimumIntegerDigits: 2,
                                useGrouping: false
                            })}
                        </Typography>
                    </>
                )
            }
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any) => (
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="overline" gutterBottom>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => navigate(`/user/profile/${deposits[dataIndex].user.id}`)}
                                >
                                    {deposits[dataIndex].user.name}
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }
        },
        {
            name: 'ifsa_id',
            label: 'Ifsa ID',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'account_type',
            label: 'Account type',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        {deposits[dataIndex].account.account_type === 1 ? (
                            <Chip icon={<LooksOneIcon />} label="IFSA - 1" chipcolor="info" />
                        ) : (
                            <Chip icon={<LooksTwoIcon />} label="IFSA - 2" chipcolor="secondary" />
                        )}
                    </Typography>
                )
            }
        },
        {
            name: 'amount',
            label: 'Amount',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        <Chip label={`${deposits[dataIndex].amount}/-`} variant="filled" size="medium" chipcolor="info" />
                    </Typography>
                )
            }
        },
        {
            name: 'fine',
            label: 'Fine',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        <Chip label={`${deposits[dataIndex].fine}/-`} variant="filled" size="medium" chipcolor="error" />
                    </Typography>
                )
            }
        },
        {
            name: 'fund_raising',
            label: 'Fund Raising',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        <Chip label={`${deposits[dataIndex].fund_raising}/-`} variant="filled" size="medium" chipcolor="success" />
                    </Typography>
                )
            }
        },
        {
            name: 'deposit_for',
            label: 'Deposit Month',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        {moment(deposits[dataIndex].deposit_for).format('MMMM, YYYY')}
                    </Typography>
                )
            }
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any, rowData: any) =>
                    deposits[dataIndex].status ? (
                        <Chip
                            label="Paid"
                            size="small"
                            chipcolor="success"
                            onClick={() => approveAlert(dataIndex, deposits[dataIndex].id)}
                        />
                    ) : (
                        <Chip
                            label="Pending"
                            size="small"
                            chipcolor="warning"
                            onClick={() => approveAlert(dataIndex, deposits[dataIndex].id)}
                        />
                    )
            }
        },
        {
            name: 'Action',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any, rowData: any) => (
                    <>
                        <Tooltip title="Details">
                            <IconButton color="primary" size="large" onClick={() => navigate(`/deposits`)}>
                                <DetailsIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ];

    const options = {
        filterType: 'dropdown',
        print: false,
        download: false
    };
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <MUIDataTable
                        title={
                            <Grid container marginY={2}>
                                <Grid item marginY={2} xs={12}>
                                    <Typography variant="h4">
                                        Deposits{' '}
                                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        data={deposits}
                        columns={columns}
                        options={options}
                        sx={{ margin: 2 }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default DashboardDeposits;
