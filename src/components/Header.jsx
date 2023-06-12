import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from './provider/AuthProviders';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import logo from '../assest/logo.png';

const Header = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`https://assignment-twelve-server-pi.vercel.app/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [user]);

  const admin = users.find((role) => role.role === 'Admin');
  // const student = users.find((role) => role.role === 'student');
  const instructor = users.find((role) => role.role === 'Instructor');

  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    logOut()
      .then(() => { })
      .catch((error) => {
      });
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0">
        <img src={logo} className="h-[65px] w-[200px]" alt="" />
      </div>

      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-red-600 border-red-600 hover:text-black hover:border-black"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className={`${isMenuOpen ? '' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>

        <div className="text-sm lg:flex-grow text-center mx-auto">
          <NavLink to="/" className={`block mt-4 lg:inline-block lg:mt-0 font-bold hover:text-blue-500 mr-4 text-xl ${isActive('/') ? 'text-blue-500' : ''}`}
            isActive={isActive}>Home
          </NavLink>
          <NavLink to="/instructors"
            className={`block mt-4 lg:inline-block lg:mt-0 font-bold hover:text-blue-500 mr-4 text-xl ${isActive('/instructors') ? 'text-blue-500' : ''}`}
            isActive={isActive}
          >
            Instructors
          </NavLink>
          <NavLink
            to="/classes"
            className={`block mt-4 lg:inline-block lg:mt-0 font-bold hover:text-blue-500 mr-4 text-xl ${isActive('/classes') ? 'text-blue-500' : ''}`}
            isActive={isActive}
          >
            Classes
          </NavLink>
        </div>

        <div>
          {!user ? (
            <React.Fragment>
              <NavLink
                exact
                to="/register"
                className={`block mt-4 lg:inline-block lg:mt-0 font-bold hover:text-blue-500 mr-4 text-xl ${isActive('/register') ? 'text-blue-500' : ''}`}
                isActive={isActive}
              >
                Register
              </NavLink>
              <NavLink
                exact
                to="/login"
                className={`block mt-4 lg:inline-block lg:mt-0 font-bold hover:text-blue-500 mr-4 text-xl ${isActive('/login') ? 'text-blue-500' : ''}`}
                isActive={isActive}
              >
                Sign In
              </NavLink>
            </React.Fragment>
          ) : (
            <div>
              <NavLink
                to="/dashboard"
                className={`inline-block text-xl px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 last-child ${isActive('/dashboard') ? 'text-blue-500' : ''}`}
                isActive={isActive}
              >
                Dashboard
              </NavLink>

              {admin && (
                <NavLink
                  to="/addclass"
                  className={`inline-block text-xl px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 last-child ${isActive('/addclass') ? 'text-blue-500' : ''}`}
                  isActive={isActive}
                >
                  Add Class
                </NavLink>
              )}
               {instructor && (
                <NavLink
                  to="/addclass"
                  className={`inline-block text-xl px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 last-child ${isActive('/addclass') ? 'text-blue-500' : ''}`}
                  isActive={isActive}
                >
                  Add Class
                </NavLink>
              )}

              <button
                onClick={handleLogin}
                className="inline-block text-xl px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 last-child"
              >
                Log Out
              </button>
              {user && (
                <img
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                  src={user.photoURL}
                  className="h-[45px] w-[45px] rounded-full inline-block"
                  alt=""
                />
              )}
            </div>
          )}
        </div>
        <Tooltip id="my-tooltip" />
      </div>
    </nav>
  );
};

export default Header;
