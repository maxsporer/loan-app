import React from 'react';
import Header from '../components/Header';
import FetchUserLoans from '../components/FetchUserLoans';

/**
 * Returns page where user can collect a users loans
 * @returns HTMLElement
 */
function FetchUser() {
  return (
    <div>
      <Header />
      <FetchUserLoans />
    </div>
  )
}

export default FetchUser;
