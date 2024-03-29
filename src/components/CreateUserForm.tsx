import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserData } from '../types';
import { useLocalStorage, setLocalStorage } from '../utils/useLocalStorage';
import '../style/Form.scss';

interface CreateUserState {
  data: UserData | null;
  name: string;
  error: boolean;
};

/**
 * Returns form that creats a new user
 * @returns HTMLElement
 */
function CreateUserForm() {
  var c = require('classnames');
  
  const usersURL = 'https://lending-api.azurewebsites.net/users';
  const defaultState = {
    data: null,
    name: "",
    error: false,
  };

  const [state, setState] = useState<CreateUserState>(
    useLocalStorage('createdUserState', defaultState)
  );

  useEffect(() => {
    setLocalStorage('createdUserState', state);
  });

  /**
   * Sends API request to create user
   */
  function createPost() {
    axios
      .post(usersURL, {
        "username": state.name
      })
      .then((response) => {
        setState({
          ...state,
          data: response.data,
          name: '',
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Checks that all form inputs are valid
   */
  function validateForm() {
    if (state.name.length < 3) {
      setState({...state, error: true});
    } else {
      setState({...state, error: false});
      createPost();
    }
  }

  /**
   * Sets all form inputs to default values
   */
  function clearForm() {
    setState({
      ...state,
      data: null,
      name: '',
      error: false,
    });
  }

  /**
   * Updates value of input elements
   * @param event React.FormEvent<HTMLInputElement>
   */
  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    setState({...state, name: event.currentTarget.value});
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
            <input className="Form-input" type="text" value={state.name} onChange={handleChange} />

            <div className={c({
              "hidden": !state.error,
              "Form-error": true,
              })}
            >
              Username must by longer than two characters.
            </div>
          </label>

          {state.data &&
            <div className="flex flex-col pt-4">
              <div className="pb-1 ">
                User created.
              </div>
              <div className="text-sm">
                <div>Username: {state.data['username']}</div>
                <div>ID: {state.data['id']}</div>
              </div>
            </div>
          }

          <div className="Form-buttons">
            <div className="Form-clearWrapper">
              <button type="button" className="Form-clear" onClick={clearForm}>Clear</button>
            </div>
            <div className="Form-submitWrapper">
              <button type="button" className="Form-submit" onClick={validateForm}>Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUserForm;
