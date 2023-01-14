import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../App';

const PrivateRoutes = () => {
    const [,,loggedInUser] = useContext(ShopContext);
    const location = useLocation();
    return (
        loggedInUser.email ? <Outlet /> : <Navigate to="/login" state={{from: location}} replace />
    );
};

export default PrivateRoutes;