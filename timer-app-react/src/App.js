/**
 * Authors: Sunny Tian, Henok Assalif
 * 7/21/2024
 * Timer App
 */

import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import './App.css';
import Timer from './components/Timer.js';
import NavBar from './components/NavBar.js';
import Settings from './components/Settings.js';

function App() {

  // DEV PLAN

  // DONE initialize browser router

  // DONE 1. have the current interval and interval number as a state variable
  // and then pass the callback setter function as a prop to the Timer component
  // this will allow the Timer component to increment the current interval number
  const [currInterval, setCurrInterval] = useState(0);
  const [totalIntervals, setTotalIntervals] = useState(3);

  // DONE 2. have the break and focus durations as a state variable
  // pass the setter function to the settings component to let the user edit
  // break and focus times
  const [breakLengthMins, setBreakLengthMins] = useState(1/6);
  const [focusLengthMins, setFocusLengthMins] = useState(2/6);
  const [isFocusInterval, setIsFocusInterval] = useState(true);

  // 3. Pass wrapper functions of setters down to the child elements.
  const incrementInterval = function () {
    const updatedCurrInterval = currInterval + 1;
    setCurrInterval(updatedCurrInterval);
  }

  const editTotalIntervals = function (updatedTotalIntervals) {
    setTotalIntervals(updatedTotalIntervals);
  }

  const editBreakLengthMins = function (updatedBreakLengthMins) {
    setBreakLengthMins(updatedBreakLengthMins);
  }

  const editFocusLengthMins = function (updatedFocusLengthMins) {
    setFocusLengthMins(updatedFocusLengthMins);
  }

  const toggleFocusState = function () {
    const updatedFocusState = !isFocusInterval;
    setIsFocusInterval(updatedFocusState);
  }

  // 4. we can use division to figure out if the interval is a break or focus session

  // 5. we need to implement a routing system with react browser router
  // that routes to the summary page instead of the timer page when current
  // interval is final one.

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="" element={<Timer currentInterval={currInterval} totalInterval={totalIntervals}
          breakLength={breakLengthMins} focusLengthMins={focusLengthMins}
          incrementInterval={incrementInterval} editTotalIntervals={editTotalIntervals}
          isFocusInterval={isFocusInterval} toggleFocusState={toggleFocusState}/>} />
        <Route path="settings" element={<Settings/>} />
      </Routes>
    </div>
  );
}

export default App;
