const API_URL = 'http://localhost:5001';

export const getUser = () => {
  return fetch(`${API_URL}/api/users`).then((res) => res.json());
};

