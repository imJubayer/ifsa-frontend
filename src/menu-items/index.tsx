import dashboard from './dashboard';
import adminApplication from './adminApplication';
import memberApplication from './memberApplication';
import other from './other';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
    items: [dashboard, adminApplication, memberApplication, other]
};

export default menuItems;
