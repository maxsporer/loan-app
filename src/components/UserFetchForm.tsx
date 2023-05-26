import React from 'react';
import { useState } from 'react';
import axios from "axios";
import './Form.scss';
import UserSelect from './UserSelect';

function UserFetchForm() {
  var c = require('classnames');
  const [selected, setSelected] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(false);

  function createGet() {
    const usersURL = `https://lending-api.azurewebsites.net/users/${id}/loans`;
    axios
      .get(usersURL, {
        responseType: 'json',
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  function validateForm() {
    if (!id) {
      setError(true);
    } else {
      setError(false);
      createGet();
    }
  }

  return (
    <div className="Form-modal">
      <div className="Form-header">
        Fetch All User's Loans
      </div>
      <div className="Form-body">
        <div className="Form-form">
          <label className="Form-label">
            User :
            <UserSelect
              selected={selected}
              setSelected={setSelected}
              setId={setId}
            />

            <div className={c({
              "hidden": !error || selected != null,
              "Form-error": true,
              })}
            >
              Select a user.
            </div>
          </label>
          <div className="Form-submitWrapper">
            <button type="button" className="Form-submit" onClick={validateForm}>Fetch</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFetchForm;
