import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

const baseUrl = 'https://lending-api.azurewebsites.net/users';

function Form(props:any) {
  const {
    desc
  } = props
  var c = require('classnames');

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
    <div className="max-w-[750px] mx-auto mt-12">
      <div className="bg-tertiary text-bg py-2 px-4 rounded-t-lg text-center">
        {desc}
      </div>
      <div className="flex flex-col rounded-b-lg border-x-2 border-b-2 border-tertiary">
        <form onSubmit={validateForm} className="p-4 flex flex-col">
          <label className="flex flex-col gap-y-2">
            Username :
            <input className="p-1 border-2 rounded-md" type="text" value={name} onChange={handleChange}/>
            <div className={c({
              "hidden": !error,
              "text-error text-sm mx-1": true,
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
          <div className="flex pt-4 justify-center">
            <input className="w-fit p-2 border-2 border-tertiary rounded-md hover:bg-tertiary hover:text-bg" type="submit" value="Create" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form;
