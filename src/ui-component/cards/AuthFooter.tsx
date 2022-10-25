// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://ifsa.com" target="_blank" underline="hover">
            ifsa.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://ifsa.com" target="_blank" underline="hover">
            &copy; ifsa.com
        </Typography>
    </Stack>
);

export default AuthFooter;
