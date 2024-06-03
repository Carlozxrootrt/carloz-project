// src/pages/login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const router = useRouter();
  
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    router.push('/dashboard'); // redirect to dashboard
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
