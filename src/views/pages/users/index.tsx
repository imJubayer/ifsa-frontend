import { useEffect, useState } from 'react';
// material-ui
import { Grid, IconButton, Typography, CircularProgress, Backdrop, Button, Tooltip } from '@mui/material';
import Avatar from 'ui-component/extended/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
// project imports
import Chip from 'ui-component/extended/Chip';
// axios
import axiosService from 'utils/axiosService';

// Assets
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import moment from 'moment';
import { IMAGEPATH } from 'utils/Constants';
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

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [users, setusers] = useState<any[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleStatus = (index: number, id: number) => {
        const init = async () => {
            setLoading(true);
            try {
                await axiosService.get(`user/change-status/${id}`).then((resp) => {
                    if (resp.data.success === true) {
                        users[index].status = resp.data.response.status ? 1 : 0;

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
            name: 'Profile',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex: any, rowIndex: any) => (
                    <Button onClick={() => navigate(`/user/profile/${users[dataIndex].id}`)}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar size="lg" alt={users[dataIndex].name} src={`${IMAGEPATH}${users[dataIndex].profile_image}`} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" variant="subtitle1" component="div">
                                    {users[dataIndex].name}
                                    {users[dataIndex].status === 1 && (
                                        <CheckCircleIcon sx={{ color: 'success.dark', width: 14, height: 14 }} />
                                    )}
                                </Typography>
                                <Typography align="left" variant="subtitle2" noWrap>
                                    {users[dataIndex].email}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Button>
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
            name: 'email',
            label: 'Email',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'phone',
            label: 'Phone',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'created_at',
            label: 'Joining Date',
            options: {
                filter: false,
                sort: true,
                empty: true,
                customBodyRenderLite: (dataIndex: any) => (
                    <Typography variant="overline" gutterBottom>
                        {moment(users[dataIndex].created_at).format('LL')}
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
                    users[dataIndex].status === 1 ? (
                        <Chip
                            label="Active"
                            size="small"
                            chipcolor="success"
                            onClick={() => handleStatus(dataIndex, users[dataIndex].id)}
                        />
                    ) : (
                        <Chip
                            label="Pending"
                            size="small"
                            chipcolor="warning"
                            onClick={() => handleStatus(dataIndex, users[dataIndex].id)}
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
                await axiosService.get('users').then((resp) => {
                    if (resp.data.success === true) {
                        setusers(resp.data.response);
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
            </Grid>
        </Grid>
    );
};

export default Users;
