import React from 'react';
import Header from '../components/Header';
import CreateUserForm from '../components/CreateUserForm';

/**
 * Returns page where user can create new user
 * @returns HTMLElement
 */
function CreateUser() {
  return (
    <div>
      <Header />
      <CreateUserForm />
    </div>
  )
}

export default CreateUser;
