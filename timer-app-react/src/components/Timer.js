/**
 * Comment purpose later (By Henok Assalif & Sunny Tian)
 * Credits to GeeksforGeeks for ideas
 */

import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';

const Timer = () => {
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    const [timer, setTimer] = useState("00:00:00");


    /**
     * Gets the remains amount of time
     * @param {Date} date - The date object
     * @returns
     */
    const getTimeRemaining = (date) => {
      const total = Date.parse(date) - Date.parse(new Date()); // static shifted time minus
      // the static current time
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / 1000 / 60 / 60) % 24);
      return {
          total,
          hours,
          minutes,
          seconds,
      };
    };

    /**
     * Updates the timer state value
     * @param {Date} date - The date Object
     */
    const startTimer = (date) => {
      let { total, hours, minutes, seconds } =
            getTimeRemaining(date);
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
     * @param {Date} date - The date object shifted by the timer
     */
    const clearTimer = (date) => {
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
            startTimer(date);
        }, 1000);
        Ref.current = id;
    };

    // implement the pause and start feature function here and place a new button for pause in jsx
    // The implemenation is similar to the cleartimer function. Before clearing interval get the
    // the value in timer. Clear it and set the state to it. Switch the button from pause to start
    // once the button is clicked again then start the timer again. by using set interval and start
    // timer function.

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if
        // you entend to add more time (+ total second)

        // add 60 seconds to the current time
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
            <h3>Countdown Timer Using React JS</h3>
            <h2>{timer}</h2>
            <Button onClick={onClickReset}>Reset</Button>
        </div>
    );
}

export default Timer;