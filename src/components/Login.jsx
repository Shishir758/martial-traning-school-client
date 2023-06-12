import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import app from '../../firebase.config';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from './provider/AuthProviders';
import { useNavigate, useLocation } from 'react-router-dom';
import useTitle from '../useTitle';

const auth = getAuth(app);

const Login = () => {
  useTitle('Login');
  const { loginUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const providerGoogle = new GoogleAuthProvider();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
    const { username, password } = data;

    loginUser(username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const googleSignIn = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Header />
      <div className="text-center">
        <div className="w-full max-w-xs mx-auto">
          <p className="text-center font-bold text-gray-500 text-2xl mt-5">Please Sign In</p>

          <form onSubmit={handleSubmit(handleLogin)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                {...register('username', { required: 'Username is required' })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.username ? 'border-red-500' : ''
                }`}
                id="username"
                type="text"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                  id="password"
                  type="password"
                  placeholder="******************"
                />
                <span
                  className="absolute top-3 right-2 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    const passwordField = document.getElementById('password');
                    if (passwordField.type === 'password') {
                      passwordField.type = 'text';
                    } else {
                      passwordField.type = 'password';
                    }
                  }}
                >
                  {errors.password ? 'Hide' : 'Show'}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password.message}</p>
              )}
              {error && <p className="text-red-500 text-sm italic">{error}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/register"
              >
                New here? Register
              </Link>
            </div>
          </form>
          <p className="text-center font-bold text-gray-500 text-2xl mb-5">OR Login Using</p>
        </div>

        <button className="btn p-4 text-white rounded-md font-bold bg-red-500 mb-5" onClick={googleSignIn}>
          Login With Google
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Login;
