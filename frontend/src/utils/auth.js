// frontend/src/utils/auth.js

export const getToken = () => {
  return sessionStorage.getItem("adminToken");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  sessionStorage.removeItem("adminToken");
};

// Helper to make authenticated requests
export const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
