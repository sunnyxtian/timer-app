import "../components-styling/Progress.css"

function ProgressBar (props) {
  // save props

  // define a variable that is an svg block
    // inside, add the Progress Path element.

  return (
    <div className="progress">
      <p>ProgressBar</p>
      {/** Insert the svg here */}
    </div>
  )
}

function ProgressPath () {

  // functions that control a path element
    // - start progress function
    // - increment progress by repositioning path
      // at every corner (should be the length of the perimeter up to the corner),
      // reorient the path
    // - stop progress???

  // return the path element
}

export default ProgressBar;