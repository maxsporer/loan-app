import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Header />
      <div className="py-4 text-center">
        Calculate and view your loan amortization schedule.
      </div>
    </div>
  );
}

export default App;
