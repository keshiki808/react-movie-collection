import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul class="flex justify-center">
        {/* <li class="mr-16 text-3xl text-purple-600 hover:text-pink-800">Nav</li> */}
        <li class="mr-16">
          <Link class="text-3xl text-purple-600 hover:text-pink-800" to="/">
            View Collection
          </Link>
        </li>
        <li class="mr-16">
          <Link
            class="text-3xl text-purple-600 hover:text-pink-800"
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
