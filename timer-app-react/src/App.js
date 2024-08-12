/**
 * Authors: Sunny Tian, Henok Assalif
 * 7/21/2024
 * Timer App
 */

import './App.css';
import Timer from './components/Timer.js';
import NavBar from './components/NavBar';

function App() {
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
