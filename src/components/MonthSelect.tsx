
import React from 'react';
import Select from 'react-select';
import axios from 'axios';

function MonthSelect(props: any) {
  const {
    userId,
    loanId,
    term,
    selected,
    setSelected,
    summary,
    setSummary,
  } = props;

  let month: any = null;
  
  let options = [];
  for (let i = 1; i <= term; i++) {
    options.push({
      value: i,
      label: i
    });
  }

  function getSummary() {
    const summaryURL = `https://lending-api.azurewebsites.net/loans/${loanId}/month/${month}?user_id=${userId}`;
    axios
      .get(summaryURL, {
        responseType: 'json',
      })
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleChange(selected: any) {
    setSelected(selected);
    month = selected['value'];
    getSummary();
  }

  return (
    <div className="flex text-sm gap-x-4">
      <div className="w-[120px]">
        Select Month:
        <Select
          className="p-2"
          value={selected}
          options={options}
          placeholder="month"
          onChange={handleChange}
        />
      </div>
      <div>
        Summary by Month:
          {summary &&
            <div className="flex flex-col pt-1">
              <div>
                Principal: ${Math.abs(Number(summary['current_principal'])).toFixed(2)}
              </div>
              <div>
                Principal Paid: ${Number(summary['aggregate_principal_paid']).toFixed(2)}
              </div>
              <div>
                Interest Paid: ${Number(summary['aggregate_interest_paid']).toFixed(2)}
              </div>
            </div>
          }
      </div>
    </div>
  )
}

export default MonthSelect;