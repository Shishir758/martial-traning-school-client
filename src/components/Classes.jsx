
import React, { useContext, useEffect, useState } from 'react';
import {useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../useTitle';
import Footer from './Footer';
import Header from './Header';
import { AuthContext } from './provider/AuthProviders';

const Classes = () => {
  const { user } = useContext(AuthContext);
  const users= useLoaderData()
  const [userClasses, setUserClasses] = useState([]);

  useEffect(() => {
    const adminOrIns= users.find(use=>use.role==='Admin' || use.role==='Instructor' && use.instructorEmail===user?.email)
    setUserClasses(adminOrIns)
  }, [user, users]);


  const [classes, setClasses] = useState([])
  useEffect(() => {
    fetch('https://assignment-twelve-server-pi.vercel.app/classes')
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);
  const approvedClasses= classes.filter(clas=>clas.status==='Approved')

  useTitle('Classes')


  

  const enrollClass = (clas) => {
    const selectedClass = { clas, email: user.email };
    fetch('https://assignment-twelve-server-pi.vercel.app/selectedClasses', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(selectedClass),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  {/*TODOOOOOOOO      sweetAlart not fire*/}
  



  return (
    <><Header></Header>
     <div className="mx-5 grid lg:grid-cols-3 mb-8 gap-4 h-full">
      {approvedClasses.map((clas) => (
      <div key={clas._id} className={`${clas.seats > 0 ? 'bg-white' : 'bg-red-300'
    } rounded-lg shadow-md p-6 flex flex-col h-full`}>
      <img src={clas.classPhoto} alt="Truck" className="w-full mb-4 h-96" />
      <h3 className="text-md font-semibold mb-2">Class Name: <b>{clas.className}</b></h3>
      <h3 className="text-md font-semibold mb-2">Name of Instructor: <b>{clas.instructorName}</b></h3>
      <h3 className="text-md font-semibold mb-2">Email of Instructor: <b>{clas.instructorEmail}</b></h3>

      <div className="px-6 pt-4 pb-2 text-center">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: USD$ {clas.fees}</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Available Seat. {clas.seats}</span><br></br>
     <br></br>

    {/* //TODO Enable disable condition */}

    <>
    {clas.seats <= 0 ? (
  <button className='bg-blue-300 w-full rounded-md font-bold text-white text-1xl px-4 py-2 my-2' disabled>
    Enroll
  </button>
) : (
  <button onClick={() => enrollClass(clas)} className='bg-blue-500 w-full rounded-md font-bold text-white text-1xl px-4 py-2 my-2'>
    Enroll
  </button>
)}

    </>



{/*     {clas.seats > 0 ? (
  <button onClick={() => enrollClass(clas)} className='bg-blue-500 w-full rounded-md font-bold text-white text-1xl px-4 py-2 my-2'  >
    Enroll
  </button>
) : (
  <button className='bg-blue-300 w-full rounded-md font-bold text-white text-1xl px-4 py-2 my-2'disabled>Enroll</button>
)} */}


        </div>
        </div>
      ))}
    </div>
      <Footer />





      

    </>
  );
};

export default Classes;