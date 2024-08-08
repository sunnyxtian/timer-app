/**
 * Comment purpose later (By Henok Assalif & Sunny Tian)
 * Credits to GeeksforGeeks for ideas
 */

import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    const [timer, setTimer] = useState("00:00:00");


    /**
     * Gets the remains amount of time
     * @param {Event} e - Event object
     * @returns
     */
    const getTimeRemaining = (e) => {
      const total =
          Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor(
          (total / 1000 / 60) % 60
      );
      const hours = Math.floor(
          (total / 1000 / 60 / 60) % 24
      );
      return {
          total,
          hours,
          minutes,
          seconds,
      };
    };

    /**
     * Updates the timer state value
     * @param {Event} e - Event Object
     */
    const startTimer = (e) => {
      let { total, hours, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
    };

    /**
     * Sets the timer to 60 seconds and resets it
     * @param {Event} e - The event object
     */
    const clearTimer = (e) => {
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next
        setTimer("00:01:00");

        // If you try to remove this line the
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) {
            clearInterval(Ref.current);
        }

        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time (+ total second)
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    };

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    };

    return (
        <div>
            <h1>GeeksforGeeks</h1>
            <h3>Countdown Timer Using React JS</h3>
            <h2>{timer}</h2>
            <button onClick={onClickReset}>Reset</button>
        </div>
    );
}

export default Timer;