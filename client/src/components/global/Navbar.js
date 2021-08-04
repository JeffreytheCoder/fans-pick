import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import logoWhite from '../../images/fanspick-logo-bg-white-small.jpg';

const Navbar = ({ auth }) => {
  const [hideMenu, setMenu] = useState(true);

  const authNavbar = (
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
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green-500 mr-6"
          >
            My pages
          </Link>
          <Link
            to="/following"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green-500 mr-6"
          >
            Following
          </Link>
        </div>

        <div class="flex flex-row items-center mt-4 lg:mt-0">
          {/* <Link
            to="/post"
            class="inline-block text-lg px-4 py-3 leading-none rounded border-2 border-white text-white bg-green-500 hover:bg-white hover:border-2 hover:text-green-500 hover:border-green-500 mr-6"
          >
            {window.location.pathname.includes('/page')
              ? 'Suggest Yours'
              : 'Create Page'}
          </Link> */}
          <button>
            <img
              class="rounded-full mr-3 h-12 w-12"
              src={auth.user ? auth.user.avatar : ''}
              alt="me"
            ></img>
          </button>
        </div>
      </div>
    </nav>
  );

  const visitorNavbar = (
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
        <div class="lg:flex-grow"></div>

        <div class="text-lg">
          <Link
            to="/post"
            class="inline-block px-4 py-3 leading-none border-2 rounded border-white text-white bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500 mt-4 lg:mt-0 mr-6"
          >
            Get started
          </Link>
          <Link
            to="/login"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-green-500 mr-6"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );

  return (
    <Fragment> {auth.isAuthenticated ? authNavbar : visitorNavbar} </Fragment>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Navbar);
