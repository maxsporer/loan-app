import React from 'react';
import Select from 'react-select';
import axios from "axios";

function UserSelect(props:any) {
  const {
    selected,
    setSelected,
    setId,
  } = props

  const usersURL = 'https://lending-api.azurewebsites.net/users';
  const options: any[] = []

  function handleChange(selected: any) {
    setSelected(selected);
    setId(selected.id);
  }

  function getUsers() {
    console.log('getUsers');
    axios
      .get(usersURL, {
        responseType: 'json',
      })
      .then((response) => {
        response.data.forEach((user: any) => {
          const label = `(${user.id}) ${user.username}`
          options.push({
            id: user.id,
            value: label,
            label: label
          })
        })
      })
      .catch((error) => {
        console.error(error);
      })
  }

  if (options.length === 0) getUsers();

  return (
    <div>
      <Select
        value={selected}
        options={options}
        placeholder="(id) username"
        onChange={handleChange}
      />
    </div>
  )
}

export default UserSelect;
