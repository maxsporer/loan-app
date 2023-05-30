
import React, { useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { User, Loan } from '../types';

interface LoanSelectProps {
  userId: number;
  ownerId?: number;
  selected: Loan | null;
  setSelected: React.Dispatch<React.SetStateAction<Loan | null>>;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  setDependentSelected?: React.Dispatch<React.SetStateAction<any | null>>[];
};

/**
 * Returns dropdown element where user can select a loan
 * @param props LoanSelectProps
 * @returns React Select Element
 */
function LoanSelect(props: LoanSelectProps) {
  const {
    userId,
    ownerId,
    selected,
    setSelected,
    setId,
    setDependentSelected,
  } = props;

  let options: Loan[] = [];

  function handleChange(selected: Loan | null) {
    setSelected(selected);
    setId(selected!.id);

    if (setDependentSelected) {
      setDependentSelected.forEach((set:
        React.Dispatch<React.SetStateAction<User | null>> |
        React.Dispatch<React.SetStateAction<Loan | null>>
        ) => {
        set(null);
      });
    }
  }

  function getLoans() {
    const loansURL = `https://lending-api.azurewebsites.net/users/${userId}/loans`;
    axios
      .get(loansURL, {
        responseType: 'json',
      })
      .then((response) => {
        response.data.forEach((loan: Loan) => {
          // only include loans with this owner
          if (ownerId && ownerId !== loan.owner_id) return;
          const label = (ownerId === null ?
            `(${loan.id}) (${loan.owner_id}) $${loan.amount}`
            : `(${loan.id}) $${loan.amount}`
          );
          options.push({
            id: loan.id,
            amount: loan.amount,
            apr: loan.apr,
            term: loan.term,
            status: loan.status,
            owner_id: loan.owner_id,
            value: label,
            label: label
          })
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (options.length === 0) getLoans();

  const placeholder = (ownerId === null ?
    "(id) (owner id) amount" :
    "(id) amount"
  );

  return (
    <div>
      <Select
        value={selected}
        options={options}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}

export default LoanSelect;