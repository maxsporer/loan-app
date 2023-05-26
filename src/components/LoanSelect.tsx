
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

function LoanSelect(props: any) {
  const {
    data,
    selected,
    setSelected,
    setId,
    ownerId,
    setDependentSelected,
  } = props;

  let options: any[] = [];

  function handleChange(selected: any) {
    setSelected(selected);
    setId(selected.id);

    if (setDependentSelected) {
      setDependentSelected.forEach((set: any) => {
        set(null);
      });
    }
  }

  function getLoans() {
    const loansURL = `https://lending-api.azurewebsites.net/users/${data}/loans`;
    axios
      .get(loansURL, {
        responseType: 'json',
      })
      .then((response) => {
        response.data.forEach((loan: any) => {
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