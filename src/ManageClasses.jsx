import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './components/Footer';
import Header from './components/Header';
import "animate.css";

export const api = axios.create({
  baseURL: 'https://assignment-twelve-server-pi.vercel.app/',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.message);
    return Promise.reject(error);
  }
);



const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/classes');
      const data = response.data;
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, updateType) => {
    try {
      setIsLoading(true);
      let updateStatusData = {};
      if (updateType === 'Approved') {
        updateStatusData = { status: 'Approved' };
      } else if (updateType === 'Deny') {
        updateStatusData = { status: 'Denied' };
      }
      await api.patch(`/classes/${id}`, updateStatusData);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
      
    return (
        <>
        <Header/>
        <h1 className='mb-8 font-bold text-4xl text-center text-orange-500'>All class Management Dashboard</h1>
        <div className="mx-5 grid lg:grid-cols-3 mb-8 gap-4 h-full">
      {classes.map((clas) => (
        <div key={clas._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
          <img src={clas.classPhoto} alt="Truck" className="w-full mb-4 h-96" />
          <h3 className="text-md font-semibold mb-2">Class Name: <b>{clas.className}</b></h3>
          <h3 className="text-md font-semibold mb-2">Name of Instructor: <b>{clas.instructorName}</b></h3>
          <h3 className="text-md font-semibold mb-2">Email of Instructor: <b>{clas.instructorEmail}</b></h3>
    
          <div className="px-6 pt-4 pb-2 text-center">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: USD$ {clas.fees}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Available Seat. {clas.seats}</span><br></br>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Class Status: <b>{clas.status}</b></span><br></br>
         
          {clas.status === 'Pending' && (<>
          <button onClick={()=>updateStatus(clas._id, "Approved")} className='bg-blue-500 rounded-md text-white text-bold px-4 py-2 my-2'>Approve</button>
        <button onClick={()=>updateStatus(clas._id, "Deny")} className='bg-red-500 rounded-md mx-2 text-white text-bold px-4 py-2 my-2'>
        Deny</button>
        <button className='bg-orange-400 rounded-md text-white text-bold px-4 py-2 my-2'>
        Send Feedback</button></>
        )
        }
       {(clas.status === 'Approved' || clas.status === 'Denied') && (
  <>
    <button className='bg-blue-300 rounded-md text-white text-bold px-4 py-2 my-2' disabled> Approve</button>
    <button className='bg-red-300 rounded-md mx-2 text-white text-bold px-4 py-2 my-2' disabled>
      Deny
    </button>

    <Link to={`/feedback/${clas._id}`}><button className='bg-orange-400 rounded-md text-white text-bold px-4 py-2 my-2'>
      Feedback
    </button></Link>
  </>
)}
</div></div>))}</div>
        <Footer/>
        </>
    );};

export default ManageClasses;