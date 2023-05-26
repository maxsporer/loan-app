
import React from 'react';
import Select from 'react-select';
import axios from 'axios';

function LoanSelect(props: any) {
  const {
    data,
    selected,
    setSelected,
    setId,
    ownerId,
  } = props

  const options: any[] = []

  function handleChange(selected: any) {
    setSelected(selected);
    setId(selected.id);
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