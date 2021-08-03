import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logoWhite from '../../images/fanspick-logo-bg-white-small.jpg';

const Navbar = () => {
  const [hideMenu, setMenu] = useState(true);

  return (
    <nav class="font-main flex items-center justify-between flex-wrap p-6 border-b-4">
      <Link to="/">
        <div class="flex items-center flex-shrink-0 mr-8">
          <img className="h-10" src={logoWhite} alt="fanspick logo"></img>
          {/* <span class="font-bold text-xl ml-2">FansPick</span> */}
        </div>
      </Link>

      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => {
            setMenu(!hideMenu);
          }}
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        class={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          hideMenu ? 'hidden' : ''
        }`}
      >
        <div class="text-lg lg:flex-grow">
          <Link
            to="/my-pages"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6"
          >
            My pages
          </Link>
          <Link
            to="/following"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-6"
          >
            Following
          </Link>
          {/* <Link
            to="/login"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Login
          </Link> */}
        </div>

        <div>
          <Link
            to="/post"
            class="inline-block px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Suggest yours
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
