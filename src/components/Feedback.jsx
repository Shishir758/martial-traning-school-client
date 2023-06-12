import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from './Footer';
import Header from './Header';

const Feedback = () => {


    const [clas, setClass] = useState([]);
    const classes = useLoaderData();
    const { id } = useParams();

  
    useEffect(() => {
      const clas = classes.find(clas => clas._id == id);
      setClass(clas);
    }, [clas, id]);
  
  
  
    const handleUpdate = (event) => {
      event.preventDefault();
      const form = event.target;
      const feedback = form.message.value;
      const updateInfo = { feedback };
   
    
      Swal.fire({
        title: 'Are you sure?',
        text: "You will be able to update again!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      })
        .then((result) => {
          if (result.isConfirmed) {
            fetch(`http://localhost:5000/feedback/${id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updateInfo)
            })
              .then(res => res.json())
              .then(data => {
                if (data) {
                  Swal.fire({
                    title: 'Update!',
                    text: 'Information has been successfully updated.',
                    icon: 'success',
                    allowOutsideClick: false
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = '/dashboard';
              
                    }
                  });
                }
              })
              .catch(error => {
                console.error(error);
                Swal.fire({
                  title: 'Error!',
                  text: 'An error occurred while updating the information.',
                  icon: 'error',
                  allowOutsideClick: false
                });
              });
          }
        });
    };
    
    return (
        <>
        <Header/>
        <h1 className='mb-8 font-bold text-4xl text-center text-orange-500'>Feedback Message</h1>
            
        <form onSubmit={handleUpdate} id="toyForm" className="space-y-4">

<div className="flex flex-col w-2/3 mx-auto">
  <label htmlFor="pictureUrl" className="text-lg font-semibold mb-1">
  Feedback Message:
  </label>
  <textarea className="border border-gray-300 rounded-md py-2 px-3"
    type="text" id="pictureUrl"
    name="message" defaultValue={clas.feedback} />
</div>


<div className='text-center mb-8'><button
  type="submit"
  className=" mb-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
>Send Feedback</button>
</div>
</form>

            <Footer/>
        </>
    );
};

export default Feedback;