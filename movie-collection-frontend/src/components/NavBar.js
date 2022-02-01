import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex justify-center bg-gray-200">
        <li className="mr-16">
          <Link
            className="transition duration-150 ease-in-out text-3xl text-purple-600 hover:text-pink-800 hover:bg-slate-700"
            to="/"
          >
            View Collection
          </Link>
        </li>
        <li className="mr-16">
          <Link
            className=" transition duration-150 ease-in-out text-3xl text-purple-600 hover:text-pink-800 hover:bg-slate-700"
            to="/submit"
          >
            Submission form
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
