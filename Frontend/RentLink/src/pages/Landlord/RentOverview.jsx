// import { useEffect, useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import baseApi from '../../utils/baseApi';

const RentOverview = () => {
  // const { auth } = useAuth();
  // const [rents, setRents] = useState([]);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   const fetchRents = async () => {
  //     try {
  //       const res = await fetch(`${baseApi}/api/landlord/rent-records`, {
  //         headers: {
  //           Authorization: `Bearer ${auth.accessToken}`,
  //         },
  //       });

  //       if (!res.ok) {
  //         const errData = await res.json();
  //         throw new Error(errData.message || 'Failed to fetch rent data');
  //       }

  //       const data = await res.json();
  //       setRents(data.rents || []);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchRents();
  // }, [auth.accessToken]);


return <h1>Not implemented in backend</h1>


  // return (
  //   <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow rounded">
  //     <h2 className="text-2xl font-semibold mb-6">💰 Rent Overview</h2>

  //     {error && (
  //       <p className="text-red-600 font-medium mb-4">{error}</p>
  //     )}

  //     {rents.length === 0 ? (
  //       <p className="text-gray-600">No rent records found.</p>
  //     ) : (
  //       <div className="overflow-x-auto">
  //         <table className="min-w-full text-left text-sm border">
  //           <thead className="bg-gray-100 text-gray-700 font-semibold">
  //             <tr>
  //               <th className="py-2 px-4 border">Tenant</th>
  //               <th className="py-2 px-4 border">Property</th>
  //               <th className="py-2 px-4 border">Amount</th>
  //               <th className="py-2 px-4 border">Status</th>
  //               <th className="py-2 px-4 border">Due Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {rents.map((rent) => (
  //               <tr key={rent._id} className="border-t">
  //                 <td className="py-2 px-4 border">{rent.tenantName || '-'}</td>
  //                 <td className="py-2 px-4 border">{rent.propertyName || '-'}</td>
  //                 <td className="py-2 px-4 border">₹ {rent.amount}</td>
  //                 <td className="py-2 px-4 border">{rent.status}</td>
  //                 <td className="py-2 px-4 border">
  //                   {new Date(rent.dueDate).toLocaleDateString()}
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default RentOverview;
