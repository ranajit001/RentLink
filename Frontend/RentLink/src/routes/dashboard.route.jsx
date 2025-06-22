import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import LandlordDashboard from '../pages/Landlord/LandlordDashboard';
import TenantDashboard from '../pages/Tenant/TenantDashboard';


//landlord jsx
import AddProperty from '../pages/Landlord/AddProperty';
import PropertyList from '../pages/Landlord/PropertyList';
import AssignTenant from '../pages/Landlord/AssignTenant';
import RentOverview from '../pages/Landlord/RentOverview';


const DashboardRouter = () => {
  const { auth } = useAuth();
  const user = auth?.user;

  if (!user) return null;

  return (
    <Routes>
      <Route path="" element={user.role === 'landlord' ? <LandlordDashboard /> : <TenantDashboard />} />
      <Route path="add-property" element={<AddProperty />} />
      <Route path="property-list" element={<PropertyList />} />
      <Route path="assign-tenant" element={<AssignTenant />} />
      <Route path="rent-overview" element={<RentOverview />} />
    </Routes>
  );
};

export default DashboardRouter;
