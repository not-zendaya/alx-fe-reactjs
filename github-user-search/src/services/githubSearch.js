import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  }
});

export async function searchUsers(query) {
  const res = await api.get('/search/users', {
    params: { q: query, per_page: 30 }
  });
  return res.data.items;
}

export async function getUser(username) {
  const res = await api.get(`/users/${username}`);
  return res.data;
}
