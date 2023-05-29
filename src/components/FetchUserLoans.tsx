import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import '../style/Form.scss';
import UserSelect from './UserSelect';
import DataTable from './DataTable';
import { Loan, User } from '../types';
import type { MRT_ColumnDef } from 'material-react-table';
import { useLocalStorage, setLocalStorage } from '../utils/useLocalStorage';

interface FetchUserState {
  error: boolean;
  loans: Loan[] | null;
}

/**
 * Returns form that fetches a user's loans
 * @returns HTMLElement
 */
function FetchUserLoans() {
  var c = require('classnames');
  
  const defaultState = {
    error: false,
    loans: null,
  };
  
  const [state, setState] = useState<FetchUserState>(
    useLocalStorage('fetchUserState', defaultState)
  );

  const [selected, setSelected] = useState<User | null>(
    useLocalStorage('fetchUserSelected', null)
  );

  const [id, setId] = useState<number | null>(
    useLocalStorage('fetchUserId', null)
  );

  useEffect(() => {
    setLocalStorage('fetchUserState', state);
    setLocalStorage('fetchUserSelected', selected);
    setLocalStorage('fetchUserId', id);
  });

  // define columns for data table
  const columns = useMemo<MRT_ColumnDef<Loan>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        Cell: ({cell}) => (
          <span>${cell.getValue<number>().toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'apr',
        header: 'APR',
        Cell: ({cell}) => (
          <span>{cell.getValue<number>()}%</span>
        ),
      },
      {
        accessorKey: 'term',
        header: 'Term',
        Cell: ({cell}) => (
          <span>{cell.getValue<number>()} mos</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'owner_id',
        header: 'Owner ID',
      },
    ],
    [],
  );

  /**
   * Sends API request to fetch loans
   */
  function createGet() {
    const loansURL = `https://lending-api.azurewebsites.net/users/${id}/loans`;
    axios
      .get(loansURL, {
        responseType: 'json',
      })
      .then((response) => {
        setState({...state, loans: response.data});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Checks that all form inputs are valid
   */
  function validateForm() {
    if (!id) {
      setState({...state, error: true});
    } else {
      setState({...state, error: false});
      createGet();
    }
  }

  /**
   * Sets all form inputs to default values
   */
  function clearForm() {
    setSelected(null);
    setId(null);
    setState({
      ...state,
      ...defaultState,
    });
  }

  return (
    <>
      <div className="Form-modal z-10 relative">
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
                "hidden": !state.error || selected != null,
                "Form-error": true,
                })}
              >
                Select a user.
              </div>
            </label>
            <div className="Form-buttons">
              <div className="Form-clearWrapper">
                <button type="button" className="Form-clear" onClick={clearForm}>Clear</button>
              </div>
              <div className="Form-submitWrapper">
                <button type="button" className="Form-submit" onClick={validateForm}>Fetch</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.loans &&
        <div className="px-4 pt-8 pb-4 z-0 relative">
          <DataTable data={state.loans} columns={columns}/>
        </div>
      }
    </>
  )
}

export default FetchUserLoans;
