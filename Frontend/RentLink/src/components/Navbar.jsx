import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
const {logout} = useAuth();
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold">
        RentLink
      </Link>
      <button onClick={()=>logout()}>Log out</button>
    </nav>
  );
};

export default Navbar;
