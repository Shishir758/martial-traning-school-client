import React, { useContext, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import useTitle from '../useTitle';
import Header from './Header';
import Footer from './Footer';
import { AuthContext } from './provider/AuthProviders';

const UpdateClass = () => {
  useTitle('Update Class Info');
  const { loading } = useContext(AuthContext);
  const classes = useLoaderData();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: clas } = useQuery(['class', id], async () => {
    const response = await axios.get(`http://localhost:5000/classes/${id}`);
    return response.data;
  });

  const updateClassMutation = useMutation((updateInfo) =>
    axios.patch(`http://localhost:5000/updateclass/${id}`, updateInfo)
  );

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.clName.value;
    const seats = form.seats.value;
    const fees = parseInt(form.fees.value).toFixed(2);
    const updateInfo = { className, seats, fees };

    try {
      await Swal.fire({
        title: 'Are you sure?',
        text: 'You will be able to update again!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      });

      await updateClassMutation.mutateAsync(updateInfo);

      Swal.fire({
        title: 'Update!',
        text: 'Information has been successfully updated.',
        icon: 'success',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/dashboard';
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the information.',
        icon: 'error',
        allowOutsideClick: false,
      });
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries('class');
  }, [id, queryClient]);
  return (
    <>
    <Header/>
      <div className='md:mx-64 lg:mx-48'>
        <h2 className="text-2xl font-bold mb-4 mt-8 text-center">Update class Information</h2>
        <form onSubmit={handleUpdate} id="toyForm" className="space-y-4">

          <div className="flex flex-col">
            <label htmlFor="pictureUrl" className="text-lg font-semibold mb-1">
            Class Name:
            </label>
            <input className="border border-gray-300 rounded-md py-2 px-3"
              type="text" id="pictureUrl"
              name="clName" defaultValue={clas.className} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pictureUrl" className="text-lg font-semibold mb-1">
            Seats:
            </label>
            <input className="border border-gray-300 rounded-md py-2 px-3"
              type="text" id="pictureUrl"
              name="seats" defaultValue={clas.seats}/>
          </div>

          <div className="flex flex-col">
            <label htmlFor="pictureUrl" className="text-lg font-semibold mb-1">
            Fees:
            </label>
            <input className="border border-gray-300 rounded-md py-2 px-3"
              type="number" id="pictureUrl"
              name="fees" defaultValue={clas.fees}/>
          </div>

          <div className='text-center mb-8'><button
            type="submit"
            className=" mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
          >Update Class Information</button>
          </div>
        </form>
      </div>
<Footer/>
    </>
  );
};

export default UpdateClass;