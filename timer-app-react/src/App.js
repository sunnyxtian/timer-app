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
import Settings from './components/Settings.js'

function App() {

  // DEV PLAN

  // DONE initialize browser router

  // DONE 1. have the current interval and interval number as a state variable
  // and then pass the callback setter function as a prob to the timer component
  // this will allow the timer component to increment the current interval number
  const [currInterval, setCurrInterval] = useState(1);
  const [numIntervals, setNumIntervals] = useState(8);

  // DONE 2. have the break and focus durations as a state variable
  // pass the setter function to the settings component to let the user edit
  // break and focus times
  const [breakDurationMins, setBreakDurationMins] = useState(5);
  const [focusDurationMins, setFocusDurationMins] = useState(20);

  // 3. Make wrapper functions to pass the consts downwards.

  // 4. we can use division to figure out if the interval is a break or focus session

  // 5. we need to implement a routing system with react browser router
  // that routes to the summary page instead of the timer page when current
  // interval is final one.

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="" element={<Timer currentInterval={currInterval} totalInterval={numIntervals} /*setter function*/
                /*focusState={focusStateBool}*//>} />
        <Route path="settings" element={<Settings/>} />
      </Routes>
    </div>
  );
}

export default App;