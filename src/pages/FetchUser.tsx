import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';

function FetchUser() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Nav />
        <div>
          Fetch all User's Loans
        </div>
      </div>
    </div>
  )
}

export default FetchUser;
