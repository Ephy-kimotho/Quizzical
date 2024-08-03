/* eslint-disable react/prop-types */

function Landing(props) {
  return (
    <section className="Landing">
      <h1 className="Landing__title">Quizzical</h1>
      <p className="Landing__text">
      Test your trivia knowledge with Quizzical! Click Start Quiz to begin the challenge.
      </p>
      <button className="Landing__btn btn" onClick={props.start}>
        Start quiz
      </button>
    </section>
  );
}

export default Landing;
