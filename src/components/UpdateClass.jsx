import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useTitle from '../useTitle';
import Header from './Header';
import Footer from './Footer';

const UpdateClass = () => {
  useTitle('Update Class Info');
  const { id } = useParams();
  const [clas, setClass] = useState(null);
  const classes =useLoaderData();


  useEffect(() => {
    const clas = classes.find(clas => clas._id == id);
    setClass(clas);
  }, [clas, id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;
    const className = form.clName.value;
    const seats = form.seats.value;
    const fees = form.fees.value;
    const updateInfo = { className, seats, fees };

    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be able to update again!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`https://assignment-twelve-server-pi.vercel.app/updateclass/${id}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updateInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.modifiedCount >  0) {
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
              } 
            });
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

  return (
    <>
      <Header />
      <div className="md:mx-64 lg:mx-48">
        <h2 className="text-2xl font-bold mb-4 mt-8 text-center">Update class Information</h2>
        {clas && (
          <form onSubmit={handleUpdate} id="toyForm" className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="className" className="text-lg font-semibold mb-1">
                Class Name:
              </label>
              <input
                className="border border-gray-300 rounded-md py-2 px-3"
                type="text"
                id="className"
                name="clName"
                defaultValue={clas.className}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="seats" className="text-lg font-semibold mb-1">
                Seats:
              </label>
              <input
                className="border border-gray-300 rounded-md py-2 px-3"
                type="text"
                id="seats"
                name="seats"
                defaultValue={clas.seats}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="fees" className="text-lg font-semibold mb-1">
                Fees:
              </label>
              <input
                className="border border-gray-300 rounded-md py-2 px-3"
                type="number"
                id="fees"
                name="fees"
                defaultValue={clas.fees}
              />
            </div>

            <div className="text-center mb-8">
              <button
                type="submit"
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
              >
                Update Class Information
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UpdateClass;
