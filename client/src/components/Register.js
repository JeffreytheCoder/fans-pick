import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setAlert } from '../actions/alert';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      props.setAlert('Passwords do not match', 'danger');
    } else {
      console.log(formData);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-md">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name{' '}
            </label>{' '}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              onChange={onChange}
              required
            />
          </div>{' '}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email{' '}
            </label>{' '}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              onChange={onChange}
              required
            />
          </div>{' '}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password{' '}
            </label>{' '}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
              required
            />
          </div>{' '}
          <div className="mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password2"
            >
              Confirm password{' '}
            </label>{' '}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password2"
              name="password2"
              type="password"
              placeholder="Confirm password"
              onChange={onChange}
              required
            />{' '}
            {/* <p className="text-red-500 text-xs italic">Please confirm your password.</p> */}{' '}
          </div>{' '}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register{' '}
            </button>{' '}
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Sign in
            </Link>{' '}
          </div>{' '}
        </form>{' '}
        {/* <p className="text-center text-gray-500 text-xs">
          & copy; 2020 Acme Corp.All rights reserved.{' '}
        </p>{' '} */}
      </div>{' '}
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);