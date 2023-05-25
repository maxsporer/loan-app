import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import './Form.scss';

function UserPostForm() {
  var c = require('classnames');

  const baseUrl = 'https://lending-api.azurewebsites.net/users';

  const [post, setPost] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  function createPost() {
    axios
      .post(baseUrl, {
        "username": name
      })
      .then((response) => {
        setPost(response.data);
        setName('');
      })
  }

  function handleChange(event:any) {
    setName(event.target.value)
  }

  function validateForm() {
    if (name.length < 3) {
      setError(true);
    } else {
      setError(false);
      createPost();
    }
  }

  return (
    <div className="Form-modal">
      <div className="Form-header">
        Create a User
      </div>
      <div className="Form-body">
        <form onSubmit={validateForm} className="p-4 flex flex-col">
          <label className="flex flex-col gap-y-2">
            Username :
            <input className="Form-input p-1" type="text" value={name} onChange={handleChange}/>
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
              <div className="pb-1">
                User created
              </div>
              <div>
                <div>username: {post['username']}</div>
                <div>id: {post['id']}</div>
              </div>
            </div>
          }
          <div className="Form-submitWrapper">
            <input className="Form-submit" type="submit" value="Create" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserPostForm;
