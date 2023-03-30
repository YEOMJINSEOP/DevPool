import axios from 'axios';

const API_URL = 'http://localhost:5001';

export const getUsers = () => {
  return fetch(`${API_URL}/users`).then((res) => res.json());
};

export const getUserById = (userId) => {
  return fetch(`${API_URL}/users/${userId}`).then((res) => res.json());
};

export const getMemberInfo = () => {
  return axios.get('data/member.json');
}
