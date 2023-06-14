
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../useTitle';
import Footer from './Footer';
import Header from './Header';
import { AuthContext } from './provider/AuthProviders';
import { motion } from 'framer-motion';


const DashBoard = () => {
  useTitle('Dashboard');
  const { user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const [userClasses, setUserClasses] = useState([]);
  const [fees, setFees] = useState([]);
  const classes = useLoaderData();



  useEffect(() => {
    const usersClass = classes.filter(clas=>clas.instructorEmail===user?.email);
    setUserClasses(usersClass)
  }, [user, classes]);


  useEffect(() => {
    fetch(`https://assignment-twelve-server-pi.vercel.app/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [user]);

  useEffect(() => {
    fetch(`https://assignment-twelve-server-pi.vercel.app/selectedClasses/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyClasses(data);
      });
  }, [user]);

  const admin = users.find((role) => role.role === 'Admin');
  const student = users.find((role) => role.role === 'Student');
  const instructor = users.find((role) => role.role === 'Instructor');

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You can add this class again.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`https://assignment-twelve-server-pi.vercel.app/selectedClasses/${id}`, { method: 'delete' })
            .then(res => res.json())
            .then(data => {
              if (data.deletedCount > 0) {
                Swal.fire(
                  'Deleted!',
                  'The class has been deleted.',
                  'success'
                );
                fetch(`https://assignment-twelve-server-pi.vercel.app/selectedClasses/${user?.email}`)
                  .then((res) => res.json())
                  .then((data) => {
                    setMyClasses(data);
                  })

              }
            });
        }
      });
  };


  const handlePaymentClick = (fees) => {
    setFees(fees);
  };

  return (
    <>
      <Header />
      {admin && (
        <div className='mx-48 text-center mt-16'>
          <h1 className='mb-12 font-bold text-4xl text-orange-500'>Admin Dashboard</h1>
          <Link to='/manageClasses'>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-blue-700 hover:bg-blue-500 text-white text-2xl font-bold py-4 px-4 rounded w-96"
            >
              Manage Classes
            </motion.button>
          </Link>
          <br /><br />
          <Link to='/manageUsers'>
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-blue-700 hover:bg-blue-500 text-white text-2xl font-bold py-4 px-4 rounded w-96"
            >
              Manage Users
            </motion.button>
          </Link>
        </div>
      )}


      {student && (
       <>
        <h1 className='mb-8 font-bold text-4xl text-center text-orange-500'>Student Dashboard</h1>
        <div className='grid grid-cols-2'>
          

         
         <div> 
         <h1 className='mb-8 font-bold text-xl text-center'>My Selected Class</h1>
          <table className="table w-full">
          
    <thead>
      <tr>
        <th>Profile Photo</th>
        <th>Class Name</th>
        <th>Instructor</th>
        <th>Seat(s)</th>
        <th>Fees</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className='text-center'>
      {myClasses.map((myclass) => (
      <tr key={myclass._id}>
        <td>
          <div className="flex items-center space-x-3 justify-around">
            <div className="avatar">
              <div className="mask mask-squircle w-16 h-16 mx-auto mb-6">
                <img className='mx-auto rounded-lg' src={myclass.clas.classPhoto} alt="Avatar" />
              </div>
            </div>
          </div>
        </td>
        <td>{myclass.clas.className}<br/></td>
        <td>{myclass.clas.instructorName}<br/></td>
        <td>{myclass.clas.seats}<br/></td>
        <td>$ {myclass.clas.fees}<br/></td>
  <td>

    
  <Link to={`/payment/${myclass.clas._id}`}>
  <button
    onClick={handlePaymentClick}
    className='bg-orange-500 rounded-md text-white text-bold px-4 py-2 my-2'
  >
    Pay
  </button>
</Link>


{/* 
    
  <Link to={`/payment/${parseFloat(parseInt(myclass.clas.fees).toFixed(2))}`}>
  <button
    onClick={handlePaymentClick}
    className='bg-orange-500 rounded-md text-white text-bold px-4 py-2 my-2'
  >
    Pay
  </button>
</Link> */}

    

  </td>
  <td>
    <button
      onClick={() => handleDelete(myclass._id)}
      className='bg-red-500 rounded-md text-white text-bold px-4 py-2 my-2'
    >Remove</button>


  </td>
</tr>))}


</tbody>
  </table></div>
         <div>
         <h1 className='mb-8 font-bold text-xl text-center'>My Paid Class</h1>
         <table className="table w-full">
         
    <thead>
      
      <tr>
        <th>Profile Photo</th>
        <th>Class Name</th>
        <th>Instructor</th>
        <th>Fees</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className='text-center'>
     {/*  {myClasses.map((myclass) => (
      <tr key={myclass._id}>
        <td>
          <div className="flex items-center space-x-3 justify-around">
            <div className="avatar">
              <div className="mask mask-squircle w-16 h-16 mx-auto mb-6">
                <img className='mx-auto rounded-lg' src={myclass.clas.classPhoto} alt="Avatar" />
              </div>
            </div>
   
          </div>
        </td>
        <td>{myclass.clas.className}<br/></td>
        <td>{myclass.clas.instructorName}<br/></td>
        <td>$ {myclass.clas.fees}<br/></td>
        <td>$ {myclass.clas.fees}<br/></td>
  <td>
    <button
      className='bg-green-300 rounded-md text-white text-lg text-bold px-4 py-2 my-2'
    disabled>Enrolled</button>
  </td>
</tr>))} */}
</tbody>
  </table>
         </div>
        </div>
       </>
      )}



      {instructor && (
        <>
        <h1 className=' font-bold text-4xl text-center text-orange-500'>Instructor Dashboard</h1>
        <div>
        <h1 className=' font-bold text-xl mx-16 text-gray-500'>Total Enrolled Students: 0</h1>
        </div>
        <h1 className=' font-bold text-2xl text-center'>My Classes</h1>
        <div className="mx-5 grid lg:grid-cols-3 mb-8 gap-4 h-full"> 
      {userClasses?.map((clas) => (
        <div key={clas._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
          <img src={clas.classPhoto} alt="Truck" className="w-full mb-4 h-96" />
          <h3 className="text-md font-semibold mb-2">Class Name: <b>{clas.className}</b></h3>
          <h3 className="text-md font-semibold mb-2">Name of Instructor: <b>{clas.instructorName}</b></h3>
          <h3 className="text-md font-semibold mb-2">Email of Instructor: <b>{clas.instructorEmail}</b></h3>
    
          <div className="mx-auto pt-4 pb-2 text-center">
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: ${clas.fees}</span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Avail. Seat(s). {clas.seats}</span>
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Status: <b>{clas.status}</b></span><br></br>
         
         <div className='flex justify-between items-center'>
         <Link to={`/updateclass/${clas._id}`}><button className='bg-green-500 rounded-md mx-2 text-white text-bold text-center px-2 py-1 my-2'>
      Update
    </button></Link>
         {clas.status==='Denied'&& (
          <h3 className="text-md font-semibold mb-2"><u>Feedback:</u> <small>{clas.feedback}</small></h3>
          )}
   
         </div>
    

        </div>
        </div>
      ))}
    </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default DashBoard;
