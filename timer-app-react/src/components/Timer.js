import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from 'react-bootstrap/Button';

const Timer = () => {
    // Define the initial duration in seconds
    const INITIAL_DURATION = 60;

    /**
     * Formats time from seconds to HH:MM:SS
     * @param {number} seconds - Time in seconds
     * @returns {string} - Formatted time string
     */
    const formatTime = (seconds) => {
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
        if (remainingTime > 0) {
            setRemainingTime(prevTime => prevTime - 1);
        } else {
            clearInterval(Ref.current);
            setTimer("00:00:00");
        }
    };

    /**
     * Starts the timer
     */
    const startTimer = useCallback(() => {
        if (Ref.current) {
            clearInterval(Ref.current);
        }
        Ref.current = setInterval(() => {
            updateTimer();
        }, 1000);
    }, []);

    /**
     * Resets the timer to the initial duration and starts it
     */
    const onClickReset = () => {
        if (Ref.current) {
            clearInterval(Ref.current);
        }
        setRemainingTime(INITIAL_DURATION);
        setTimer(formatTime(INITIAL_DURATION));
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
    }, [remainingTime]);

    return (
        <div>
            <h3>Countdown Timer Using React JS</h3>
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