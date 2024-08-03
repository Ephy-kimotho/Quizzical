/* eslint-disable react/prop-types */
import React from "react";
import Trivia from "./Trivia";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

function Quiz({ questions, start }) {
  const [selectedAnswers, setSelecetedAnswers] = React.useState({});
  const [isChecked, setIsChecked] = React.useState(false);
  const [shuffledQuestions, setShuffledQuestions] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [quizEnded, setQuizEnded] = React.useState(false);

  React.useEffect(() => {
    const shuffledQuestions = questions.map((question) => ({
      ...question,
      id: nanoid(),
      choices: shuffleAnswers(question),
    }));
    setShuffledQuestions(shuffledQuestions);
    setSelecetedAnswers({});
    setIsChecked(false);
    setScore(0);
    setQuizEnded(false);
  }, [questions]);

  function handleSelect(questionId, choice) {
    setSelecetedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: choice,
    }));
  }

  function calculateScore() {
    let score = 0;
    shuffledQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correct_answer) {
        score = score + 1;
      }
      setScore(score);
    });
  }

  function checkAnswers() {
    setIsChecked(true);
    calculateScore();
    setQuizEnded(true);
  }

  function playAgain() {
    start();
  }

  function shuffleAnswers(question) {
    const possibleAnswers = [...question.incorrect_answers];
    const randomIndex = Math.floor(
      Math.random() * (possibleAnswers.length + 1)
    );
    possibleAnswers.splice(randomIndex, 0, question.correct_answer);
    return possibleAnswers;
  }

  const triviaQuestions = shuffledQuestions.map((question) => {
    return (
      <Trivia
        key={question.id}
        questionId={question.id}
        question={decode(question.question)}
        choices={question.choices}
        correctAnswer={question.correct_answer}
        selectedAnswer={selectedAnswers[question.id]}
        handleSelect={handleSelect}
        isChecked={isChecked}
      />
    );
  });

  const buttonText = quizEnded ? "Play Again" : "Check Answers";

  const styles = {
    display: "block",
  };

  return (
    <section>
      {triviaQuestions}
      <div className="results-container">
        <h3 className="result-text" style={styles}>
          {`You have got ${score} / ${shuffledQuestions.length} answers correct`}
        </h3>
        <button
          className="result-btn btn"
          onClick={quizEnded ? playAgain : checkAnswers}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default Quiz;
