import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Form.scss';
import UserSelect from './UserSelect';
import LoanSelect from './LoanSelect';
import { User, Loan } from '../types';
import { useLocalStorage, setLocalStorage } from '../utils/useLocalStorage';

function ShareLoanForm() {
  var c = require('classnames');

  const [selectedOwner, setSelectedOwner] = useState<User | null>(
    useLocalStorage('shareLoanSelectedOwner', null)
  );
  const [ownerId, setOwnerId] = useState<number | null>(
    useLocalStorage('shareLoanOwnerId', null)
  );
  const [ownerError, setOwnerError] = useState<boolean>(
    useLocalStorage('shareLoanOwnerError', false)
  );
  
  const [selectedUser, setSelectedUser] = useState<User | null>(
    useLocalStorage('shareLoanSelectedUser', null)
  );
  const [userId, setUserId] = useState<number | null>(
    useLocalStorage('shareLoanUserId', null)
  );
  const [userError, setUserError] = useState<boolean>(
    useLocalStorage('shareLoanUserError', false)
  );

  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(
    useLocalStorage('shareLoanSelectedLoan', null)
  );
  const [loanId, setLoanId] = useState<number | null>(
    useLocalStorage('shareLoanLoanId', null)
  );
  const [loanError, setLoanError] = useState<boolean>(
    useLocalStorage('shareLoanLoanError', false)
  );

  const [success, setSuccess] = useState<boolean>(
    useLocalStorage('shareLoanSuccess', false)
  );

  useEffect(() => {
    setLocalStorage('shareLoanSelectedOwner', selectedOwner);
    setLocalStorage('shareLoanOwnerId', ownerId);
    setLocalStorage('shareLoanOwnerError', ownerError);
    setLocalStorage('shareLoanSelectedUser', selectedUser);
    setLocalStorage('shareLoanUserId', userId);
    setLocalStorage('shareLoanUserError', userError);
    setLocalStorage('shareLoanSelectedLoan', selectedLoan);
    setLocalStorage('shareLoanLoanId', loanId);
    setLocalStorage('shareLoanLoanError', loanError);
    setLocalStorage('shareLoanSuccess', success);
  });

  function createPost() {
    const shareURL = `https://lending-api.azurewebsites.net/loans/${loanId}/share?owner_id=${ownerId}&user_id=${userId}`;

    axios
      .post(shareURL, {})
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  function validateForm() {
    if (!ownerId) {
      setOwnerError(true);
    } else {
      setOwnerError(false);
    }

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

    if (ownerId && userId && loanId) {
      createPost();
    }
  }

  function clearForm() {
    setSelectedOwner(null);
    setOwnerId(null);
    setOwnerError(false);
    setSelectedUser(null);
    setUserId(null);
    setUserError(false);
    setSelectedLoan(null);
    setLoanId(null);
    setLoanError(false);
    setSuccess(false);
  }

  return (
    <div className="Form-modal">
      <div className="Form-header">
        Share a Loan with another User
      </div>
      <div className="Form-body">
        <div className="Form-form">
          <label className="Form-label">
            Owner :
            <UserSelect
              selected={selectedOwner}
              setSelected={setSelectedOwner}
              setId={setOwnerId}
              setDependentSelected={[setSelectedUser, setSelectedLoan, setSuccess]}
            />

            <div className={c({
              "hidden": !ownerError || selectedOwner != null,
              "Form-error": true,
              })}
            >
              Select an owner.
            </div>
          </label>

          {ownerId &&
            <label className="Form-label">
              Recipient :
              <UserSelect
                selected={selectedUser}
                setSelected={setSelectedUser}
                setId={setUserId}
                setDependentSelected={[setSelectedLoan, setSuccess]}
                omitId={ownerId}
              />

              <div className={c({
                "hidden": !userError || selectedUser != null || ownerError,
                "Form-error": true,
                })}
              >
                Select a recipient.
              </div>
            </label>
          }

          {ownerId && userId &&
            <label className="Form-label">
              Loan :
              <LoanSelect
                userId={ownerId}
                selected={selectedLoan}
                setSelected={setSelectedLoan}
                setId={setLoanId}
                ownerId={ownerId}
                setDependentSelected={[setSuccess]}
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

          {success &&
            <div>Success.</div>
          }

          <div className="Form-buttons">
            <div className="Form-clearWrapper">
              <button type="button" className="Form-clear" onClick={clearForm}>Clear</button>
            </div>
            <div className="Form-submitWrapper">
              <button type="button" className="Form-submit" onClick={validateForm}>Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareLoanForm;
