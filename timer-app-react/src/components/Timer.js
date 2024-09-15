import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import IntervalIndicator from './IntervalIndicator';
import ProgressBar from './ProgressBar';
import '../components-styling/Timer.css';

// For sunny
const Timer = (props) => {
  /** TO DO: destructure props for easier readability */

    // Define the initial duration in seconds
    const INITIAL_DURATION = props.isFocusState ? props.focusLengthMins * 60 :
        props.breakLengthMins * 60;

    const focusOrBreakMode = props.isFocusState ? "focus" : "break";

    /**
     * Formats time from seconds to MM:SS
     * @param {number} seconds - Time in seconds
     * @returns {String} - Formatted time string
     */
    const formatTime = (seconds) => {
        if (seconds <= 0) {
            return "00:00"; // Handle zero or negative time
        }

        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return (
            (minutes > 9 ? minutes : "0" + minutes) + ":" +
            (secs > 9 ? secs : "0" + secs)
        );
    };

    // Define refs and state variables
    const Ref = useRef(null);
    const [timer, setTimer] = useState(formatTime(INITIAL_DURATION));
    const [remainingTime, setRemainingTime] = useState(INITIAL_DURATION);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    /**
     * Updates the timer state value every second
     */
    // Modify the updateTimer function to update progress
    const updateTimer = () => {
      setRemainingTime((prevTime) => {
          if (prevTime > 0) {
              const newTime = prevTime - 1;
              // Calculate progress percentage
              const newProgress = ((INITIAL_DURATION - newTime) / INITIAL_DURATION) * 100;
              setProgress(newProgress);
              return newTime;
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
        console.log(props.isFocusState); // this outputs the correct state
          const newState = !props.isFocusState; // Switch state
          props.toggleFocusState(newState); // Toggle the focus state
          // Use Effect is handling the state change
      }, 3000); // 3 second delay before switching state
    };

    /**
     * Resets the timer to the initial duration and starts it
     */
    const onClickReset = () => {
        if (Ref.current) {
            clearInterval(Ref.current);
        }
        const newDuration = props.isFocusState ? props.focusLengthMins * 60 : props.breakLengthMins * 60;
        setRemainingTime(newDuration);
        // setTimer(formatTime(newDuration)); Not necessary since this function runs when remaining time changes
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

    useEffect(() => {
        if (props.isFocusState) { // increment interval if new state is focus session
          props.incrementInterval(props.currentInterval + 1);
        }

        // This will run after props.isFocusState has changed
        const newDuration = props.isFocusState ? props.focusLengthMins * 60 : props.breakLengthMins * 60;

        setRemainingTime(newDuration);
        setTimer(formatTime(newDuration));
        startTimer();
    }, [props.isFocusState]); // Dependency array ensures this runs after isFocusState changes

    return (
      <div className="border">
        <ProgressBar progress={progress} />
        <div className="entire-timer">
          <div className="main-timer py-5">
            <h3 className="fs-6 text-secondary fw-normal">{focusOrBreakMode + " mode"}</h3>
            <h1 className="fw-medium">{timer}</h1>
            {isPaused ? (
              <Button onClick={onClickResume}>Resume</Button>
            ) : (
              <Button onClick={onClickPause}>Pause</Button>
            )}
          </div>
          <div className="entire-interval-indicator">
            <IntervalIndicator
              totalMins={INITIAL_DURATION}
              remainingTime={remainingTime}
              totalIntervals={props.totalIntervals}
              currentInterval={props.currentInterval}
              isFocusState={props.isFocusState}
            />
          </div>
        </div>
      </div>
    );
};

export default Timer;