import { useState } from "react";


import QUESTIONS from "../questions.js";
import quizIsCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5 );
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  if (quizIsComplete) {
    return <div id="summary">
      <img src="quizIsCompleteImg" alt="Tophy icon" />
      <h2>Quiz Completed!</h2>
    </div>
  }
  return (
    <div id="quiz">
      <div id="question">
        {" "}
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>{" "}
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
