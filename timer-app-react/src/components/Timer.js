import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from 'react-bootstrap/Button';

// For sunny
const Timer = (props) => {

    // Define the initial duration in seconds
    const INITIAL_DURATION = props.isFocusInterval ? props.focusLengthMins * 60 : props.breakLengthMins * 60;

    /**
     * Formats time from seconds to HH:MM:SS
     * @param {number} seconds - Time in seconds
     * @returns {String} - Formatted time string
     */
    const formatTime = (seconds) => {
        if (seconds <= 0) {
            return "00:00:00"; // Handle zero or negative time
        }

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return (
            (hours > 9 ? hours : "0" + hours) + ":" +
            (minutes > 9 ? minutes : "0" + minutes) + ":" +
            (secs > 9 ? secs : "0" + secs)
        );
    };

    // Define refs and state variables
    const Ref = useRef(null);
    const [timer, setTimer] = useState(formatTime(INITIAL_DURATION));
    const [remainingTime, setRemainingTime] = useState(INITIAL_DURATION);
    const [isPaused, setIsPaused] = useState(false);

    /**
     * Updates the timer state value every second
     */
    const updateTimer = () => {
        setRemainingTime((prevTime) => {
            if (prevTime > 0) {
                return prevTime - 1;
            } else {
                clearInterval(Ref.current);
                return 0; // Ensure time doesn't go negative
            }
        });
    };

    /**
     * Starts the timer
     */
    const startTimer = useCallback(() => {
        if (Ref.current) {
            clearInterval(Ref.current);
        }
        Ref.current = setInterval(updateTimer, 1000);
    }, []);

    /**
     * Handles the switch between focus and break states with a delay
     */
    const handleSwitchState = () => {
      setTimeout(() => {
          const newFocusState = !props.isFocusInterval;
          props.toggleFocusState(); // Toggle the focus state

          if (newFocusState) { // increment interval if new state is focus session
              props.incrementInterval(props.currentInterval + 1);
          }

          const newDuration = newFocusState ? props.focusLengthMins * 60 : props.breakLengthMins * 60;
          setRemainingTime(newDuration);
          setTimer(formatTime(newDuration));
          startTimer();
      }, 3000); // 3 second delay before switching state
    };

    /**
     * Resets the timer to the initial duration and starts it
     */
    const onClickReset = () => {
        if (Ref.current) {
            clearInterval(Ref.current);
        }
        const newDuration = props.isFocusInterval ? props.focusLengthMins * 60 : props.breakLengthMins * 60;
        setRemainingTime(newDuration);
        setTimer(formatTime(newDuration));
        startTimer();
        setIsPaused(false);
    };

    /**
     * Pauses the timer
     */
    const onClickPause = () => {
        if (!isPaused) {
            clearInterval(Ref.current);
            setIsPaused(true);
        }
    };

    /**
     * Resumes the timer
     */
    const onClickResume = () => {
        if (isPaused) {
            startTimer();
            setIsPaused(false);
        }
    };

    // We use useEffect to start the timer when the component mounts
    useEffect(() => {
        startTimer();
        return () => clearInterval(Ref.current); // Cleanup interval on unmount
    }, [startTimer]);

    // Update the timer display whenever remainingTime changes
    useEffect(() => {
        setTimer(formatTime(remainingTime));

        if (remainingTime === 0) {
            handleSwitchState(); // Call state switch handler when timer hits zero
        }
    }, [remainingTime]);

    return (
        <div>
            <h3 className="fs-6 text-secondary">study session</h3>
            <h2>{timer}</h2>
            <Button onClick={onClickReset}>Reset</Button>
            {isPaused ? (
                <Button onClick={onClickResume}>Resume</Button>
            ) : (
                <Button onClick={onClickPause}>Pause</Button>
            )}
        </div>
    );
};

export default Timer;
