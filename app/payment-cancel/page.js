
import React from 'react';

const PaymentCancelPage = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Canceled</h1>
      <p className="text-lg">Your order was canceled because the payment was not completed.</p>
      <p className="text-md mt-2">Please try again or contact support if you have any questions.</p>
      <a href="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">Go to Homepage</a>
    </div>
  );
};

export default PaymentCancelPage;
