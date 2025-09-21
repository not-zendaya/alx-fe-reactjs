import axios from 'axios';

export const fetchUserData = async (username, location, repos) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (repos) query += `repos:>=${repos}`;

  const url = `https://api.github.com/search/users?q=${query.trim()}`;
  const response = await axios.get(url);
  return response.data.items;
};