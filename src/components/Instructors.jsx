import Header from './Header';
import Footer from './Footer';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../useTitle';
import { Hinge, Roll, Slide, Zoom } from 'react-awesome-reveal';


const Instructors = () => {
  useTitle('Instructors')
  const users= useLoaderData()
  const instructors= users.filter(user=> user.role==='Instructor')


  return (
    <>
      <Header />
      <h1 className='text-center font-bold text-4xl mt-4 mb-6'>All instructor of our Team</h1>
     <Slide>
     
      <div className="mx-6 grid lg:grid-cols-4 mb-8 gap-4 h-full">
        
        {instructors.map((instructor) => (
          <div key={instructor._id} className="bg-white rounded-lg shadow-md p-2 flex flex-col h-full">
            <img src={instructor.photoUrl} alt="Instructor" className="rounded-xl w-full mb-4 h-96" />
            <div className="px-4 pb-2 text-center">
          <span className="inline-block bg-gray-200 rounded-md px-4 py-1 text-lg font-semibold text-gray-700 mr-2 mb-2">Name of Instructor:<br/> <b>{instructor.username}</b></span>
          <span className="inline-block w-full bg-gray-200 rounded-md px-1 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">Instructor's Email: <br/><b>{instructor.email}</b></span>
        
        </div>
          
            <div className="mt-auto">
              <Link to={`/ViewToy/${instructor._id}`}>

              </Link>
            </div>
          </div>
        ))}
      </div>
     </Slide>
      <Footer />
    </>
  );
};
export default Instructors;