import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../style/Form.scss';
import UserSelect from './UserSelect';
import { User } from '../types';
import { useLocalStorage, setLocalStorage } from '../utils/useLocalStorage';

interface CreateLoanState {
  amount: string;
  amountError: boolean;
  apr: string;
  aprError: boolean;
  term: string;
  termError: boolean;
  active: boolean;
  data: {
    amount: number;
    apr: number;
    id: number;
    status: 'active' | 'inactive';
    owner_id: number;
    term: number;
  } | null;
};

function CreateLoanForm() {
  var c = require('classnames');

  const loansURL = 'https://lending-api.azurewebsites.net/loans';
  const defaultState = {
    amount: "",
    amountError: false,
    apr: "",
    aprError: false,
    term: "",
    termError: false,
    active: true,
    data: null,
  };

  const [state, setState] = useState<CreateLoanState>(
    useLocalStorage('createLoanState', defaultState)
  );

  const [selected, setSelected] = useState<User | null>(
    useLocalStorage('createLoanSelected', null)
  );

  const [id, setId] = useState<number | null>(
    useLocalStorage('createLoanId', null)
  );
  
  useEffect(() => {
    setLocalStorage('createLoanState', state);
    setLocalStorage('createLoanSelected', selected);
    setLocalStorage('createLoanId', id);
  });
  
  function createPost() {
    axios
      .post(loansURL, {
        "amount": state.amount,
        "apr": state.apr,
        "term": state.term,
        "status": state.active ? 'active' : 'inactive',
        "owner_id": id,
      })
      .then((response) => {
        setSelected(null);
        setId(null);
        setState({
          amount: '',
          amountError: false,
          apr: '',
          aprError: false,
          term: '',
          termError: false,
          active: true,
          data: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
    
    setState({...newState});

    // !A and !B = !(A or B)
    if (!(state.amountError || state.aprError || state.termError )) {
      createPost()
    }
  }

  function clearForm() {
    setSelected(null);
    setId(null);
    setState({
      ...state,
      ...defaultState,
    });
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const isCheckbox = event.currentTarget.type === "checkbox";
    const value = isCheckbox ? event.currentTarget.checked : event.currentTarget.value;
    
    setState({
      ...state,
      [event.currentTarget.name]: isCheckbox ? value : String(value)
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
            Amount ($) :
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
            Term (months):
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
            <UserSelect
              selected={selected}
              setSelected={setSelected}
              setId={setId}
            />
          </label>

          <label className="flex gap-x-2">
            Active :
            <input type="checkbox" name="active" checked={state.active} onChange={handleChange} />
          </label>

          {state.data &&
            <div className="flex flex-col pt-4">
              <div className="pb-1">
                Loan created.
              </div>
              <div className="text-sm">
                <div>ID: {state.data['id']}</div>
                <div>Amount: ${state.data['amount']}</div>
                <div>APR: {state.data['apr']}%</div>
                <div>Term: {state.data['term']} months</div>
                <div>Status: {state.data['status']}</div>
                <div>Owner ID: {state.data['owner_id']}</div>
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

export default CreateLoanForm;
