import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';

function ShareLoan() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Nav />
        <div>
          Share a Loan with another USer
        </div>
      </div>
    </div>
  )
}

export default ShareLoan;
