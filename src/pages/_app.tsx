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
    <div className=''>
        <div style={{display:"flex",backgroundColor:"black", paddingTop:"40px",paddingBottom:"40px",width:"100%"}}>
            <button className='' style={{border:"1px solid#fff",borderRadius:"30px",padding:"20px", marginTop:"10px"}} onClick={() => window.location.reload()}>Refresh</button>
        <button style={{marginLeft:"1550px",border:"1px solid#fff",borderRadius:"30px",padding:"20px"}} onClick={toggleDarkMode}>Toggle Dark Mode</button> </div>
      
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
