import React from 'react';
import { useState } from 'react';
import axios from "axios";
import './Form.scss';
import getUsers from '../utils/getUsers';

function LoanPostForm() {
  var c = require('classnames');

  const loansURL = 'https://lending-api.azurewebsites.net/loans';

  const [post, setPost] = useState(null);
  const [userIds, setUserIds] = useState<number[]>([]);
  const [state, setState] = useState({
    amount: '',
    amountError: false,
    apr: '',
    aprError: false,
    term: '',
    termError: false,
    id: '',
    idError: false,
    active: true,
  })

  function createPost() {
    axios
    .post(loansURL, {
      "amount": state.amount,
      "apr": state.apr,
      "term": state.term,
      "status": state.active ? 'active' : 'inactive',
      "owner_id": state.id,
    })
    .then((response) => {
      setPost(response.data);
      setState({
        amount: '',
        amountError: false,
        apr: '',
        aprError: false,
        term: '',
        termError: false,
        id: '',
        idError: false,
        active: true,
      });
    })
    .catch((error) => {
      console.error(error);
    })
  }

  function validateForm() {
    var newState = state;
    if (Number(state.amount) <= 0) {
      newState.amount = '';
      newState.amountError = true;
    } else {
      newState.amountError = false;
    }

    if (Number(state.apr) <= 0) {
      newState.apr = '';
      newState.aprError = true;
    } else {
      newState.aprError = false;
    }

    if (Number(state.term) <= 0) {
      newState.term = '';
      newState.termError = true;
    } else {
      newState.termError = false;
    }
  
    getUsers(setUserIds);
    if (!userIds.includes(Number(state.id))) {
      newState.id = '';
      newState.idError = true;
    } else {
      newState.idError = false;
    }
    
    setState({...newState});

    if (!(state.amountError || state.aprError || state.termError || state.idError)) {
      createPost()
    }
  }

  function handleChange(event:any) {
    const isCheckbox = event.target.type === "checkbox";
    const value = isCheckbox ? event.target.checked : event.target.value;
    setState({
      ...state,
      [event.target.name]: isCheckbox ? value : String(value)
    });
  }

  return (
    <div className="Form-modal">
      <div className="Form-header">
        Create a Loan
      </div>
      <div className="Form-body">
        <form className="Form-form">
          <label className="Form-label">
            Amount :
            <input className="Form-input" name="amount" type="number" value={state.amount} onChange={handleChange} />
          </label>
          <div className={c({
            "hidden": !state.amountError,
            "Form-error": true,
            })}
          >
            Amount must be greater than 0.
          </div>

          <label className="Form-label">
            APR (%) :
            <input className="Form-input" name="apr" type="number" value={state.apr} onChange={handleChange} />
          </label>
          <div className={c({
            "hidden": !state.aprError,
            "Form-error": true,
            })}
          >
            APR must be greater than 0.
          </div>

          <label className="Form-label">
            Term (yrs):
            <input className="Form-input" name="term" type="number" value={state.term} onChange={handleChange} />
          </label>
          <div className={c({
            "hidden": !state.termError,
            "Form-error": true,
            })}
          >
            Term must be greater than 0.
          </div>

          <label className="Form-label">
            Owner ID :
            <input className="Form-input" name="id" type="number" value={state.id} onChange={handleChange} />
          </label>
          <div className={c({
            "hidden": !state.idError,
            "Form-error": true,
            })}
          >
            ID not found.
          </div>

          <label className="flex gap-x-2">
            Active :
            <input type="checkbox" name="active" checked={state.active} onChange={handleChange} />
          </label>

          {post &&
            <div className="flex flex-col pt-4">
              <div className="pb-1">
                Loan created
              </div>
              <div className="text-sm">
                <div>ID: {post['id']}</div>
                <div>Amount: {post['amount']}</div>
                <div>APR: {post['apr']}%</div>
                <div>Term: {post['term']} yrs</div>
                <div>Owner ID: {post['owner_id']}</div>
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

export default LoanPostForm;
