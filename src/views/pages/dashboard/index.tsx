import useAuth from 'hooks/useAuth';
import AdminDashboard from './adminDashboard';
import MemberDashboard from './memberDashboard';

const Dashboard = () => {
    const { user } = useAuth();

    return user?.role === 'superadmin' || user?.role === 'admin' ? <AdminDashboard /> : <MemberDashboard />;
};

export default Dashboard;
