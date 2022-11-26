import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// material-ui
import {
    Grid,
    IconButton,
    Typography,
    CircularProgress,
    Backdrop,
    Button,
    Tooltip,
    TextField,
    MenuItem,
    Card,
    CardContent
} from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
// project imports
import Chip from 'ui-component/extended/Chip';
import useAuth from 'hooks/useAuth';
// axios
import axiosService from 'utils/axiosService';

// Assets
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';
import months from './monthYear';
import DepositDetailsDialog from './details';
import EditDeposit from './edit';

declare module '@mui/material/styles' {
    interface Components {
        [key: string]: any;
    }
}

// function getMuiTheme() {
//     return createTheme({
//         components: {
//             MUIDataTableBodyCell: {
//                 styleOverrides: {
//                     root: {
//                         textAlign: 'center'
//                     }
//                 }
//             },
//             MUIDataTableHeadCell: {
//                 styleOverrides: {
//                     fixedHeader: {
//                         textAlign: 'center',
//                         '&:nth-child(6)': {
//                             paddingLeft: 125
//                         }
//                     }
//                 }
//             }
//         }
//     });
// }

const Deposits = () => {
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState(moment().month() + 1);
    const [year, setYear] = useState(moment().year());
    const [deposits, setDeposits] = useState<any[]>([]);
    const [details, setDetails] = useState<object>();
    const [depositGenerated, setDepositGenerated] = useState(false);
    const [open, setOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [depositUpdate, setDepositUpdate] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();

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

    const handleGenerateDeposit = () => {
        const init = async () => {
            setLoading(true);
            const data = JSON.stringify({ month, year });
            try {
                await axiosService.post(`add-monthly-deposit`, data).then((resp) => {
                    setLoading(false);
                    if (resp.data.success === true) {
                        setLoading(false);
                        setDepositGenerated(!depositGenerated);
                        dispatch({
                            type: SNACKBAR_OPEN,
                            open: true,
                            message: resp.data.msg,
                            variant: 'alert',
                            alertSeverity: 'success'
                        });
                    }
                });
            } catch (e) {
                console.log(e);
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
                filter: true,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: any) => (
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="overline" gutterBottom>
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => user?.role === 'superadmin' && navigate(`/user/profile/${deposits[dataIndex].user.id}`)}
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
                sort: true
            }
        },
        {
            name: 'account_type',
            label: 'Account type',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        {deposits[dataIndex].account.account_type === 1 ? (
                            <Chip label="IFSA - 1" chipcolor="info" />
                        ) : (
                            <Chip label="IFSA - 2" chipcolor="secondary" />
                        )}
                    </Typography>
                )
            }
        },
        {
            name: 'amount',
            label: 'Amount',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        <Chip label={`${deposits[dataIndex].amount}/-`} variant="filled" size="medium" chipcolor="info" />
                    </Typography>
                )
            }
        },
        // {
        //     name: 'due',
        //     label: 'Due',
        //     options: {
        //         filter: true,
        //         sort: false,
        //         customBodyRenderLite: (dataIndex: any) => (
        //             <Typography variant="overline" gutterBottom>
        //                 <Chip label={`${deposits[dataIndex].due}/-`} variant="filled" size="medium" chipcolor="error" />
        //             </Typography>
        //         )
        //     }
        // },
        {
            name: 'fine',
            label: 'Fine',
            options: {
                filter: false,
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
                filter: false,
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
        // {
        //     name: 'deposit_for',
        //     options: {
        //         hint: '?',
        //         customBodyRender: (val: any) => {
        //             const parentStyle = {
        //                 // position: 'absolute',
        //                 top: 0,
        //                 right: 0,
        //                 bottom: 0,
        //                 left: 0,
        //                 // boxSizing: 'border-box',
        //                 display: 'block',
        //                 width: '100%'
        //             };
        //             const cellStyle = {
        //                 // // boxSizing: 'border-box',
        //                 // // overflow: 'hidden',
        //                 // // textOverflow: 'ellipsis',
        //                 // whiteSpace: 'nowrap'
        //             };
        //             return (
        //                 <div style={{ position: 'relative', height: '20px', width: '200px' }}>
        //                     <div style={parentStyle}>
        //                         <div style={cellStyle}>{val}</div>
        //                     </div>
        //                 </div>
        //             );
        //         }
        //     }
        // },
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
                            title={user?.role && 'Click to disapprove'}
                            label="Paid"
                            size="small"
                            chipcolor="success"
                            onClick={() =>
                                user?.role && user.role === 'superadmin' ? approveAlert(dataIndex, deposits[dataIndex].id) : ''
                            }
                        />
                    ) : (
                        <Chip
                            title={user?.role && 'Click to approve'}
                            label="Pending"
                            size="small"
                            chipcolor="warning"
                            onClick={() =>
                                user?.role && user.role === 'superadmin' ? approveAlert(dataIndex, deposits[dataIndex].id) : ''
                            }
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
                        <Tooltip title="View">
                            <IconButton
                                color="primary"
                                size="large"
                                onClick={() => {
                                    setDetails(deposits[dataIndex]);
                                    setOpen(true);
                                }}
                            >
                                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </Tooltip>
                        {user?.role && user?.role === 'superadmin' && (
                            <Tooltip title="Edit">
                                <IconButton
                                    color="secondary"
                                    size="large"
                                    disabled={deposits[dataIndex].status}
                                    onClick={() => {
                                        setDetails(deposits[dataIndex]);
                                        // setDepositId();
                                        setEditModalOpen(true);
                                    }}
                                >
                                    <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </>
                )
            }
        }
    ];
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            setDepositUpdate(false);
            try {
                await axiosService.get(`deposits?month=${month}&year=${year}`).then((resp) => {
                    if (resp.data.success === true) {
                        resp.data.response.forEach((deposit: any) => {
                            deposit.name = deposit.user.name;
                        });
                        setDeposits(resp.data.response);
                        setLoading(false);
                    }
                });
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        init();
    }, [month, year, depositGenerated, depositUpdate]);

    // const HeaderElements = () => (
    //     <Grid container spacing={2}>
    //         <Grid item xs={4}>
    //             <TextField
    //                 id="outlined-select"
    //                 select
    //                 label="Month"
    //                 variant="outlined"
    //                 value={month}
    //                 fullWidth
    //                 size="small"
    //                 onChange={(e: any) => setMonth(e.target.value)}
    //             >
    //                 {months.map((option: any) => (
    //                     <MenuItem key={option.value} value={option.value}>
    //                         {option.label}
    //                     </MenuItem>
    //                 ))}
    //             </TextField>
    //         </Grid>
    //         <Grid item xs={4}>
    //             <TextField
    //                 id="outlined-basic"
    //                 select
    //                 label="Year"
    //                 variant="outlined"
    //                 value={year}
    //                 fullWidth
    //                 size="small"
    //                 onChange={(e: any) => setYear(e.target.value)}
    //             >
    //                 <MenuItem value={2022}>2022</MenuItem>
    //                 <MenuItem value={2023}>2023</MenuItem>
    //             </TextField>
    //         </Grid>
    //         <Grid item>
    //             <Button variant="contained" onClick={handleGenerateDeposit}>
    //                 Generate Deposit
    //             </Button>
    //         </Grid>
    //     </Grid>
    // );

    const options = {
        filterType: 'dropdown',
        print: false,
        download: false
        // resizableColumns: true,
        // customToolbar: () => <HeaderElements />
    };
    return (
        <>
            <Grid container justifyContent="center" alignItems="center">
                {user?.role && (user.role === 'superadmin' || user.role === 'admin') && (
                    <Grid item xs={12} marginBottom={2}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
                                    <Grid item xs={4}>
                                        <TextField
                                            id="outlined-select"
                                            select
                                            label="Month"
                                            variant="outlined"
                                            value={month}
                                            fullWidth
                                            size="small"
                                            onChange={(e: any) => setMonth(e.target.value)}
                                        >
                                            {months.map((option: any) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="outlined-basic"
                                            select
                                            label="Year"
                                            variant="outlined"
                                            value={year}
                                            fullWidth
                                            size="small"
                                            onChange={(e: any) => setYear(e.target.value)}
                                        >
                                            <MenuItem value={2022}>2022</MenuItem>
                                            <MenuItem value={2023}>2023</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button variant="contained" onClick={handleGenerateDeposit}>
                                            Generate Deposit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
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
                <Grid item>
                    <DepositDetailsDialog open={open} setOpen={(value: boolean) => setOpen(value)} details={details} />
                </Grid>
                <Grid item>
                    <EditDeposit
                        editModalopen={editModalOpen}
                        setEditModalOpen={(value: boolean) => setEditModalOpen(value)}
                        deposit={details}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Deposits;
