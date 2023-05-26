
import React from 'react';
import Select from 'react-select';
import axios from 'axios';

function LoanSelect(props: any) {
  const {
    data,
    selected,
    setSelected,
    setId,
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
          const label = `(${loan.id}) (${loan.owner_id}) $${loan.amount}`
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

  return (
    <div>
      <Select
        value={selected}
        options={options}
        placeholder="(id) (owner id) amount"
        onChange={handleChange}
      />
    </div>
  )
}

export default LoanSelect;