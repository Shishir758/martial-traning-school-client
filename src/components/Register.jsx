import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './provider/AuthProviders';
import { getAuth, signInWithPopup, updateProfile, GoogleAuthProvider } from "firebase/auth";
import useTitle from '../useTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Register = () => {
  useTitle('Register');
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const providerGoogle = new GoogleAuthProvider();
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();

  const validatePassword = (value) => {
    // Check if password is at least 6 characters long
    if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    // Check if password contains at least one capital letter
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one capital letter';
    }

    // Check if password contains at least one special character
    if (!/[!@#$%^&*]/.test(value)) {
      return 'Password must contain at least one special character';
    }

    return true;
  };

  const onSubmit = (data) => {
    const { email, password, username, profilePhoto } = data;
    const role = 'Student';
    const userData = { email, password, username, photoUrl: profilePhoto, role };

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username, photoURL: profilePhoto
        }).then(() => {
          setError('');
          setSuccess('Registration successful!');
          navigate('/');
        }).catch((error) => {
          setError(error.message);
        });
      })
      .catch((error) => {
        setError(error.message);
      });

    fetch('http://localhost:http://localhost:5000users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userData)
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({
          title: 'Success!',
          text: 'Registartion Successfull.',
          icon: 'info',
          confirmButtonText: 'Close',
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const googleSignIn = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        const user = result.user;
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmValue = e.target.value;
    setPasswordConfirm(confirmValue);
    setPasswordMatch(confirmValue === watch('password'));
  };
  
  return (
    <>
      <Header />
      <div className="w-full max-w-md mx-auto">
        <p className="text-center font-bold text-gray-500 text-2xl mt-5">
          Please Register
        </p>
        <p className="text-center font-bold text-green-500 text-2xl mt-3">
          {success}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="username"
              {...register('username', { required: true })}
            />
            {errors.username && <p className="text-red-500 text-md italic">Username is required</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              name="email"
              placeholder="Email Address"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="text-red-500 text-md italic">Email is required</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                {...register('password', { required: true, validate: validatePassword })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-md italic">
                {errors.password.type === 'required'
                  ? 'Password is required'
                  : 'Password must contain minimum 6 characters with at least one capital letter and one special character'}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) => value === watch('password')
                })}
                onChange={handleConfirmPasswordChange}
              />
              <span className="absolute top-3 right-2 text-gray-500 cursor-pointer">
                {passwordMatch ? 'Matched' : 'Not Matched'}
              </span>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePhoto">
              Profile Picture URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="profilePhoto"
              type="text"
              placeholder="Profile Picture URL"
              {...register('profilePhoto')}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting}
            >
              Register
            </button>
            <Link
              className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"'
              to='/login'
            >
              Have an account? Login
            </Link>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            onClick={googleSignIn}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isSubmitting}
          >
            Signup with Google
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
