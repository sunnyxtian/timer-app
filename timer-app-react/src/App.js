import React, { useState } from 'react';
import Timer from './components/Timer';
import './App.css';

function App() {
  // State variables
  const [currInterval, setCurrInterval] = useState(1);
  const [totalIntervals, setTotalIntervals] = useState(4);
  const [breakLengthMins, setBreakLengthMins] = useState(1 / 6); // Adjust as needed
  const [focusLengthMins, setFocusLengthMins] = useState(2 / 6); // Adjust as needed
  const [isFocusInterval, setIsFocusInterval] = useState(true);

  // Handler functions
  const incrementInterval = () => {
    setCurrInterval(prevInterval => prevInterval + 1);
  };

  const editTotalIntervals = (updatedTotalIntervals) => {
    setTotalIntervals(updatedTotalIntervals);
  };

  const editBreakLengthMins = (updatedBreakLengthMins) => {
    setBreakLengthMins(updatedBreakLengthMins);
  };

  const editFocusLengthMins = (updatedFocusLengthMins) => {
    setFocusLengthMins(updatedFocusLengthMins);
  };

  const toggleFocusState = (updatedFocusState) => {
    setIsFocusInterval(updatedFocusState);
  };

  return (
    <div className="App">
      <Timer
        currentInterval={currInterval}
        totalIntervals={totalIntervals}
        breakLengthMins={breakLengthMins}
        focusLengthMins={focusLengthMins}
        incrementInterval={incrementInterval}
        editTotalIntervals={editTotalIntervals}
        editBreakLengthMins={editBreakLengthMins}
        editFocusLengthMins={editFocusLengthMins}
        isFocusState={isFocusInterval}
        toggleFocusState={toggleFocusState}
      />
    </div>
  );
}

export default App;
