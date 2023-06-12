import React, { useContext } from 'react';
import { AuthContext } from './provider/AuthProviders';
import logo from '../assest/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

function Footer() {

  const { loading } = useContext(AuthContext);

  if (loading) {
    return
  }

  return (
    <footer className=" py-6 mt-5">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/3 text-center">
        <div className="flex items-center flex-shrink-0">
        <img src={logo} className="h-[65px] w-[200px] mx-auto" alt=""/>
        </div>
          <p className="text-gray-600">Your spirit is the true shield.</p>
        </div>

        <div className="w-full md:w-1/3 text-center my-4">
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-gray-600">
            Email: info@taekwondo.com<br />
            Phone: 123-456-7890<br />
            Address: 123 Main St, City, State
          </p>
        </div>
        
        <div className="w-full md:w-1/3 text-center mb-4">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center">
          <a href="#" className="text-blue-500 hover:text-gray-600 mr-2">
          <FontAwesomeIcon style={{ width: "30px", height: "30px" }}  icon={faFacebook}/></a>
          <a href="#" className="text-blue-500 hover:text-gray-600 mr-2">
          <FontAwesomeIcon style={{ width: "30px", height: "30px" }} icon={faTwitter}/></a>
          <a href="#" className="text-blue-500 hover:text-gray-600 mr-2">
          <FontAwesomeIcon style={{ width: "30px", height: "30px" }} icon={faInstagram}/></a>
          <a href="#" className="text-blue-500 hover:text-gray-600 mr-2">
          <FontAwesomeIcon style={{ width: "30px", height: "30px" }} icon={faYoutube}/></a>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4">
      <p className="text-center text-gray-600">
        &copy; 2023 Taekwondo. All rights reserved.
      </p>
    </div>
  </footer>
  
  );
}

export default Footer;
