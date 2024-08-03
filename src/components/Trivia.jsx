/* eslint-disable react/prop-types */
import { decode } from "html-entities";

function Trivia(props) {
  function getClassNames(choice) {
    if (props.isChecked) {
      if (props.selectedAnswer === choice) {
        return choice === props.correctAnswer ? "selected correct" : "selected incorrect";
      } else if (choice === props.correctAnswer) {
        return "correct";
      }
    } else if (props.selectedAnswer === choice) {
      return "selected";
    }
    return "";
  }

  return (
    <article className="question-container">
      <h2 className="question">{props.question}</h2>
      <ul className="choices">
        {props.choices.map((choice, index) => (
          <li
            key={index}
            onClick={() => props.handleSelect(props.questionId, choice)}
            className={getClassNames(choice)}
          >
            {decode(choice)}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default Trivia;
