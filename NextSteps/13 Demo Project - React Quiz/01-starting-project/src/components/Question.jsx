import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({
  questionText,
  answers,
  onSelected
  activeQuestionIndex,
  answerState,
  userAnswers,
  handleSelectAnswer,
  handleSkipAnswer,
}) {
  return (
    <div id="question">
      <QuestionTimer
        key={activeQuestionIndex} // Wazna rzecz aby resetowac timer przy kazdym nowym pytaniu
        timeout={10000}
        onTimeout={handleSkipAnswer}
      />
      <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
      <Answers
        key={activeQuestionIndex}
        answers={QUESTIONS[activeQuestionIndex].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
