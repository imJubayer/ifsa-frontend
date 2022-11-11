/* eslint-disable no-nested-ternary */
import * as React from 'react';
import Slide from '@mui/material/Slide';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
// material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';
// project imports
import Chip from 'ui-component/extended/Chip';
import { TransitionProps } from '@mui/material/transitions';
import moment from 'moment';

const Transition = React.forwardRef((props: TransitionProps & { children: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props} />
));

type DepositDetailsProps = {
    open: boolean;
    setOpen: (value: boolean) => void;
    details: any;
};

export default function DepositDetailsDialog({ open, setOpen, details }: DepositDetailsProps) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Deposit Details</DialogTitle>
                <Divider sx={{ pt: 1 }} />
                <DialogContent>
                    <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <Grid item xs={4}>
                            {details?.status === 1 ? (
                                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 40 }} />
                            ) : (
                                <PendingIcon color="warning" sx={{ fontSize: 40 }} />
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table
                                    sx={{
                                        '& td': {
                                            borderBottom: 'none'
                                        }
                                    }}
                                    size="small"
                                    padding="normal"
                                >
                                    <TableBody>
                                        <TableRow>
                                            <TableCell variant="head">IFSA ID</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>#{details?.ifsa_id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Name</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{details?.user.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Phone</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{details?.user.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Amount</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>
                                                <Chip label={`${details?.amount}/-`} variant="filled" size="medium" chipcolor="info" />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Fund Raising</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={`${details?.fund_raising}/-`}
                                                    variant="filled"
                                                    size="medium"
                                                    chipcolor="success"
                                                />
                                            </TableCell>
                                        </TableRow>
                                        {/* <TableRow>
                                            <TableCell variant="head">Due</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>
                                                <Chip label={`${details?.due}/-`} variant="filled" size="medium" chipcolor="error" />
                                            </TableCell>
                                        </TableRow> */}
                                        <TableRow>
                                            <TableCell variant="head">Fine</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>
                                                <Chip label={`${details?.fine}/-`} variant="filled" size="medium" chipcolor="error" />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Deposit Month</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>{moment(details?.deposit_for).format('MMMM, YYYY')}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell variant="head">Status</TableCell>
                                            <TableCell>:</TableCell>
                                            <TableCell>
                                                {details?.status === 1 ? (
                                                    <Chip label="Paid" size="small" chipcolor="success" />
                                                ) : details?.status === 2 ? (
                                                    <Chip label="Cancelled" size="small" chipcolor="error" />
                                                ) : (
                                                    <Chip label="Pending" size="small" chipcolor="warning" />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        {details?.status === 1 && (
                                            <>
                                                <TableRow>
                                                    <TableCell variant="head">Approved at</TableCell>
                                                    <TableCell>:</TableCell>
                                                    <TableCell>{moment(details?.approved_at).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head">Approved By</TableCell>
                                                    <TableCell>:</TableCell>
                                                    <TableCell>{details?.approved_by.name}</TableCell>
                                                </TableRow>
                                            </>
                                        )}
                                        {details?.status === 2 && (
                                            <TableRow>
                                                <TableCell variant="head">Cancel reason</TableCell>
                                                <TableCell>:</TableCell>
                                                <TableCell>{details?.cancel_reason}</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
