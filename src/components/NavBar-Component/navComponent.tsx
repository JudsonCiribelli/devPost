import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { auth } from "../../services/firebaseConection";

const NavComponent = () => {
  const navigate = useNavigate();
  const handleSignOutUser = async () => {
    await signOut(auth);
    toast.error("Voltando para página de login");
    navigate("/login", { replace: true });
  };
  return (
    <nav className="flex items-center justify-between m-2 w-4xl top-0 border-1 rounded-xl p-3 bg-slate-950">
      <div className="block p-2 bg-red-400 rounded-xl">
        <h1 className="font-medium text-white">Navegue</h1>
      </div>
      <ul className="flex items-center justify-between gap-4">
        <Link to="/">
          <li className="text-lg font-medium text-white">Pagina Inicial</li>
        </Link>
        <Link to="/">
          <li className="text-lg font-medium text-white">Seus posts</li>
        </Link>
        <li>
          <button
            className="bg-white p-2 rounded-xl border-1 cursor-pointer"
            onClick={handleSignOutUser}
          >
            <FaSignOutAlt size={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavComponent;
