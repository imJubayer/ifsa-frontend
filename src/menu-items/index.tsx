import dashboard from './dashboard';
import application from './application';
import other from './other';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [dashboard, application, other]
};

export default menuItems;
