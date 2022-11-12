// material-ui
import { Grid, Typography } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
// project imports
import Chip from 'ui-component/extended/Chip';

import moment from 'moment';

type AccountDepositPropsType = {
    deposits: any;
};

const AccountDepositDetails = ({ deposits }: AccountDepositPropsType) => {
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
            label: 'Deposit for',
            options: {
                filter: false,
                sort: true,
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
                    deposits[dataIndex].status === 1 ? (
                        <Chip label="Active" size="small" chipcolor="success" />
                    ) : (
                        <Chip label="Pending" size="small" chipcolor="warning" />
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
                    data={deposits}
                    columns={columns}
                    options={options}
                    sx={{ margin: 2 }}
                />
            </Grid>
        </Grid>
    );
};

export default AccountDepositDetails;
