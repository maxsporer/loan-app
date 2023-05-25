import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';

function CreateLoan() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Nav />
        <div>
          Create a Loan
        </div>
      </div>
    </div>
  )
}

export default CreateLoan;
