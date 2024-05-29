import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import COVER_IMAGE from '../resources/login-page-img.svg';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      history.push('/profile');
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <img src={COVER_IMAGE} className="w-full h-full object-cover" alt="Cover" />
      </div>
      <div className="w-1/2 h-full bg-green-100 flex flex-col p-20 justify-between">

        <div className="w-full flex flex-col">
        <h1 className="text-2xl text-red-600 font-semibold py-20">Welcome to Book Club</h1>
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-gray-800 text-3xl font-semibold mb-2">Login</h3>
            <p className="text-gray-800 text-base mb-2">Welcome Back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-1/2 flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-gray-800 py-2 my-2 bg-transparent border-b border-gray-800 outline-none focus:outline-none"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-gray-800 py-2 my-2 bg-transparent border-b border-gray-800  outline-none focus:outline-none"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" id="remember" />
              <label htmlFor="remember" className="text-sm">Remember me for 30 days</label>
            </div>
            <button
              type="submit"
              className="w-full text-white my-2 font-semibold bg-gray-800 rounded-md p-4"
            >
              Log in
            </button>
          </form>

          <div className="w-full flex items-center">
          <Link to="/signup" className="w-1/2  text-white my-2 font-semibold bg-gray-800 rounded-md p-4 text-center" >Sign Up</Link>
            {/* <button className="w-1/2  text-white my-2 font-semibold bg-gray-800 rounded-md p-4">
              
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
