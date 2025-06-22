import { Link } from "react-router-dom";


const LandlordDashboard = ()=>
            <div className="space-y-3">
          <Link
            to="/dashboard/add-property"
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Property
          </Link>


          <Link
            to="/dashboard/assign-tenant"
            className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            🔗 Assign Tenant
          </Link>


          <Link
            to="/dashboard/rent-overview"
            className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            💰 View Rent Overview
          </Link>


          <Link
            to="/dashboard/property-list"
            className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            💰 property-list
          </Link>

        </div>


export default LandlordDashboard;