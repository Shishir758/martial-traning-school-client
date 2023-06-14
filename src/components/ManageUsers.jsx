import React, { useContext, useEffect, useState } from 'react';
import { api } from '../ManageClasses';
import Footer from './Footer';
import Header from './Header';
import { AuthContext } from './provider/AuthProviders';



api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error(error.message);
      return Promise.reject(error);
    }
  );
  

const ManageUsers = () => {
    const baseURL = api();

    const { user} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


  
    useEffect(() => {
      fetch(`https://assignment-twelve-server-pi.vercel.app/users`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    }, [user]);


 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('https://assignment-twelve-server-pi.vercel.app/users');
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateStatus = async (id, updateType) => {
    try {
      setIsLoading(true);
      let updateRole = {};
      if (updateType === 'Admin') {
        updateRole = { role: 'Admin' };
      } else if (updateType === 'Instructor') {
        updateRole = { role: 'Instructor' };
      }
      await api.patch(`/users/${id}`, updateRole);


      fetchData();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header></Header>
      <h1 className='mb-8 font-bold text-4xl text-center text-orange-500'>Manage User Dashboard</h1>
      <div className="mx-8">
  <table className="table w-full">
    <thead>
      <tr>
        <th>Profile Photo</th>
        <th>Name</th>
        <th>Email Address</th>
        <th>Role</th>
        <th>Action</th>
        <th></th>
      </tr>
    </thead>
    <tbody className='text-center'>
      {users.map((user) => (
      <tr key={user._id}>
        <td>
          <div className="flex items-center space-x-3 justify-around">
            <div className="avatar">
              <div className="mask mask-squircle w-16 h-16 mx-auto mb-6">
                <img className='mx-auto rounded-lg' src={user.photoUrl} alt="Avatar" />
              </div>
            </div>
   
          </div>
        </td>

        <td>{user.username}<br/></td>
        <td>{user.email}<br/></td>
        <td>{user.role}<br/></td>
        {user.role === 'Admin' ? (
  <td>
    <button
      className='bg-blue-300 rounded-md text-white text-bold px-4 py-2 my-2'
      disabled
    >
      Make Admin
    </button>
  </td>
) : (
  <td>
    <button
      onClick={() => updateStatus(user._id, 'Admin')}
      className='bg-blue-500 rounded-md text-white text-bold px-4 py-2 my-2'
    >Make Admin</button>
  </td>
)}
{user.role === 'Instructor' ? (
  <td>
    <button
      className='bg-red-300 rounded-md text-white text-bold px-4 py-2 my-2'
      disabled>Make Instructor</button>
  </td>
) : (
  <td>
    <button
      onClick={() => updateStatus(user._id, 'Instructor')}
      className='bg-red-500 rounded-md mx-2 text-white text-bold px-4 py-2 my-2'
    >Make Instructor</button>
  </td>
)}</tr>
       ))}
    </tbody>
  </table>
</div>
      <Footer></Footer>
    </>
  );
};

export default ManageUsers;


{/* {(clas.status === 'Approved' || clas.status === 'Denied') && (
  <>
    <button className='bg-blue-300 rounded-md text-white text-bold px-4 py-2 my-2' disabled>
      Approve
    </button>
    <button className='bg-red-300 rounded-md mx-2 text-white text-bold px-4 py-2 my-2' disabled>
      Deny
    </button>
    <button className='bg-orange-400 rounded-md text-white text-bold px-4 py-2 my-2'>
      Send Feedback
    </button>
  </>
)} */}



{/* {clas.status === 'Pending' && (<>
          <button onClick={()=>updateStatus(clas._id, "Approved")} className='bg-blue-500 rounded-md text-white text-bold px-4 py-2 my-2'>Approve</button>
        <button onClick={()=>updateStatus(clas._id, "Deny")} className='bg-red-500 rounded-md mx-2 text-white text-bold px-4 py-2 my-2'>
        Deny</button>
        <button className='bg-orange-400 rounded-md text-white text-bold px-4 py-2 my-2'>
        Send Feedback</button></>
        )
        } */}