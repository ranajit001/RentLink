
import { Link } from "react-router-dom";

const TenantDashboard = ()=>
            <div className="space-y-3">
          <Link
            to="/maintenance"
            className="block bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            🛠️ Submit Maintenance Request
          </Link>

          <Link
            to="/rent-history"
            className="block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            📜 View Rent History
          </Link>

          <Link
            to="/chat"
            className="block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            💬 Chat with Landlord
          </Link>

        </div>


export default TenantDashboard;