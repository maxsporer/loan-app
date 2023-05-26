import React, { useState } from 'react';
import axios from 'axios';
import '../style/Form.scss';
import UserSelect from './UserSelect';
import LoanSelect from './LoanSelect';

function ShareLoanForm() {
  var c = require('classnames');

  const [selectedOwner, setSelectedOwner] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [ownerError, setOwnerError] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userError, setUserError] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const [loanError, setLoanError] = useState(false);

  const [success, setSuccess] = useState(false);

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
              setDependentSelected={[setSelectedUser, setSelectedLoan]}
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
                setDependentSelected={[setSelectedLoan]}
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
                data={ownerId}
                selected={selectedLoan}
                setSelected={setSelectedLoan}
                setId={setLoanId}
                ownerId={ownerId}
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

          <div className="Form-submitWrapper">
            <button type="button" className="Form-submit" onClick={validateForm}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareLoanForm;