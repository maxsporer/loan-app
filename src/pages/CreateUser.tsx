import React from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';

function CreateUser() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Nav />
        <div>
          Create a User
        </div>
      </div>
    </div>
  )
}

export default CreateUser;
