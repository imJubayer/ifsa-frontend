import { useState, useEffect } from 'react';
// // material-ui
import { styled } from '@mui/material/styles';
import { Grid, Typography, CircularProgress, Backdrop } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

// project imports
// import RevenueCard from 'ui-component/cards/RevenueCard';
import { gridSpacing } from 'store/constant';

// assets
// import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
// import PaymentsIcon from '@mui/icons-material/Payments';
// import MoneyOffIcon from '@mui/icons-material/MoneyOff';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// import MUIDataTable from 'mui-datatables';
// // project imports
// import Chip from 'ui-component/extended/Chip';
// axios
import axiosService from 'utils/axiosService';
import AccountSummary from './details/Summary';
import AccountDepositDetails from './details/DepositDetails';

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
    // const theme = useTheme();
    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [loading, setLoading] = useState(false);
    const [accounts, setAccounts] = useState<any[]>([]);
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

    return (
        <Grid container>
            <Grid item xs={12}>
                {accounts &&
                    accounts.map((e: any, index) => (
                        <Accordion key={e.id} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography variant="h5" sx={{ color: 'blue' }}>
                                    IFSA-{e.id}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={gridSpacing}>
                                    <Grid item xs={12} md={4}>
                                        <AccountSummary
                                            totalAmount={e.amountDetails?.totalAmount}
                                            totalDeposit={e.amountDetails?.totalDeposit}
                                            fundRaising={e.amountDetails?.totalFundRaising}
                                            fine={e.amountDetails?.totalFine}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <AccountDepositDetails deposits={e?.deposits} />
                                    </Grid>
                                    <Grid item>
                                        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
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
