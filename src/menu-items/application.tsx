// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconReportMoney,
    IconUsers,
    IconUserPlus,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconCurrencyTaka,
    IconBusinessplan,
    IconBrandDisqus
} from '@tabler/icons';

// constant
const icons = {
    IconBusinessplan,
    IconReportMoney,
    IconUsers,
    IconUserPlus,
    IconUserCheck,
    IconBasket,
    IconMessages,
    IconLayoutKanban,
    IconMail,
    IconCalendar,
    IconNfc,
    IconCurrencyTaka,
    IconBrandDisqus
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'superadmin',
    accessibleFor: 'superadmin',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'users',
                    title: <FormattedMessage id="users" />,
                    type: 'item',
                    url: '/user-list',
                    breadcrumbs: true
                },
                {
                    id: 'addUser',
                    title: <FormattedMessage id="addUser" />,
                    type: 'item',
                    url: '/add-user',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'account',
            title: <FormattedMessage id="account" />,
            type: 'collapse',
            icon: icons.IconBasket,
            children: [
                {
                    id: 'accounts',
                    title: <FormattedMessage id="accounts" />,
                    type: 'item',
                    url: '/accounts',
                    breadcrumbs: false
                },
                {
                    id: 'addAccount',
                    title: <FormattedMessage id="addAccount" />,
                    type: 'item',
                    url: '/add-account',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'deposits',
            title: <FormattedMessage id="deposits" />,
            type: 'item',
            url: '/deposits',
            icon: icons.IconReportMoney,
            breadcrumbs: true
        },
        {
            id: 'profit',
            title: <FormattedMessage id="profit" />,
            type: 'item',
            url: '/profit',
            icon: icons.IconCurrencyTaka,
            breadcrumbs: false
        },
        {
            id: 'investment',
            title: <FormattedMessage id="investment" />,
            type: 'item',
            url: '/investment',
            icon: icons.IconBusinessplan,
            breadcrumbs: false
        },
        {
            id: 'customer-service',
            title: <FormattedMessage id="customer-service" />,
            type: 'item',
            url: '/customer-service',
            icon: icons.IconBrandDisqus,
            breadcrumbs: false
        }
    ]
};

export default application;
