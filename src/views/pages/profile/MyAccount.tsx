import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Grid } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import MUIDataTable from 'mui-datatables';
// project imports
import Chip from 'ui-component/extended/Chip';
import moment from 'moment';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// ==============================|| PROFILE 1 - MY ACCOUNT ||============================== //

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

type AccountProps = {
    user: any;
};

const MyAccount = ({ user }: AccountProps) => {
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
            name: 'ifsa_id',
            label: 'IFSA ID',
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: 'amount',
            label: 'Amount',
            options: {
                filter: false,
                sort: false
            }
        },
        // {
        //     name: 'due',
        //     label: 'Due',
        //     options: {
        //         filter: false,
        //         sort: false
        //     }
        // },
        {
            name: 'fine',
            label: 'Fine',
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: 'fund_raising',
            label: 'Fund Raising',
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: 'deposit_for',
            label: 'Deposit Month',
            options: {
                filter: false,
                sort: false,
                // empty: true,
                customBodyRender: (value: any) => (
                    <Typography variant="overline" gutterBottom>
                        {moment(value).format('MMMM, YYYY')}
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
                customBodyRender: (data: any, dataIndex: any, rowIndex: any) =>
                    data === 1 ? (
                        <Chip label="Paid" size="small" chipcolor="success" />
                    ) : (
                        <Chip label="Pending" size="small" chipcolor="warning" />
                    )
            }
        }
    ];
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const options = {
        filterType: 'dropdown',
        print: false,
        download: false
        // resizableColumns: true,
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title="Account Details">
                    {user?.accounts?.map((account: any) => (
                        <Accordion key={account.id} expanded={expanded === account.id} onChange={handleChange(account.id)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Typography>IFSA-{account.id}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h5">{account.amountDetails.totalAmount}/-</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <MUIDataTable
                                            title={
                                                <Grid container marginY={2}>
                                                    <Grid item marginY={2} xs={12}>
                                                        <Typography variant="h4">Deposits</Typography>
                                                    </Grid>
                                                </Grid>
                                            }
                                            data={account.deposits}
                                            columns={columns}
                                            options={options}
                                            sx={{ margin: 2 }}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </SubCard>
            </Grid>
        </Grid>
    );
};

export default MyAccount;
