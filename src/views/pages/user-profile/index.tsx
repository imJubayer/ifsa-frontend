import React from 'react';
import { Link, useParams } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Tab, Tabs, CircularProgress, Backdrop } from '@mui/material';

// project imports
import Profile from './Profile';
// import PersonalAccount from './PersonalAccount';
import MyAccount from './MyAccount';
// import ChangePassword from './ChangePassword';
// import Settings from './Settings';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
// axios
import axiosService from 'utils/axiosService';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
// import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
// import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
// import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

// tabs panel
function TabPanel(props: { children: React.ReactElement; value: number; index: number }) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Profile',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    // {
    //     label: 'Personal Details',
    //     icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    // },
    {
        label: 'Accounts',
        icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    }
    // {
    //     label: 'Change Password',
    //     icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    // },
    // {
    //     label: 'Settings',
    //     icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    // }
];

// ==============================|| PROFILE 1 ||============================== //

const Profile1 = () => {
    const theme = useTheme();
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState<number>(0);
    const [user, setUser] = React.useState<object | undefined>();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    React.useEffect(() => {
        const init = async () => {
            const url = id === undefined ? `profile` : `profile/${id}`;
            setLoading(true);
            try {
                await axiosService.get(url).then((resp) => {
                    if (resp.data.success === true) {
                        setUser(resp.data.response);
                        setLoading(false);
                    }
                });
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        };
        init();
    }, [id]);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        variant="scrollable"
                        sx={{
                            mb: 3,
                            '& a': {
                                minHeight: 'auto',
                                minWidth: 10,
                                py: 1.5,
                                px: 1,
                                mr: 2.25,
                                color: theme.palette.grey[600],
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            '& a.Mui-selected': {
                                color: theme.palette.primary.main
                            },
                            '& .MuiTabs-indicator': {
                                bottom: 2
                            },
                            '& a > svg': {
                                marginBottom: '0px !important',
                                mr: 1.25
                            }
                        }}
                    >
                        {tabsOption.map((tab, index) => (
                            <Tab key={index} component={Link} to="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Profile user={user} />
                    </TabPanel>
                    {/* <TabPanel value={value} index={1}>
                        <PersonalAccount />
                    </TabPanel> */}
                    <TabPanel value={value} index={1}>
                        <MyAccount user={user} />
                    </TabPanel>
                    {/* <TabPanel value={value} index={3}>
                        <ChangePassword />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <Settings />
                    </TabPanel> */}
                </Grid>
                <Grid item>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme2) => theme2.zIndex.drawer + 1 }} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default Profile1;
