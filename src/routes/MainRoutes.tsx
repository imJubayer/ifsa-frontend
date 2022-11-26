import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// sample page routing
const Dashboard = Loadable(lazy(() => import('views/pages/dashboard')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Users = Loadable(lazy(() => import('views/pages/users')));
const AddUser = Loadable(lazy(() => import('views/pages/users/AddNewUser')));
const Profile = Loadable(lazy(() => import('views/pages/profile')));
const UserProfile = Loadable(lazy(() => import('views/pages/user-profile')));
const Deposit = Loadable(lazy(() => import('views/pages/deposit')));
const Accounts = Loadable(lazy(() => import('views/pages/accounts')));
const AddAccount = Loadable(lazy(() => import('views/pages/accounts/AddAccount')));
const ComingSoon2 = Loadable(lazy(() => import('views/pages/coming-soon')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        },
        {
            path: '/add-user',
            element: <AddUser />
        },
        {
            path: '/user-list',
            element: <Users />
        },
        {
            path: '/user/profile',
            element: <Profile />
        },
        {
            path: '/user/profile/:id',
            element: <UserProfile />
        },
        {
            path: '/deposits',
            element: <Deposit />
        },
        {
            path: '/deposits/:userId',
            element: <Deposit />
        },
        {
            path: '/accounts',
            element: <Accounts />
        },
        {
            path: '/add-account',
            element: <AddAccount />
        },
        {
            path: '/profit',
            element: <ComingSoon2 />
        },
        {
            path: '/investment',
            element: <ComingSoon2 />
        },
        {
            path: '/customer-service',
            element: <ComingSoon2 />
        }
    ]
};

export default MainRoutes;
