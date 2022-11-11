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

const memberApplication = {
    id: 'memberApplication',
    title: <FormattedMessage id="memberApplication" />,
    type: 'member',
    accessibleFor: 'member',
    children: [
        {
            id: 'deposits',
            title: <FormattedMessage id="deposits" />,
            type: 'item',
            url: '/deposits',
            icon: icons.IconReportMoney,
            breadcrumbs: false
        },
        {
            id: 'accounts',
            title: <FormattedMessage id="accounts" />,
            type: 'item',
            url: '/accounts',
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

export default memberApplication;
