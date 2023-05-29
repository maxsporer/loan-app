import React, { useState, useMemo } from 'react';
import axios from "axios";
import '../style/Form.scss';
import UserSelect from './UserSelect';
import DataTable from './DataTable';
import { Loan } from '../types';
import type { MRT_ColumnDef } from 'material-react-table';

function FetchUserLoans() {
  var c = require('classnames');

  const [selected, setSelected] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(false);
  const [loans, setLoans] = useState<Loan[]>();

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

  function createGet() {
    const loansURL = `https://lending-api.azurewebsites.net/users/${id}/loans`;
    axios
      .get(loansURL, {
        responseType: 'json',
      })
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
    <>
      <div className="Form-modal z-10 relative">
        <div className="Form-header">
          Fetch All User's Loans
        </div>
        <div className="Form-body">
          <div className="Form-form">
            <label className="Form-label">
              User :
              {/* <UserSelect
                selected={selected}
                setSelected={setSelected}
                setId={setId}
              /> */}

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
      {loans &&
        <div className="px-4 pt-8 pb-4 z-0 relative">
          <DataTable data={loans} columns={columns}/>
        </div>
      }
    </>
  )
}

export default FetchUserLoans;
