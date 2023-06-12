import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import PageNotFound from '../assest/sliderImage/404.jpg';
import useTitle from '../useTitle';

const ErrorPage = () => {
  useTitle('Error Page')
  const { error, status } = useRouteError()
  return (
    <section className='flex items-center h-screen p-16 bg-gray-100 text-gray-900'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <p className='text-2xl font-semibold md:text-3xl '>
          {error?.message}</p>
        <img src={PageNotFound}></img>
        <div className='max-w-md text-center mt-4'>
          <Link to='/' className='px-11 py-3 font-semibold rounded bg-cyan-300 text-gray-900'>Back to homepage</Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
