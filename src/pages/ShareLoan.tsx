import React from 'react';
import Header from '../components/Header';
import ShareLoanForm from '../components/ShareLoanForm';

/**
 * Returns page where user can share a loan between two users
 * @returns HTMLElement
 */
function ShareLoan() {
  return (
    <div>
      <Header />
      <ShareLoanForm />
    </div>
  )
}

export default ShareLoan;
