import { useEffect, useState } from 'react';
// material-ui
import { Grid, IconButton, Typography, CircularProgress, Backdrop, Button, Tooltip } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
// project imports
import Chip from 'ui-component/extended/Chip';
// axios
import axiosService from 'utils/axiosService';

// Assets
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
// import LooksOneIcon from '@mui/icons-material/LooksOneRounded';
// import LooksTwoIcon from '@mui/icons-material/LooksTwoRounded';

import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from 'store/actions';

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

const Accounts = () => {
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleStatus = (index: number, id: number) => {
        const init = async () => {
            setLoading(true);
            try {
                await axiosService.get(`account/change-status/${id}`).then((resp) => {
                    if (resp.data.success === true) {
                        accounts[index].status = resp.data.response.status ? 1 : 0;
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
                                    onClick={() => navigate(`/user/profile/${accounts[dataIndex].user.id}`)}
                                >
                                    {accounts[dataIndex].user.name}
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }
        },
        // {
        //     name: 'name',
        //     label: 'Name',
        //     options: {
        //         filter: false,
        //         sort: false,
        //         empty: true,
        //         customBodyRenderLite: (dataIndex: any) => (
        //             <Typography variant="overline" gutterBottom>
        //                 <Button variant="text" size="small" onClick={() => console.log(dataIndex)}>
        //                     {users[dataIndex].name}
        //                 </Button>
        //             </Typography>
        //         )
        //     }
        // },
        {
            name: 'id',
            label: 'Ifsa ID',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'share',
            label: 'Share',
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="h5" gutterBottom>
                        {accounts[dataIndex].share.lot}
                    </Typography>
                )
            }
        },
        {
            name: 'account_type',
            label: 'Account type',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: any) => (
                    // <Typography variant="overline" gutterBottom>
                    //     {accounts[dataIndex].account_type === 1 ? 'IFSA-1' : 'IFSA-2'}
                    // </Typography>
                    <Typography variant="h5" gutterBottom>
                        {accounts[dataIndex].account_type === 1 ? (
                            <Chip label="IFSA - 1" chipcolor="info" />
                        ) : (
                            <Chip label="IFSA - 2" chipcolor="secondary" />
                        )}
                    </Typography>
                )
            }
        },
        {
            name: 'created_at',
            label: 'Creation Date',
            options: {
                filter: false,
                sort: true,
                empty: true,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        {moment(accounts[dataIndex].created_at).format('DD MMM, YYYY')}
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
                    accounts[dataIndex].status === 1 ? (
                        <Chip
                            label="Active"
                            size="small"
                            chipcolor="success"
                            onClick={() => handleStatus(dataIndex, accounts[dataIndex].id)}
                        />
                    ) : (
                        <Chip
                            label="Pending"
                            size="small"
                            chipcolor="warning"
                            onClick={() => handleStatus(dataIndex, accounts[dataIndex].id)}
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
                            <IconButton color="primary" size="large">
                                <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton color="secondary" size="large">
                                <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
        }
    ];
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                await axiosService.get('accounts').then((resp) => {
                    if (resp.data.success === true) {
                        setAccounts(resp.data.response);
                        setLoading(false);
                    }
                });
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        init();
    }, []);

    const options = {
        filterType: 'dropdown'
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                {/* <ThemeProvider theme={getMuiTheme}>
                    <MUIDataTable
                        title={
                            <Grid container marginY={2}>
                                <Grid item marginY={2} xs={12}>
                                    <Typography variant="h5">
                                        Users{' '}
                                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                    </Typography>
                                </Grid>
                            </Grid>
                        }
                        data={users}
                        columns={columns}
                        options={options}
                        sx={{ margin: 2 }}
                    />
                </ThemeProvider> */}
                <MUIDataTable
                    title={
                        <Grid container marginY={2}>
                            <Grid item marginY={2} xs={12}>
                                <Typography variant="h5">
                                    Accounts{' '}
                                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    data={accounts}
                    columns={columns}
                    options={options}
                    sx={{ margin: 2 }}
                />
            </Grid>
        </Grid>
    );
};

export default Accounts;
