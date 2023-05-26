
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import MonthSelect from './MonthSelect';

function LoanSelect(props: any) {
  const {
    data,
    selected,
    setSelected,
    setId,
    ownerId,
  } = props;

  let options: any[] = [];

  const [monthOption, setMonthOption] = useState(null);
  const [summary, setSummary] = useState(null);

  function handleChange(selected: any) {
    setSelected(selected);
    setId(selected.id);
    setMonthOption(null);
    setSummary(null);
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

      {selected &&
        <div className="flex p-2 gap-x-4">
          <div className="text-sm flex flex-col">
            <div>ID: {selected['id']}</div>
            <div>Owner ID: {selected['owner_id']}</div>
            <div>Amount: ${selected['amount']}</div>
            <div>APR: {selected['apr']}%</div>
            <div>Term: {selected['term']} months</div>
            <div>Status: {selected['status']}</div>
          </div>
          <MonthSelect
            userId={selected['owner_id']}
            loanId={selected['id']}
            term={selected['term']}
            selected={monthOption}
            setSelected={setMonthOption}
            summary={summary}
            setSummary={setSummary}
          />
        </div>
      }
    </div>
  )
}

export default LoanSelect;