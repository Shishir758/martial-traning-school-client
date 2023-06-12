import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';


const CheckOut = ({fees}) => {
    const stripe= useStripe();
    const elements= useElements();
    const [cardError, setCardError] =useState([])

    useEffect(() => {
      fetch('http://localhost:5000/createPayment', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ fees }), 
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          return data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);
    

    const handleSubmit =async(event)=>{
        event.prevent.Default();
        if(!stripe ||elements){
            return;
        }
        const card = elements.getElement(CardElement)
        if(card === null){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type:'card',
          card
        })
        if(error){
          setCardError(error.message);
        }else{

        }
    }

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
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        </form>
        {cardError && <p>{cardError}</p>}
        </>

    );
};

export default CheckOut;