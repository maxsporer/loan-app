import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import '../style/Form.scss';
import UserSelect from './UserSelect';
import LoanSelect from './LoanSelect';
import MonthSelect from './MonthSelect';
import type { MRT_ColumnDef } from 'material-react-table';
import { LoanData, User, Loan, Month, LoanMonth } from '../types';
import DataTable from './DataTable';
import { useLocalStorage, setLocalStorage } from '../utils/useLocalStorage';

/**
 * Returns form that fetches data given a loan
 * @returns HTMLElement
 */
function FetchLoanData() {
  var c = require('classnames');

  const [selectedUser, setSelectedUser] = useState<User | null>(
    useLocalStorage('fetchLoanSelectedUser', null)
  );
  const [userId, setUserId] = useState<number | null>(
    useLocalStorage('fetchLoanUserId', null)
  );
  const [userError, setUserError] = useState<boolean>(
    useLocalStorage('fetchLoanUserError', false)
  );
  
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(
    useLocalStorage('fetchLoanSelectedLoan', null)
  );
  const [loanId, setLoanId] = useState<number | null>(
    useLocalStorage('fetchLoanLoanId', null)
  );
  const [loanError, setLoanError] = useState<boolean>(
    useLocalStorage('fetchLoanLoanId', false)
  );

  const [monthOption, setMonthOption] = useState<Month | null>(
    useLocalStorage('fetchLoanMonthOption', null)
  );
  const [summary, setSummary] = useState<LoanMonth | null>(
    useLocalStorage('fetchLoanSummary', null)
  );

  const [loanData, setLoanData] = useState<LoanData[] | null>(
    useLocalStorage('fetchLoanData', null)
  );

  useEffect(() => {
    setLocalStorage('fetchLoanSelectedUser', selectedUser);
    setLocalStorage('fetchLoanUserId', userId);
    setLocalStorage('fetchLoanUserError', userError);
    setLocalStorage('fetchLoanSelectedLoan', selectedLoan);
    setLocalStorage('fetchLoanLoanId', loanId);
    setLocalStorage('fetchLoanMonthOption', monthOption);
    setLocalStorage('fetchLoanSummary', summary);
    setLocalStorage('fetchLoanData', loanData);
  });
  
  // define columns for data table
  const columns = useMemo<MRT_ColumnDef<LoanData>[]>(
    () => [
      {
        accessorKey: 'month',
        header: 'Month',
        size: 50,
      },
      {
        accessorKey: 'open_balance',
        header: 'Open Balance',
        Cell: ({cell}) => (
          <span>${cell.getValue<number>().toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'total_payment',
        header: 'Total Payment',
        Cell: ({cell}) => (
          <span>${cell.getValue<number>().toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'principal_payment',
        header: 'Principal Payment',
        Cell: ({cell}) => (
          <span>${cell.getValue<number>().toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'interest_payment',
        header: 'Interest Payment',
        Cell: ({cell}) => (
          <span>${cell.getValue<number>().toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'close_balance',
        header: 'Close Balance',
        Cell: ({cell}) => (
          <span>${cell.getValue<number>().toFixed(2)}</span>
        ),
      },
    ],
    [],
  );

  /**
   * Sends API request to fetch loan data
   */
  function createGet() {
    const loanDataURL = `https://lending-api.azurewebsites.net/loans/${loanId}?user_id=${userId}`;
    axios
      .get(loanDataURL, {
        responseType: 'json',
      })
      .then((response) => {
        console.log(response.data);
        setLoanData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Checks that all form inputs are valid
   */
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

    if (userId && loanId) {
      createGet();
    }
  }

  /**
   * Sets all form inputs to default values
   */
  function clearForm() {
    setSelectedUser(null);
    setUserId(null);
    setUserError(false);
    setSelectedLoan(null);
    setLoanId(null);
    setLoanError(false);
    setMonthOption(null);
    setSummary(null);
    setLoanData(null);
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
                setDependentSelected={[setSelectedLoan]}
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
                  userId={userId}
                  selected={selectedLoan}
                  setSelected={setSelectedLoan}
                  setId={setLoanId}
                  setDependentSelected={[setMonthOption, setSummary]}
                />

                <div className={c({
                  "hidden": !loanError || selectedLoan != null || userError,
                  "Form-error": true,
                  })}
                >
                  Select a loan.
                </div>
              </label>
            }

            {selectedLoan &&
              <div className="flex p-2 gap-x-4">
                <div className="text-sm">
                  ID: {selectedLoan['id']}
                  <div className="flex flex-col pt-1">
                    <div>Owner ID: {selectedLoan['owner_id']}</div>
                    <div>Amount: ${selectedLoan['amount']}</div>
                    <div>APR: {selectedLoan['apr']}%</div>
                    <div>Term: {selectedLoan['term']} months</div>
                    <div>Status: {selectedLoan['status']}</div>
                  </div>
                </div>
                <MonthSelect
                  userId={selectedLoan['owner_id']}
                  loanId={selectedLoan['id']}
                  term={selectedLoan['term']}
                  selected={monthOption}
                  setSelected={setMonthOption}
                  summary={summary}
                  setSummary={setSummary}
                />
              </div>
            }

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
      {loanData &&
        <div className="px-4 pt-8 pb-4 z-0 relative">
          <DataTable data={loanData} columns={columns} />
        </div>
      }
    </>
  )
}

export default FetchLoanData;
