import '../componentsCSS/Indicator.css';

function IntervalIndicator(props) {
  // Props parameters
  let currInterval = props.currentInterval;
  const totalIntervals = props.totalIntervals;
  let remainingTime = props.remainingTime;
  const totalMins = props.totalMins;

  // Generate an array with the length of totalIntervals and map it to display intervals
  const intervalsArray = Array(totalIntervals).fill(null);

  return (
    <div className="d-inline-flex p-4">
      {intervalsArray.map((_, index) => (
        <div
          key={index}
          className={`rounded mx-1 ${index + 1 < currInterval ? "background-color-completed" : "background-color-not-completed"} ${index + 1 === currInterval ? "background-color-in-progress" : ""}`}
          style={{
            width: "2rem",
            height: "1rem",
            '--remaining-time': remainingTime, // custom CSS variables
            '--total-mins': totalMins
          }}
        >
        </div>
      ))}
    </div>
  );
}

export default IntervalIndicator;




/**
 * This componets represents all the focus states of our pomodoro timer. It will display the
 * current interval and the total number of focus intervals as rounded rectangles.
 * Each rectangle will be filled according to the current time in the interval.
 *
 * 1.) Get info about the total number of focus intervals and the current interval from
 *     the parent component
 *
 * 2.) Display all the total intervals in rectangles and fill them with the color grey
 *     (grey indicates incomplete)
 *
 * 3.) As the time progresses in the current interval, fill the rectangle with the color
 *     yellow from from left to right (YouTube tutorials + a bit of math needed)
 *     (yellow indicates in progress)
 *
 * 4.) When the current interval is over, color the oval green and move to the next oval
 *     (green indicates complete)
 *
 *
 * Intervals needs: Total intervals, current interval, and interval total time and current time in
 * current interval
 *
 *
 * So I got it working but it updates it in progress bar style in both the focus and break sessions.
 *
 * My next step is to determine if we only want this featue for focus state or switch the color to
 * orange or red or something for the break state. (Talk to sunny)(TODO)
 */