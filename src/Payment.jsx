
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useParams } from 'react-router-dom';
import CheckOut from './CheckOut';
import Footer from './Footer';
import Header from './Header';

const stripePromise =loadStripe(import.meta.env.VITE_paymentPK);

const Payment = () => {
  const {fees} = useParams();


  return (
    <>
      <Header />
      <h1>taakaaaaaaaaaa</h1>
      <Elements stripe={stripePromise}>
        <CheckOut fees={fees} />
      </Elements>
      <Footer />
    </>
  );
};


export default Payment;