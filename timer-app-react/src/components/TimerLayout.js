import React, { useState, useEffect, useRef, useCallback } from 'react';
import IntervalIndicator from './IntervalIndicator';
import BorderBar from './BorderBar';
import Settings from './Settings';

import '../components-styling/TimerLayout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const MainTimer = ({focusOrBreakMode, timer, isPaused, onClickResume, onClickPause}) => {

    const handleResume = () => {
        onClickResume();
    }

    const handlePause = ()=> {
        onClickPause();
    }

    return(
        <div className="main-timer py-2">
            <h3 className="fs-6 text-secondary fw-normal">{focusOrBreakMode + " mode"}</h3>
            <h1 className="fw-medium">{timer}</h1>
            <button className={`play-pause-btn ${isPaused ? '' : 'paused'}`}
                onClick={isPaused ? handleResume : handlePause}
                >
                <FontAwesomeIcon icon={faPlay} className="play-icon" />
                <FontAwesomeIcon icon={faPause} className="pause-icon" />
            </button>
        </div>
    )
}

// Timer component
const Timer = (props) => {
    // deconstruct props
    const {isFocusState, focusLengthMins, breakLengthMins, totalIntervals, currentInterval,
        toggleFocusState, incrementInterval, editBreakLengthMins, editFocusLengthMins,
        editTotalIntervals} = props;

    const [initialDuration, setInitialDuration] = useState(
        props.isFocusState ? props.focusLengthMins * 60 : props.breakLengthMins * 60
    );

    const focusOrBreakMode = props.isFocusState ? "focus" : "break";

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

    const Ref = useRef(null);
    const [timer, setTimer] = useState(formatTime(initialDuration));
    const [remainingTime, setRemainingTime] = useState(initialDuration);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);

    const updateTimer = () => {
        setRemainingTime((prevTime) => {
            if (prevTime > 0) {
                const newTime = prevTime - 1;
                return newTime;
            } else {
                clearInterval(Ref.current);
                return 0; // Ensure time doesn't go negative
            }
        });
    };

    const startTimer = useCallback(() => {
        if (Ref.current) {
            clearInterval(Ref.current);
        }
        Ref.current = setInterval(updateTimer, 1000);
    }, []);

    const handleSwitchState = () => {
        setTimeout(() => {
            const newState = !isFocusState; // Determine new state
            toggleFocusState(newState); // Toggle the focus state

            // Increment currentInterval only if transitioning from break to focus
            if (!isFocusState && newState) {
                // Only increment if the current state is break (false) and new state is focus (true)
                incrementInterval(); // Function to increment the current interval
            }

            setInitialDuration(() => {
                const newDuration = newState ? focusLengthMins * 60 : breakLengthMins * 60;
                return newDuration;
            });
        }, 3000); // 3 second delay before switching state
    };

    // const onClickReset = () => {
    //     if (Ref.current) {
    //         clearInterval(Ref.current);
    //     }
    //     const newDuration = props.isFocusState ? props.focusLengthMins * 60 : props.breakLengthMins * 60;
    //     setRemainingTime(newDuration);
    //     startTimer();
    //     setIsPaused(false);
    // };

    const onClickPause = () => {
        if (!isPaused) {
            clearInterval(Ref.current);
            setIsPaused(true);
        }
    };

    const onClickResume = () => {
        if (isPaused) {
            startTimer();
            setIsPaused(false);
        }
    };

    useEffect(() => {
        startTimer();
        return () => clearInterval(Ref.current); // Cleanup interval on unmount
    }, [startTimer]);

    useEffect(() => {
        setTimer(formatTime(remainingTime));

        if (remainingTime === 0) {
            handleSwitchState(); // Call state switch handler when timer hits zero
        }
    }, [remainingTime]);

    useEffect(() => {
        setInitialDuration(() => {
            const newDuration = isFocusState ? focusLengthMins * 60 : breakLengthMins * 60;
            setRemainingTime(newDuration); // Update the remaining time
            setTimer(formatTime(newDuration)); // Update the displayed timer
            startTimer(); // Start the timer
            return newDuration;
        });
    }, [isFocusState, focusLengthMins, breakLengthMins]);

    // Update the progress whenever initialDuration or remainingTime changes
    useEffect(() => {
        if (initialDuration > 0) {
            const newProgress = ((initialDuration - remainingTime) / initialDuration) * 100;
            setProgress(newProgress);
        }
    }, [initialDuration, remainingTime]);

    return (
        <div>
            <div className="border">
                <BorderBar progress={progress} />
                <div className="entire-timer">
                    <MainTimer
                        focusOrBreakMode={focusOrBreakMode}
                        timer={timer}
                        isPaused={isPaused}
                        onClickResume={onClickResume}
                        onClickPause={onClickPause}
                        remainingTime={remainingTime}
                    />
                    <div className="entire-interval-indicator">
                        <IntervalIndicator
                            totalMins={initialDuration}
                            remainingTime={remainingTime}
                            totalIntervals={totalIntervals}
                            currentInterval={currentInterval}
                            isFocusState={isFocusState}
                        />
                    </div>
                    <div>
                        <Settings
                            editTotalIntervals={editTotalIntervals}
                            editBreakLengthMins={editBreakLengthMins}
                            editFocusLengthMins={editFocusLengthMins}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;