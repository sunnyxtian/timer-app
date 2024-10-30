import '../components-styling/Indicator.css';

function IntervalIndicator(props) {
  // Props parameters
  let currInterval = props.currentInterval;
  const totalIntervals = props.totalIntervals;
  let remainingTime = props.remainingTime;
  const totalMins = props.totalMins;
  const isFocusState = props.isFocusState;

  // Generate an array with the length of totalIntervals and map it to display intervals
  const intervalsArray = Array(totalIntervals).fill(null);

  return (
    <div className="d-inline-flex p-4 entire-indicator">
      {intervalsArray.map((_, index) => (
        <div
          key={index}
          className={`mx-2 ${index + 1 < currInterval ? "background-color-completed" :
            "background-color-not-completed"} ${index + 1 === currInterval && props.isFocusState
            ? "background-color-in-progress" : ""} ${!isFocusState && index + 1 === currInterval
            ? "background-color-break" : ""}`}
          style={{
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
 *
 * So I got it working but it updates it in progress bar style in both the focus and break sessions.
 *
 * My next step is to determine if we only want this featue for focus state or switch the color to
 * orange or red or something for the break state. (Talk to sunny)(TODO)
 * - Sunny: THe interval indicator is only for focus states
 */