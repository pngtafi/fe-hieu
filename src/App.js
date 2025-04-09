import React, { useEffect, Suspense } from 'react';
import './App.css';
import Home from './components/Home';
import AppRoutes from './routes/Routes';

function App() {
  // useEffect(() => {
  //   let timeout;
  //   const handleScroll = () => {
  //     document.body.classList.add('scrolling');
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       document.body.classList.remove('scrolling');
  //     }, 1000); // sau 1s không cuộn thì ẩn scrollbar
  //   };

  //   window.addEventListener('wheel', handleScroll);
  //   return () => window.removeEventListener('wheel', handleScroll);
  // }, []);
  return (
    <div>
      <Suspense fallback={<Home />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

export default App;
