import { useEffect, useState } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Grow, Slide, Zoom } from '@mui/material';
// axios
import axiosService from 'utils/axiosService';
// project imports
import RevenueCard from 'ui-component/cards/RevenueCard';
import HoverSocialCard from 'ui-component/cards/HoverSocialCard';
import { gridSpacing } from 'store/constant';

// assets
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

//
import DashboardDeposits from './deposits';

const Dashboard = () => {
    const theme = useTheme();
    const [dashboard, setDashboard] = useState<any>();
    const [depositUpdate, setDepositUpdate] = useState(false);
    useEffect(() => {
        setDepositUpdate(false);
        const init = async () => {
            try {
                await axiosService.get(`dashboard`).then((resp) => {
                    if (resp.data.success === true) {
                        setDashboard(resp.data.response);
                    }
                });
            } catch (e) {
                console.log(e);
            }
        };
        init();
    }, [depositUpdate]);
    return (
        <Grid container>
            <Grid container>
                <Grid item xs={12} lg={12} md={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 500 }}>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Deposit"
                                    secondary={`৳${dashboard?.totalDeposit}`}
                                    content={`৳${dashboard?.lastMonthDeposit} last month`}
                                    iconPrimary={MonetizationOnTwoToneIcon}
                                    color={theme.palette.secondary.main}
                                />
                            </Grid>
                        </Grow>
                        <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1000 }}>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Fund Raising"
                                    secondary={`৳${dashboard?.totalFundRaising}`}
                                    content="20% Increase"
                                    iconPrimary={PaymentsIcon}
                                    color={theme.palette.primary.main}
                                />
                            </Grid>
                        </Grow>
                        <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 1500 }}>
                            <Grid item xs={12} lg={4}>
                                <RevenueCard
                                    primary="Fine"
                                    secondary={`৳${dashboard?.totalFine}`}
                                    content="20% Increase"
                                    iconPrimary={MoneyOffIcon}
                                    color={theme.palette.error.main}
                                />
                            </Grid>
                        </Grow>

                        {/* <Grid item xs={12} lg={3}>
                        <RevenueCard
                            primary="Fine"
                            secondary={`৳${dashboard?.totalFine}`}
                            content="20% Increase"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.info.main}
                        />
                    </Grid> */}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={2}>
                <Zoom in timeout={400}>
                    <Grid item xs={12} lg={3} sm={6}>
                        <HoverSocialCard
                            primary="Total Users"
                            secondary={dashboard?.totalUsers}
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                </Zoom>
                <Zoom in timeout={600}>
                    <Grid item xs={12} lg={3} sm={6}>
                        <HoverSocialCard
                            primary="Total Account"
                            secondary={dashboard?.totalAccounts}
                            iconPrimary={SupervisedUserCircleIcon}
                            color={theme.palette.info.main}
                        />
                    </Grid>
                </Zoom>
                <Zoom in timeout={800}>
                    <Grid item xs={12} lg={3} sm={6}>
                        <HoverSocialCard
                            primary="IFSA-1 Account"
                            secondary={dashboard?.ifsa1Accounts}
                            iconPrimary={LooksOneIcon}
                            color={theme.palette.dark.main}
                        />
                    </Grid>
                </Zoom>
                <Zoom in timeout={1000}>
                    <Grid item xs={12} lg={3} sm={6}>
                        <HoverSocialCard
                            primary="IFSA-2 Account"
                            secondary={dashboard?.ifsa2Accounts}
                            iconPrimary={LooksTwoIcon}
                            color={theme.palette.error.main}
                        />
                    </Grid>
                </Zoom>
            </Grid>
            <Slide direction="up" in mountOnEnter unmountOnExit timeout={1000}>
                <Grid container marginTop={4}>
                    <DashboardDeposits deposits={dashboard?.deposits} setDepositUpdate={(value: boolean) => setDepositUpdate(value)} />
                </Grid>
            </Slide>
        </Grid>
    );
};

export default Dashboard;
