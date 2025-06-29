import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header className="w-full flex items-center justify-around p-4 bg-slate-200">
      <Link to="/">
        <div className="bg-amber-50 p-2 rounded-lg">
          <h1 className="text-xl font-medium">
            Dev<span className="text-xl font-medium text-blue-500">Post</span>
          </h1>
        </div>
      </Link>
      <button className="cursor-pointer bg-amber-50 p-2 rounded-full">
        <FaUser size={26} />
      </button>
    </header>
  );
};

export default HeaderComponent;
