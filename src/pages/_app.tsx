"use strict";
import { useEffect } from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('dark-mode', isDarkMode.toString());
  };

  return (
    <div>
      <button onClick={() => window.location.reload()}>Refresh</button>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button> 
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
