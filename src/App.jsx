import React from 'react';
import PomodoroTimer from './components/PomodoroTimer';
import PomodoroTimerBeta from './components/PomodoroTimerBeta';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <PomodoroTimerBeta />
      </div>
    </div>
  );
}

export default App;
