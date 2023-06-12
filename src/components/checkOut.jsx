import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckOut = ({ fees}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/createPayment', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ fees }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card===null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,

    });
    if(error){console.log('error', error)
    setCardError(error.message)}else{
      setCardError('');
      console.log('paymentMethod',paymentMethod);
    }
    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      },
    );
    setProcessing(false)
    if(confirmError){
      console.log(confirmError);
    }
    console.log(paymentIntent);

  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn bg-blue-500 py-1 px-1" type="submit" disabled={!stripe||!clientSecret||processing}>
          Payment
        </button>
      </form>
      {cardError && <p>{cardError}</p>}
    </>
  );
};

export default CheckOut;
