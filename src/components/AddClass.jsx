import React, { useContext, useState, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import { AuthContext } from './provider/AuthProviders';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useTitle from '../useTitle';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios';

const imageLink =import.meta.env.VITE_image;

const initialState = {
  className: '',
  instructorName: '', // Retrieve this from the logged-in user
  instructorEmail: '', // Retrieve this from the logged-in user
  fees: '',
  seats: '',
  classPhoto:'',
  status:'Pending',
  feedback:''
}

const AddClass = () => {
  const imgHostingurl =`https://api.imgbb.com/1/upload?key=${imageLink}`

  useTitle('Add Class')
  const { user, loading } = useContext(AuthContext);
  const [classes, setClasses] = useState(initialState);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setClasses((prevData) => ({
          ...prevData,
          instructorName: user.displayName || '',
          instructorEmail: user.email || '',
        }));
      }
    });
  
    return unsubscribe;
  }, []);
  


const handleChange = async (e) => {
  const { name, value, files } = e.target;

  if (name === 'classPhoto') {
    const file = files[0];
    const formData = new FormData();
    formData.append('image', file);
    const response = await axios.post(imgHostingurl, formData);
    const imageUrl = response.data.data.url;
    setClasses((prevData) => ({
      ...prevData,
      [name]: imageUrl,
    }));
  } else {
    setClasses((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://assignment-twelve-server-pi.vercel.app/classes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(classes)
    })
      .then(res => res.json())
      .then(data => (data));
    Swal.fire({
      title: 'Success!',
      text: 'Successfully added class.',
      icon: 'info',
      confirmButtonText: 'Close',
    });
    setClasses(initialState);
  };



  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Header></Header>
      <div className='md:mx-48 lg:mx-48 mx-8'>
        <h2 className="text-2xl font-bold mb-4 text-center">Add A Class</h2>
        <form id="toyForm" onSubmit={handleSubmit} className="space-y-4">
          <div className='grid md:grid-cols-2 gap-8'>

            <div className="flex flex-col">
              <label htmlFor="name" className="text-lg font-semibold mb-1">
                Name of Class:
              </label>
              <input
                type="text"
                name="className"
                value={classes.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="pictureUrl" className="text-lg font-semibold mb-1">
                Upload image of the class:
              </label>
              <input
                type="file"
                name="classPhoto"
                value={classes.pictureUrl}
                onChange={handleChange}
                className="rounded-md py-2 px-3"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="quantity" className="text-lg font-semibold mb-1">
                Available Seat(s):
              </label>
              <input
                type="number"
                name="seats"
                value={classes.quantity}
                onChange={handleChange}
                className="border border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>


            <div className="flex flex-col">
              <label htmlFor="price" className="text-lg font-semibold mb-1">
                Fee of class:
              </label>
              <input
                type="number"
                name="fees"
                value={classes.price}
                onChange={handleChange}
                className="border border-gray-300 rounded-md py-2 px-3"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sellerName" className="text-lg font-semibold mb-1">
                Name of Instructor:
              </label>
              <input
                type="text"
                name="instructorName"
                value={user ? user.displayName : "N/A"}
                onChange={handleChange}
                className="border border-gray-300 rounded-md py-2 px-3"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="sellerEmail" className="text-lg font-semibold mb-1">
                Email of Instructor:
              </label>
              <input
                type="email"
                name="instructorEmail"
                value={user ? user.email : "N/A"}
                onChange={handleChange}
                className="border border-gray-300 rounded-md py-2 px-3"
              />
            </div>
          </div>

          <div className='text-center mb-8'><button
            type="submit"
            className="mr-8 mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
          >Add Class</button>

            <Link to='/dashboard'>
              <span><button type="submit"
                className=" mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
              >Back to Dashboard</button></span></Link>

          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AddClass;







