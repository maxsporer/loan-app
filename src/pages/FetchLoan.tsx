import React from 'react';
import Header from '../components/Header';
import FetchLoanData from '../components/FetchLoanData';

/**
 * Returns page where user can fetch data for a loan
 * @returns HTMLElement
 */
function FetchLoan() {
  return (
    <div>
      <Header />
      <FetchLoanData />
    </div>
  )
}

export default FetchLoan;
