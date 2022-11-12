import useAuth from 'hooks/useAuth';
import AdminAccounts from './AccountsAdmin';
import MemberAccounts from './AccountsMember';

const Accounts = () => {
    const { user } = useAuth();
    return user && (user?.role === 'superadmin' || user?.role === 'admin') ? <AdminAccounts /> : <MemberAccounts />;
};

export default Accounts;
