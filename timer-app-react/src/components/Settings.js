import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faVolumeHigh, faEye, faStopwatch, faImage, faMusic } from '@fortawesome/free-solid-svg-icons';
import '../components-styling/Settings.css';

function Settings (props) {
  const editTotalIntervals = props.editTotalIntervals;
  const editBreakLengthMins = props.editBreakLengthMins;
  const editFocusLengthMins = props.editFocusLengthMins;

  return (
    <div className="button-bar">
      <div className="btn-group" role="group">
        <button className="btn" type="button">
          <FontAwesomeIcon icon={faVolumeHigh} className="icon fa-2x" />
        </button>
        <button className="btn" type="button">
          <FontAwesomeIcon icon={faEye} className="icon" />
        </button>
      </div>

      <div className="btn-group">
        <button className="btn" type="button">
          <FontAwesomeIcon icon={faSliders} className="icon" />
        </button>
        <div className="d-none">
          <button className="btn" type="button">
            <FontAwesomeIcon icon={faStopwatch} />
          </button>
          <button className="btn" type="button">
            <FontAwesomeIcon icon={faImage} />
          </button>
          <button className="btn" type="button">
            <FontAwesomeIcon icon={faMusic} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings;

/** DEV NOTES */

/**
 * PROPS
 * - edit break length mins (App.js)
 * - edit focus length mins (App.js)
 * - edit total intervals (App.js)
 *
 * Based on the props all being from App.js, we can render
 * Settings in App.js.
 *
 */

/**
 * DEV PLAN
 * - Add Settings into App.js return - DONE
 * - Give it the 3 necessary props, and deconstruct them - DONE
 *
 * - Add the general structure using divs - DONE
 * - Add background colors
 * - Add svgs
 *
 * Basic Buttons
 * - Add muteability for mute button
 * - On click changes the mute svg to toggled
 * - On click changes the eye svg to toggled
 * - Add super focus mode functionality
 *
 * Settings Buttons
 * - Add hoverability on filter button
 * - Add the hidden filter button options
 * - Add the ability to create a sidebar on click of any filter options
 *
 * - Add sidebar functionality in seperate sidebar component
 */