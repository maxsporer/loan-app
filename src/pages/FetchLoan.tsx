import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';

function FetchLoan() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Nav />
        <div>
          Fetch the amortization term for a Loan
        </div>
      </div>
    </div>
  )
}

export default FetchLoan;
