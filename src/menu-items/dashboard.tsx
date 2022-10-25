// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDashboard,
    IconDeviceAnalytics,
    IconUsers,
    IconReportMoney,
    IconUserPlus,
    IconCurrencyTaka,
    IconCirclePlus
} from '@tabler/icons';
import { OverrideIcon } from 'types';
// constant
const icons = {
    IconCirclePlus,
    IconCurrencyTaka,
    IconUserPlus,
    IconUsers,
    IconDashboard,
    IconDeviceAnalytics,
    IconReportMoney
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

export interface DashboardMenuProps {
    id: string;
    title: React.ReactNode | string;
    type: string;
    children: {
        id: string;
        title: React.ReactNode | string;
        type: string;
        url: string;
        icon: OverrideIcon;
        breadcrumbs: boolean;
    }[];
}

const dashboard: DashboardMenuProps = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
        // {
        //     id: 'default',
        //     title: <FormattedMessage id="default" />,
        //     type: 'item',
        //     url: '/dashboard/default',
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'analytics',
        //     title: <FormattedMessage id="analytics" />,
        //     type: 'item',
        //     url: '/dashboard/analytics',
        //     icon: icons.IconDeviceAnalytics,
        //     breadcrumbs: false
        // }
        // {
        //     id: 'users',
        //     title: <FormattedMessage id="users" />,
        //     type: 'item',
        //     url: '/user-list',
        //     icon: icons.IconUsers,
        //     breadcrumbs: true
        // },
        // {
        //     id: 'addUser',
        //     title: <FormattedMessage id="addUser" />,
        //     type: 'item',
        //     url: '/add-user',
        //     icon: icons.IconUserPlus,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'accounts',
        //     title: <FormattedMessage id="accounts" />,
        //     type: 'item',
        //     url: '/accounts',
        //     icon: icons.IconCurrencyTaka,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'addAccount',
        //     title: <FormattedMessage id="addAccount" />,
        //     type: 'item',
        //     url: '/add-account',
        //     icon: icons.IconCirclePlus,
        //     breadcrumbs: false
        // },
        // {
        //     id: 'deposits',
        //     title: <FormattedMessage id="deposits" />,
        //     type: 'item',
        //     url: '/deposits',
        //     icon: icons.IconReportMoney,
        //     breadcrumbs: true
        // }
    ]
};

export default dashboard;
