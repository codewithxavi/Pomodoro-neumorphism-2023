import React from 'react';
import PomodoroTimer from './components/PomodoroTimer';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <PomodoroTimer />
      </div>
    </div>
  );
}

export default App;
