function Settings (props) {
  const editTotalIntervals = props.editTotalIntervals;
  const editBreakLengthMins = props.editBreakLengthMins;
  const editFocusLengthMins = props.editFocusLengthMins;

  return (
    <div>
      <div className="btn-group" role="group">
        <button className="btn" type="button">
          {/* <svg style={{fill:"#000000"}}>
            <path class="st0" d="M612,349.5c33.8,0,67.5,5.3,100.1,15.8c32.4,10.4,64.1,25.9,94.3,46.2c30.6,20.6,59.7,46,86.4,75.7
              c27.3,30.3,52.2,64.9,73.8,102.8c6.6,11.5,6.6,32.5,0,44c-21.7,37.9-46.5,72.5-73.8,102.8c-26.7,29.7-55.8,55.1-86.4,75.7
              c-30.2,20.3-61.9,35.8-94.3,46.2c-32.6,10.5-66.3,15.8-100.1,15.8s-67.5-5.3-100.1-15.8c-32.4-10.4-64.1-25.9-94.3-46.2
              c-30.6-20.6-59.7-46-86.4-75.7c-27.3-30.3-52.2-64.9-73.8-102.8c-6.6-11.5-6.6-32.5,0-44c21.7-38,46.5-72.5,73.8-102.8
              c26.7-29.7,55.8-55.1,86.4-75.7c30.2-20.3,61.9-35.8,94.3-46.2C544.5,354.8,578.2,349.5,612,349.5 M612,243.3
              c-182.6,0-344.8,115.4-446.8,293.9c-25.3,44.3-25.3,105.2,0,149.4c102,178.5,264.2,293.9,446.8,293.9s344.8-115.4,446.8-293.9
              c25.3-44.3,25.3-105.2,0-149.4C956.8,358.8,794.6,243.3,612,243.3L612,243.3z"/>
            <circle class="st0" cx="612" cy="604.7" r="195"/>
          </svg> */}
        </button>
      </div>

      <div>
        <button></button>
        <div className="d-none">
          <button>

          </button>
          <button>

          </button>
          <button>

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