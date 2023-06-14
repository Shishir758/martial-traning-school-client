import React, { useState} from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import '@smastrom/react-rating/style.css'
import useTitle from '../useTitle';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../components/home.css';
import slider1 from '../assest/sliderImage/1.jpg';
import slider2 from '../assest/sliderImage/2.jpg';
import slider3 from '../assest/sliderImage/3.jpg';
import slider4 from '../assest/sliderImage/4.jpg';
import slider5 from '../assest/sliderImage/5.jpg';
import { FiMoon, FiSun } from 'react-icons/fi';


const Home = () => {
  const users= useLoaderData()
  const instructors= users.filter(user=> user.role==='Instructor')
 

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  const [classes, setClasses] = useState([])
  useEffect(() => {
    fetch('https://assignment-twelve-server-pi.vercel.app/classes')
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);
  const approvedClasses= classes.filter(clas=>clas.status==='Approved')
   useTitle('Home')

   useEffect(() => {
    Aos.init({ duration: 2000 });
  }, [])


return (
  <>
 <button className='btn mx-2 mb-2= rounded-sm py-1 px-1' onClick={toggleTheme}>
  {theme === 'light' ? <FiSun /> : <FiMoon />}
</button>

   <div className={`theme-${theme}`}>

<Carousel
      showThumbs={false}
      showArrows={true}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      className="custom-carousel"
    >
      <div className="carousel-item ">
        <img src={slider5} alt="Slide 1" />
        <div className="carousel-caption">
        <h2 className='text-2xl font-bold'>Poomse Demostration</h2>
        </div>
      </div>
      <div className="carousel-item">
        <img src={slider2} alt="Slide 2" />
        <div className="carousel-caption">
          <h2 className='text-2xl font-bold'>Fly Kik Demostration</h2>
        
        </div>
      </div>
      <div className="carousel-item">
        <img src={slider3} alt="Slide 3" />
        <div className="carousel-caption">
        <h2 className='text-2xl font-bold'>Leg Stretching Exercises</h2>
        
      
        </div>
      </div>
      <div className="carousel-item">
        <img src={slider4} alt="Slide 4" />
        <div className="carousel-caption">
        <h2 className='text-2xl font-bold'>Back Kik Demostration</h2>
         
        </div>
      </div>
      <div className="carousel-item">
        <img src={slider1} alt="Slide 5" />
        <div className="carousel-caption">
        <h2 className='text-2xl font-bold'>Fighting Demostration</h2>
       
        </div>
      </div>
    </Carousel>


    <div className=' mx-auto lg:w-3/4'>
      <h1 className='text-center font-bold text-2xl mt-10'>Martial Arts Classes (Popular)</h1>

    </div>
    <div className="mx-5 grid lg:grid-cols-3 mb-8 gap-4 h-full" data-aos="fade-up">
      {approvedClasses.slice(0,6).map((clas) => (
      <div key={clas._id} className={`${clas.seats > 0 ? 'bg-white' : 'bg-red-300'
    } rounded-lg shadow-md p-6 flex flex-col h-full`}>
      <img src={clas.classPhoto} alt="instructor" className="w-full mb-4 h-96" />
      <h3 className="text-md font-semibold mb-2">Class Name: <b>{clas.className}</b></h3>
      <h3 className="text-md font-semibold mb-2">Name of Instructor: <b>{clas.instructorName}</b></h3>
      <h3 className="text-md font-semibold mb-2">Email of Instructor: <b>{clas.instructorEmail}</b></h3>

      <div className="px-2 pt-4 pb-2 text-center">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Price: USD$ {clas.fees}</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Available Seat. {clas.seats}</span><br></br>
     <br></br>

        </div>
        </div>
      ))}
    </div>


    <div className=' mx-auto lg:w-3/4'>
      <h1 className='text-center font-bold text-2xl mt-10'>Our Instructors</h1>
      
    </div>

    <div className="mx-6 grid lg:grid-cols-3 mb-8 gap-12 h-full" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
        
        {instructors.slice(0,6).map((instructor) => (
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


    <div className=' mx-auto lg:w-3/4'>
      <h1 className='text-center font-bold text-2xl mt-10'>Request Class Form</h1>
      <h1 className='text-center text-2xl mt-2 mb-4'>Please let us know what class do you want by fill this form.</h1>
    </div>

    <form className="lg:max-w-6xl lg:mx-auto mx-4" data-aos="fade-left">
      <div className='grid lg:grid-cols-2 gap-4'>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
            Class Name:
          </label>
          <input
            type="text"
            id="productName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue=""

            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
            Fees (In Us Dollar)
          </label>
          <input
            type="number"
            id="quantity"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue=''
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
          Class Duration in Month
          </label>
          <input
            type="number"
            id="price"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Write something about calss
          </label>
          <textarea
            id="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue=''
            required
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-700 mb-4 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
       Request for a class
      </button>
    </form>
    </div>
  </>
);
};

export default Home;