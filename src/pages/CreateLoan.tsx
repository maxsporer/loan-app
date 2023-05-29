import React from 'react';
import Header from '../components/Header';
import CreateLoanForm from '../components/CreateLoanForm';

/**
 * Returns page where user can create a loan
 * @returns HTMLElement
 */
function CreateLoan() {
  return (
    <div>
      <Header />
      <CreateLoanForm />
    </div>
  )
}

export default CreateLoan;
