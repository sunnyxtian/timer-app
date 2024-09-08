function IntervalIndicator({ interval }) {
  return (
    <div>
      <h2>Interval: {interval}</h2>
    </div>
  );
}

export default IntervalIndicator;


/**
 * This componets represents all the focus states of our pomodoro timer. It will display the
 * current interval and the total number of intervals visual in ovals. Each oval will be filled
 * according to the current time in the interval.
 *
 * 1.) Get info about the total number of intervals and the current interval from the parent
 * component
 *
 * 2.) Display all the total intervals in ovals and fill them with the color grey
 *
 * 3.) Color the current interval oval with the color yellow
 *
 * 4.) As the time progresses in the current interval, fill the oval with the color yellow from
 *     from left to right (YouTube tutorials + a bit of math needed)
 *
 * 5.) When the current interval is over, color the oval green and move to the next oval
 */