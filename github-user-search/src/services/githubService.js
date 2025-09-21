import axios from "axios";

// Basic user fetch
export const fetchUserData = async (username, token) => {
  const url = `https://api.github.com/users/${username.trim()}`;
  const headers = token
    ? { Authorization: `token ${token}` }
    : undefined;

  const response = await axios.get(url, { headers });
  return response.data;
};

// Advanced search
export const fetchAdvancedUserData = async (
  username,
  location,
  minRepos,
  token
) => {
  let query = "";

  if (username) query += `${username.trim()} `;
  if (location) query += `location:${location.trim()} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  if (!query.trim()) throw new Error("Empty search query");

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}`;
  const headers = token
    ? { Authorization: `token ${token}` }
    : undefined;

  const response = await axios.get(url, { headers });
  return response.data.items; // Array of users
};
