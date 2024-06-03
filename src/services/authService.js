// src/services/authService.js
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // If you are storing any other user-specific information, remove it here
};

export const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false;
};
