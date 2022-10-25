// material-ui
import {
    Box,
    Button,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import moment from 'moment';

// project imports
import Avatar from 'ui-component/extended/Avatar';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconEdit } from '@tabler/icons';
import PhonelinkRingTwoToneIcon from '@mui/icons-material/PhonelinkRingTwoTone';
import PinDropTwoToneIcon from '@mui/icons-material/PinDropTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

// import Avatar3 from 'assets/images/users/avatar-3.png';
import { IMAGEPATH } from 'utils/Constants';

// personal details table
/** names Don&apos;t look right */
function createData(name: string, calories?: string, fat?: string, carbs?: string, protein?: string) {
    return { name, calories, fat, carbs, protein };
}

// ==============================|| PROFILE 1 - PROFILE ||============================== //
type ProfileProps = {
    user: any;
};
const Profile = ({ user }: ProfileProps) => {
    const rows = [
        createData('Full Name', ':', user?.name),
        // createData('Fathers Name', ':', 'Mr. Deepen Handgun'),
        createData('Address', ':', 'Street 110-B Kalians Bag, Dewan, M.P. INDIA'),
        // createData('Zip Code', ':', '12345'),
        createData('Phone', ':', user?.phone),
        createData('Email', ':', user?.email),
        createData('National ID', ':', user?.national_id)
    ];
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item lg={4} xs={12}>
                <SubCard
                    title={
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar alt={user?.name} src={`${IMAGEPATH}${user?.profile_image}`} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <Typography align="left" variant="subtitle1">
                                    {user?.name}
                                </Typography>
                                <Typography align="left" variant="subtitle2">
                                    {user?.role}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Chip
                                    size="small"
                                    label={user?.status === 1 ? 'Active' : 'Inactive'}
                                    color={user?.status === 1 ? 'success' : 'error'}
                                />
                            </Grid>
                        </Grid>
                    }
                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton>
                            <ListItemIcon>
                                <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Email</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    {user?.email}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <PhonelinkRingTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Phone</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    {user?.phone}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                            <ListItemIcon>
                                <PinDropTwoToneIcon sx={{ fontSize: '1.3rem' }} />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="subtitle1">Location</Typography>} />
                            <ListItemSecondaryAction>
                                <Typography variant="subtitle2" align="right">
                                    {user?.address}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    </List>
                    <CardContent>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    {user?.accounts.length}
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Total Account
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    {user?.totalDeposit ? user?.currentBalance : 0}/-
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Total Amount
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography align="center" variant="h3">
                                    {user?.totalDue ? user?.totalDue : 0}/-
                                </Typography>
                                <Typography align="center" variant="subtitle2">
                                    Due
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </SubCard>
            </Grid>
            <Grid item lg={8} xs={12}>
                <Grid container direction="column" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <SubCard
                            title="About me"
                            secondary={
                                <Button>
                                    <IconEdit stroke={1.5} size="1.3rem" />
                                </Button>
                            }
                        >
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        Hello,I’m Anshan Handgun Creative Graphic Designer & User Experience Designer based in Website, I
                                        create digital Products a more Beautiful and usable place. Morbid accusant ipsum. Nam nec tellus at.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1">Personal Details</Typography>
                                </Grid>
                                <Divider sx={{ pt: 1 }} />
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table
                                            sx={{
                                                '& td': {
                                                    borderBottom: 'none'
                                                }
                                            }}
                                            size="small"
                                        >
                                            <TableBody>
                                                {rows.map((row, index) => (
                                                    <TableRow key={row.name + index}>
                                                        <TableCell variant="head">{row.name}</TableCell>
                                                        <TableCell>{row.calories}</TableCell>
                                                        <TableCell>{row.fat}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                    <Grid item xs={12}>
                        <SubCard title="Accounts">
                            <Grid container direction="column" spacing={1}>
                                {user?.accounts.map((account: any) => (
                                    <Grid item xs={12} key={account.id}>
                                        <Grid container>
                                            <Grid item xs={12} sm={4}>
                                                <Typography variant="subtitle1">IFSA ID: {account.id}</Typography>
                                                <Typography variant="subtitle2">
                                                    {account.account_type === 1 ? 'IFSA-1' : 'IFSA-2'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={8}>
                                                <Typography variant="subtitle1">Lot: {account.share.lot}</Typography>
                                                <Typography variant="subtitle2">
                                                    Opened at - {moment(account.created_at).format('DD MMMM, YYYY')}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
