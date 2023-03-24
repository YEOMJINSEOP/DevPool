const API_URL = 'http://localhost:5001';

export const getUsers = () => {
  return fetch(`${API_URL}/users`).then((res) => res.json());
};

