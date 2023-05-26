import React, { useState, useMemo } from 'react';
import axios from 'axios';
import './Form.scss';
import UserSelect from './UserSelect';
import LoanSelect from './LoanSelect';
import type { MRT_ColumnDef } from 'material-react-table';
import { LoanData } from '../types';
import DataTable from './DataTable';

function FetchLoanData() {
  var c = require('classnames');

  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const [userError, setUserError] = useState(false);
  const [loanError, setLoanError] = useState(false);
  const [loanData, setLoanData] = useState<LoanData[]>();

  // define columns for data table
  const columns = useMemo<MRT_ColumnDef<LoanData>[]>(
    () => [
      {
        accessorKey: 'month',
        header: 'Month',
      },
      {
        accessorKey: 'open_balance',
        header: 'Open Balance',
      },
      {
        accessorKey: 'total_payment',
        header: 'Total Payment',
      },
      {
        accessorKey: 'principal_payment',
        header: 'Principal Payment',
      },
      {
        accessorKey: 'interest_payment',
        header: 'Interest Payment',
      },
      {
        accessorKey: 'close_balance',
        header: 'Close Balance',
      },
    ],
    [],
  );

  function createGet() {
    const loanDataURL = `https://lending-api.azurewebsites.net/loans/${loanId}?user_id=${userId}`;
    axios
      .get(loanDataURL, {
        responseType: 'json',
      })
      .then((response) => {
        setLoanData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function validateForm() {
    if (!userId) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    if (!loanId) {
      setLoanError(true);
    } else {
      setLoanError(false);
    }

    // !A and !B = !(A or B)
    if (!(userError || loanError)) {
      createGet();
    }
  }

  return (
    <>
      <div className="Form-modal z-10 relative">
        <div className="Form-header">
          Fetch the Amortization Term for a Loan
        </div>
        <div className="Form-body">
          <div className="Form-form">
            <label className="Form-label">
              User :
              <UserSelect
                selected={selectedUser}
                setSelected={setSelectedUser}
                setId={setUserId}
                setDependentSelected={setSelectedLoan}
              />

              <div className={c({
                "hidden": !userError || selectedUser != null,
                "Form-error": true,
                })}
              >
                Select a user.
              </div>
            </label>

            {userId &&
              <label className="Form-label">
                Loan :
                <LoanSelect
                  data={userId}
                  selected={selectedLoan}
                  setSelected={setSelectedLoan}
                  setId={setLoanId}
                />

                <div className={c({
                  "hidden": !loanError || selectedLoan != null ||  userError,
                  "Form-error": true,
                  })}
                >
                  Select a loan.
                </div>
              </label>
            }
            <div className="Form-submitWrapper">
              <button type="button" className="Form-submit" onClick={validateForm}>Fetch</button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-8 pb-4 z-0 relative">
        {loanData && <DataTable data={loanData} columns={columns} />}
      </div>
    </>
  )
}

export default FetchLoanData;
