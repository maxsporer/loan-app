import axios from "axios";

function getUsers(setState:Function) {
  const usersURL = 'https://lending-api.azurewebsites.net/users';

  axios
    .get(usersURL, {
      responseType: 'json',
    })
    .then((response) => {
      var existingIds = [];
      for (var user in response.data) {
        existingIds.push(response.data[user].id)
      }
      setState(existingIds);
    })
    .catch((error) => {
      console.error(error);
    })
}

export default getUsers;
