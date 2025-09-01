// utils/SidebarOptions.js
import { House, FileText, IndianRupee } from 'lucide-react';

export const landlordOptions = [
  // {
  //   key: 'applications',
  //   icon: <FileText size={20} />,
  //   label: 'Applications',
  //   path: 'applications',
  //   submenu: [
  //     { label: 'Pending', path: 'applications/pending' },
  //     // { label: 'Approved', path: 'applications/approved' },
  //     { label: 'Rejected', path: 'applications/rejected' }
  //   ]
  // },
  {
    key: 'properties',
    icon: <House size={20} />,
    label: 'Manage Properties',
    path: 'properties',
    submenu: [
      { label: 'Explore properties', path: 'properties/explore-properties' },
      { label: 'Add property', path: 'properties/add-property' },
      { label: 'My properties', path: 'properties/my-properties' }
    ]
  },
  {
    key: 'rents',
    icon: <IndianRupee size={20} />,
    label: 'Manage rents',
    path: 'rents',
    submenu: [
      { label: 'Rent records', path: 'rents/rents-overview' }
    ]        
  },
  {
    key: 'maintenance',
    icon: <House size={20} />,
    label: 'Maintenance Requests',
    path: 'maintenance',
    submenu: [
      { label: 'All requests', path: 'maintenance/manage-requests' }
    ]
  }
];

export const tenantOptions = [
  {
    key: 'properties',
    icon: <House size={20} />,
    label: 'Manage rented Properties',
    path: 'properties',
    submenu: [
      { label: 'Explore properties', path: 'properties/explore-properties' },
      { label: 'Rented properties', path: 'properties/rented-properties' },
      { label: 'Applications status', path: 'properties/application-status' },
    ]
  },
  {
    key: 'payments',
    icon: <IndianRupee size={20} />,
    label: 'Manage payments',
    path: 'payments',
    submenu: [
      { label: 'Payment records', path: 'payments/rent-records' },
      // { label: 'Unpaid rents', path: 'payments/unpaid-rents' }
    ]        
  },
  {
    key: 'maintenance',
    icon: <House size={20} />,
    label: 'Maintenance Requests',
    path: 'maintenance',
    submenu: [
      { label: 'All requests', path: 'maintenance/all-requests' },
      // { label: 'New requests', path: 'maintenance/new-request' }
    ]
  }
];
