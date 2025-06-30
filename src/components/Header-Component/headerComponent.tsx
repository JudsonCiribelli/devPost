import { signOut } from "firebase/auth";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { auth } from "../../services/firebaseConection";

const HeaderComponent = () => {
  const { signed, user } = useContext(AppContext);

  const handleSignOutUser = async () => {
    await signOut(auth);
  };

  return (
    <header className="w-full flex items-center justify-around p-4 bg-slate-200">
      <Link to="/">
        <div className="bg-amber-50 p-2 rounded-lg">
          <h1 className="text-xl font-medium">
            Dev<span className="text-xl font-medium text-blue-500">Post</span>
          </h1>
        </div>
      </Link>
      <Link to={`/user/${user?.uid}`}>
        <button
          className="cursor-pointer bg-amber-50 p-2 rounded-full"
          onClick={handleSignOutUser}
        >
          {signed ? <IoLogOut size={26} /> : <FaUser size={26} />}
        </button>
      </Link>
    </header>
  );
};

export default HeaderComponent;
