import React from "react";
import Landing from "./components/Landing";
import Quiz from "./components/Quiz";
import "./App.css";
import blob1 from "./assets/blob_1.png";
import blob2 from "./assets/blob_2.png";

function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  async function start() {
    try {
      const URL =
        "https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple";
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Network error failed !");
      }
      const data = await response.json();
      setQuestions(data.results);
      setStartQuiz(true);
    } catch (error) {
      console.error("Error fetching questions from database: ", error);
    }
  }

  return (
    <main>
      <img src={blob1} alt="a blob" className="image img-1" />
      <img src={blob2} alt="a blob" className="image img-2" />
      {startQuiz ? (
        <Quiz questions={questions} start={start} />
      ) : (
        <Landing start={start} />
      )}
    </main>
  );
}

export default App;
