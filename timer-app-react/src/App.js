/**
 * Authors: Sunny Tian, Henok Assalif
 * 7/21/2024
 * Timer App
 */

import './App.css';
import Timer from './components/Timer.js';
import NavBar from './components/NavBar';

function App() {

  // DEV PLAN

  // initialize browser router

  // have the current interval and interval number as a state variable
  // and then pass the callback setter function as a prob to the timer component
  // this will allow the timer component to increment the current interval number

  // we can use division to figure out if the interval is a break or focus session

  // we need to implement a routing system with react browser router
  // that routes to the summary page instead of the timer page when current
  // interval is final one.

  // have the break and focus times as a state variable
  // pass the setter function to the settings component to let the user edit
  // break and focus times

  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <Timer/>
      </header>
    </div>
  );
}

export default App;