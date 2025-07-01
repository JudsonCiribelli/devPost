import { signOut } from "firebase/auth";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import { auth } from "../../services/firebaseConection";

const HeaderComponent = () => {
  const { signed, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOutUser = async () => {
    if (!signed) {
      toast.error("Faça login para acessar o seu perfil!");
    }
    await signOut(auth);
  };

  const handleRedirectUser = () => {
    navigate("/register", { replace: true });
  };

  return (
    <header className="w-full flex items-center justify-around p-4 bg-slate-200 sm:w-full">
      <Link to="/">
        <div className="bg-amber-50 p-2 rounded-lg ">
          <h1 className="text-2xl font-medium lg:text-3xl">
            Dev
            <span className="text-2xl font-medium text-blue-500 lg:text-3xl">
              Post
            </span>
          </h1>
        </div>
      </Link>
      <Link to={`/user/${user?.uid}`}>
        {signed ? (
          <button
            className="cursor-pointer bg-amber-50 p-2 rounded-full"
            onClick={handleRedirectUser}
          >
            <IoLogOut size={32} onClick={handleSignOutUser} />
          </button>
        ) : (
          <button className="cursor-pointer bg-amber-50 p-2 rounded-full  ">
            {" "}
            <FaUser size={32} />
          </button>
        )}
      </Link>
    </header>
  );
};

export default HeaderComponent;
