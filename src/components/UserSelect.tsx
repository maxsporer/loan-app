import React from 'react';
import Select from 'react-select';
import axios from "axios";
import { User } from '../types';

interface UserSelectProps {
  selected: User | null;
  setSelected: React.Dispatch<React.SetStateAction<User | null>>;
  setId: React.Dispatch<React.SetStateAction<number | null>> ;
  setDependentSelected?: React.Dispatch<React.SetStateAction<User | null>>[];
  omitId?: number;
}

function UserSelect(props: UserSelectProps) {
  const {
    selected,
    setSelected,
    setId,
    setDependentSelected,
    omitId,
  } = props;

  const usersURL = 'https://lending-api.azurewebsites.net/users';
  let options: User[] = [];

  function handleChange(selected: User | null) {
    setSelected(selected);
    setId(selected!.id);

    if (setDependentSelected) {
      setDependentSelected.forEach((set: React.Dispatch<React.SetStateAction<User | null>>) => {
        set(null);
      });
    }
  }

  function getUsers() {
    axios
      .get(usersURL, {
        responseType: 'json',
      })
      .then((response) => {
        response.data.forEach((user: any) => {
          // omit this user from list
          if (omitId && user.id === omitId) return;

          const label = `(${user.id}) ${user.username}`;
          options.push({
            id: user.id,
            value: label,
            label: label
          })
        })
      })
      .catch((error) => {
        console.error(error);
      });
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
