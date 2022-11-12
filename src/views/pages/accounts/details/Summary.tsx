// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import MoneyIcon from '@mui/icons-material/Money';
import PaidIcon from '@mui/icons-material/Paid';
import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

type AccountSummaryPropsType = {
    totalAmount: number | string;
    totalDeposit: number | string;
    fundRaising: number | string;
    fine: number | string;
};

const AccountSummary = ({ totalAmount, totalDeposit, fundRaising, fine }: AccountSummaryPropsType) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const blockSX = {
        p: 2.5,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };

    return (
        <Grid container alignItems="center" spacing={gridSpacing}>
            <Grid item xs={12} sm={6} lg={12}>
                <MainCard
                    sx={{
                        '& >div': {
                            padding: '0px !important'
                        },
                        '& svg': {
                            width: 45,
                            height: 45,
                            color: theme.palette.secondary.main,
                            borderRadius: '14px',
                            p: 1.25,
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.primary.light
                        }
                    }}
                >
                    <Grid container alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <MoneyIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {`৳${totalAmount}`}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        Total
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <PaidIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {`৳${totalDeposit}`}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        Total Deposit
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" spacing={0}>
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <AddBusinessIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {`৳${fundRaising}`}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        Fund Raising
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <MoneyOffCsredIcon />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {`৳${fine}`}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        Fine
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default AccountSummary;
