// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

import useAuth from 'hooks/useAuth';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const { user } = useAuth();
    const navItems = menuItem.items.map((item) => {
        // switch (item.type) {
        //     case 'group':
        //         return <NavGroup key={item.id} item={item} />;
        //     case 'admin':
        //         return user?.role && user.role === 'superadmin' && <NavGroup key={item.id} item={item} />;
        //     default:
        //         return (
        //             <Typography key={item.id} variant="h6" color="error" align="center">
        //                 Menu Items Error
        //             </Typography>
        //         );
        // }
        if (item.type === 'group') {
            return <NavGroup key={item.id} item={item} />;
        }
        if (item.type === 'superadmin' && user?.role === 'superadmin') {
            return <NavGroup key={item.id} item={item} />;
        }
        if (item.type === 'all' && (user?.role === 'member' || user?.role === 'superadmin' || user?.role === 'admin')) {
            return <NavGroup key={item.id} item={item} />;
        }
        return (
            <Typography key={item.id} variant="h6" color="error" align="center" sx={{ display: 'none' }}>
                End
            </Typography>
        );
    });

    return <>{navItems}</>;
};

export default MenuList;
