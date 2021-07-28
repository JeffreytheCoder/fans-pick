import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    login({ email, password });
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
              for="email"
            >
              Email{' '}
            </label>{' '}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="email"
              type="text"
              placeholder="Email"
              onChange={onChange}
            />
          </div>{' '}
          <div className="mb-8">
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
            />
          </div>{' '}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign in{' '}
            </button>{' '}
            <Link
              to="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Register
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
