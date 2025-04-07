import React, { Suspense } from 'react';
import './App.css';
import Home from './components/Home';
import AppRoutes from './routes/Routes';

function App() {
  return (
    <div>
      <Suspense fallback={<Home />}>
        <AppRoutes />
      </Suspense>
    </div>
  );
}

export default App;
