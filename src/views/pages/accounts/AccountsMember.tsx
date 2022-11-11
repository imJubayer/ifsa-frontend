import { useState, useEffect } from 'react';
// // material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Typography, Grow } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

// project imports
import RevenueCard from 'ui-component/cards/RevenueCard';
import { gridSpacing } from 'store/constant';

// assets
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import PaymentsIcon from '@mui/icons-material/Payments';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// import MUIDataTable from 'mui-datatables';
// // project imports
// import Chip from 'ui-component/extended/Chip';
// axios
import axiosService from 'utils/axiosService';

// // Assets
// import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
// import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
// // import LooksOneIcon from '@mui/icons-material/LooksOneRounded';
// // import LooksTwoIcon from '@mui/icons-material/LooksTwoRounded';

// import moment from 'moment';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { SNACKBAR_OPEN } from 'store/actions';

// declare module '@mui/material/styles' {
//     interface Components {
//         [key: string]: any;
//     }
// }

// }

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&:before': {
        display: 'none'
    }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1)
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

const MemberAccounts = () => {
    const [expanded, setExpanded] = useState<string | false>('panel0');
    const theme = useTheme();
    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);
    console.log(loading);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const handleStatus = (index: number, id: number) => {
    //     const init = async () => {
    //         setLoading(true);
    //         try {
    //             await axiosService.get(`account/change-status/${id}`).then((resp) => {
    //                 if (resp.data.success === true) {
    //                     accounts[index].status = resp.data.response.status ? 1 : 0;
    //                     setLoading(false);
    //                     dispatch({
    //                         type: SNACKBAR_OPEN,
    //                         open: true,
    //                         message: resp.data.msg,
    //                         variant: 'alert',
    //                         alertSeverity: resp.data.response.status ? 'success' : 'warning'
    //                     });
    //                 }
    //             });
    //         } catch (e) {
    //             console.log(e);
    //             setLoading(false);
    //         }
    //     };
    //     init();
    // };
    // const columns = [
    //     {
    //         name: '#',
    //         options: {
    //             filter: false,
    //             sort: false,
    //             empty: true,
    //             customBodyRenderLite: (dataIndex: any, rowIndex: any) => (
    //                 <>
    //                     <Typography variant="overline" gutterBottom>
    //                         {(dataIndex + 1).toLocaleString('en-US', {
    //                             minimumIntegerDigits: 2,
    //                             useGrouping: false
    //                         })}
    //                     </Typography>
    //                 </>
    //             )
    //         }
    //     },
    //     {
    //         name: 'name',
    //         label: 'Name',
    //         options: {
    //             filter: false,
    //             sort: false,
    //             empty: true,
    //             customBodyRenderLite: (dataIndex: any) => (
    //                 <Grid container>
    //                     <Grid item xs={12}>
    //                         <Typography variant="overline" gutterBottom>
    //                             <Button
    //                                 variant="text"
    //                                 size="small"
    //                                 onClick={() => navigate(`/user/profile/${accounts[dataIndex].user.id}`)}
    //                             >
    //                                 {accounts[dataIndex].user.name}
    //                             </Button>
    //                         </Typography>
    //                     </Grid>
    //                 </Grid>
    //             )
    //         }
    //     },
    //     // {
    //     //     name: 'name',
    //     //     label: 'Name',
    //     //     options: {
    //     //         filter: false,
    //     //         sort: false,
    //     //         empty: true,
    //     //         customBodyRenderLite: (dataIndex: any) => (
    //     //             <Typography variant="overline" gutterBottom>
    //     //                 <Button variant="text" size="small" onClick={() => console.log(dataIndex)}>
    //     //                     {users[dataIndex].name}
    //     //                 </Button>
    //     //             </Typography>
    //     //         )
    //     //     }
    //     // },
    //     {
    //         name: 'id',
    //         label: 'Ifsa ID',
    //         options: {
    //             filter: true,
    //             sort: true
    //         }
    //     },
    //     {
    //         name: 'share',
    //         label: 'Share',
    //         options: {
    //             filter: true,
    //             sort: true,
    //             customBodyRenderLite: (dataIndex: any) => (
    //                 <Typography variant="h5" gutterBottom>
    //                     {accounts[dataIndex].share.lot}
    //                 </Typography>
    //             )
    //         }
    //     },
    //     {
    //         name: 'account_type',
    //         label: 'Account type',
    //         options: {
    //             filter: true,
    //             sort: false,
    //             customBodyRenderLite: (dataIndex: any) => (
    //                 // <Typography variant="overline" gutterBottom>
    //                 //     {accounts[dataIndex].account_type === 1 ? 'IFSA-1' : 'IFSA-2'}
    //                 // </Typography>
    //                 <Typography variant="h5" gutterBottom>
    //                     {accounts[dataIndex].account_type === 1 ? (
    //                         <Chip label="IFSA - 1" chipcolor="info" />
    //                     ) : (
    //                         <Chip label="IFSA - 2" chipcolor="secondary" />
    //                     )}
    //                 </Typography>
    //             )
    //         }
    //     },
    //     {
    //         name: 'created_at',
    //         label: 'Creation Date',
    //         options: {
    //             filter: false,
    //             sort: true,
    //             empty: true,
    //             customBodyRenderLite: (dataIndex: any) => (
    //                 <Typography variant="overline" gutterBottom>
    //                     {moment(accounts[dataIndex].created_at).format('DD MMM, YYYY')}
    //                 </Typography>
    //             )
    //         }
    //     },
    //     {
    //         name: 'status',
    //         label: 'Status',
    //         options: {
    //             filter: true,
    //             sort: false,
    //             empty: true,
    //             customBodyRenderLite: (dataIndex: any, rowData: any) =>
    //                 accounts[dataIndex].status === 1 ? (
    //                     <Chip
    //                         label="Active"
    //                         size="small"
    //                         chipcolor="success"
    //                         onClick={() => handleStatus(dataIndex, accounts[dataIndex].id)}
    //                     />
    //                 ) : (
    //                     <Chip
    //                         label="Pending"
    //                         size="small"
    //                         chipcolor="warning"
    //                         onClick={() => handleStatus(dataIndex, accounts[dataIndex].id)}
    //                     />
    //                 )
    //         }
    //     },
    //     {
    //         name: 'Action',
    //         options: {
    //             filter: false,
    //             sort: false,
    //             empty: true,
    //             customBodyRenderLite: (dataIndex: any, rowData: any) => (
    //                 <>
    //                     <Tooltip title="View">
    //                         <IconButton color="primary" size="large">
    //                             <VisibilityTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    //                         </IconButton>
    //                     </Tooltip>
    //                     <Tooltip title="Edit">
    //                         <IconButton color="secondary" size="large">
    //                             <EditTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    //                         </IconButton>
    //                     </Tooltip>
    //                 </>
    //             )
    //         }
    //     }
    // ];
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

    // const options = {
    //     filterType: 'dropdown'
    // };
    return (
        <Grid container>
            <Grid item xs={12}>
                {accounts &&
                    accounts.map((e: any, index) => (
                        <Accordion key={e.id} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography variant="h5">IFSA-{e.id}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={4}>
                                        <Grid container spacing={2} direction="column">
                                            <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 500 }}>
                                                <Grid item xs={4}>
                                                    <RevenueCard
                                                        primary="Deposit"
                                                        secondary={`৳${e.amountDetails.totalDeposit}`}
                                                        content="৳10 last month"
                                                        iconPrimary={MonetizationOnTwoToneIcon}
                                                        color={theme.palette.secondary.main}
                                                    />
                                                </Grid>
                                            </Grow>
                                            <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
                                                <Grid item xs={4}>
                                                    <RevenueCard
                                                        primary="Fund Raising"
                                                        secondary={`৳${e.amountDetails.totalFundRaising}`}
                                                        content="20% Increase"
                                                        iconPrimary={PaymentsIcon}
                                                        color={theme.palette.primary.main}
                                                    />
                                                </Grid>
                                            </Grow>
                                            <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1500 }}>
                                                <Grid item xs={4}>
                                                    <RevenueCard
                                                        primary="Fine"
                                                        secondary={`৳${e.amountDetails.totalFine}`}
                                                        content="20% Increase"
                                                        iconPrimary={MoneyOffIcon}
                                                        color={theme.palette.error.main}
                                                    />
                                                </Grid>
                                            </Grow>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={8}>
                                        <Typography>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                                            amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Enim facilis totam ipsum quam animi officia vel officiis
                                            blanditiis veritatis quo repellat debitis dolores, earum optio commodi, sapiente possimus a Rem.
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat, laudantium sit earum aliquam
                                            dolore dicta fuga temporibus ea, molestiae dignissimos atque nisi ipsa id pariatur optio ullam
                                            doloribus eos! Atque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit atque
                                            fugit sit recusandae error itaque numquam vel, laboriosam magni delectus totam aperiam, dolor
                                            similique provident ut doloremque obcaecati dolorem ipsam. Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                                            amet blandit leo lobortis eget. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                                            facilis totam ipsum quam animi officia vel officiis blanditiis veritatis quo repellat debitis
                                            dolores, earum optio commodi, sapiente possimus a Rem. Lorem ipsum dolor sit amet consectetur,
                                            adipisicing elit. Repellat, laudantium sit earum aliquam dolore dicta fuga temporibus ea,
                                            molestiae dignissimos atque nisi ipsa id pariatur optio ullam doloribus eos! Atque! Lorem ipsum
                                            dolor sit amet consectetur, adipisicing elit. Velit atque fugit sit recusandae error itaque
                                            numquam vel, laboriosam magni delectus totam aperiam, dolor similique provident ut doloremque
                                            obcaecati dolorem ipsam.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))}
            </Grid>
        </Grid>
    );
};

export default MemberAccounts;
