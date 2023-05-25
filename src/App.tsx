import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';

function App() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Nav />
        <div>
          Calculate and view your loan amortization schedule.
        </div>
      </div>
    </div>
  );
}

export default App;
