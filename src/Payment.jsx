
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import CheckOut from './CheckOut';
import Footer from './Footer';
import Header from './Header';

const stripePromise =loadStripe(import.meta.env.VITE_paymentPK);

const Payment = () => {


  const {id} = useParams();
  console.log(id);
  return (
    <>
      <Header />
      <h1>taakaaaaaaaaaa</h1>
      <Elements stripe={stripePromise}>
        <CheckOut id={id} />
      </Elements>
      <Footer />
    </>
  );
};


export default Payment;