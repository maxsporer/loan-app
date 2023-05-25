import React from 'react';
import { useState } from 'react';
import axios from "axios";
import './Form.scss';

function UserPostForm() {
  var c = require('classnames');

  const usersURL = 'https://lending-api.azurewebsites.net/users';

  const [post, setPost] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  function createPost() {
    axios
      .post(usersURL, {
        "username": name
      })
      .then((response) => {
        setPost(response.data);
        setName('');
      })
      .catch((error) => {
        console.error(error);
      })
  }
  
  function validateForm() {
    if (name.length < 3) {
      setError(true);
    } else {
      setError(false);
      createPost();
    }
  }
  
  function handleChange(event:any) {
    setName(event.target.value)
  }

  return (
    <div className="Form-modal">
      <div className="Form-header">
        Create a User
      </div>
      <div className="Form-body">
        <form className="Form-form">
          <label className="Form-label">
            Username :
            <input className="Form-input" type="text" value={name} onChange={handleChange} />

            <div className={c({
              "hidden": !error,
              "Form-error": true,
              })}
            >
              Username must by longer than two characters.
            </div>
          </label>

          {post &&
            <div className="flex flex-col pt-4">
              <div className="pb-1 ">
                User created
              </div>
              <div className="text-sm">
                <div>Username: {post['username']}</div>
                <div>ID: {post['id']}</div>
              </div>
            </div>
          }

          <div className="Form-submitWrapper">
            <button type="button" className="Form-submit" onClick={validateForm}>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserPostForm;
