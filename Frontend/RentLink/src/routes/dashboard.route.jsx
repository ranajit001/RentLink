import { Routes, Route } from 'react-router-dom';


import ProtectedRoute from '../context/ProtectedRoute';


import { LandingPage } from '../pages/publicPages/LadingPage';
import { AuthPage } from '../pages/publicPages/AuthPage';
import { Dashboard } from '../pages/publicPages/Dashboard';
import { AllProperties } from '../pages/publicPages/AllProperties';

//landlord 
import{ AddProperty} from '../pages/Landlord/Manage Properties/AddProperty';
import { PropertyList } from '../pages/Landlord/Manage Properties/PropertyList';
import {RentOverview} from '../pages/Landlord/RentOverview';
import { LandlordMaintenanceHub } from '../pages/Landlord/MaintenanceRequests/managerequest';

//tenets 
import { RentedProperty } from '../pages/Tenant/RentedPropertyList';
import { RejectedAndPendingProperties } from '../pages/Tenant/Applicationstatus';

import { RentManagement } from '../pages/Tenant/RentManagement';
import { MaintenanceRequests } from '../pages/Tenant/MaintenanceRequest';




const DashboardRouter = () => {
  return ( 
    <Routes>
<Route path="/" element={<LandingPage />} />
<Route path="/auth" element={<AuthPage />} />

{/* Protected Dashboard layout */}
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />}>
    {/* Nested Routes rendered inside Dashboard's <Outlet /> */}

    {/* Landlord Routes */}
    <Route path="properties/add-property" element={<AddProperty />} />
    <Route path="properties/my-properties" element={<PropertyList />} />
    
    <Route path="rents/rents-overview" element={<RentOverview />} />

    <Route path="maintenance/manage-requests" element={<LandlordMaintenanceHub />} />

    {/* Tenant Routes */}
    <Route path="properties/rented-properties" element={<RentedProperty />} />
    <Route path="properties/application-status" element={<RejectedAndPendingProperties />} />

    <Route path="payments/rent-records" element={<RentManagement />} />

    <Route path='maintenance/all-requests' element={<MaintenanceRequests/>}/>




    {/* Public/Shared Route */}
    <Route path="properties/explore-properties" element={<AllProperties />} />
  </Route>
</Route>
 
    </Routes>

  );
};

export default DashboardRouter;
