import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  // const [timerStarted, setTimerStarted] = useState(false);
  // const [timerExpired, setTimerExpired] = useState(false);
  const [timeReaming, setTimeRemaming] = useState(targetTime * 1000);
  const timerIsActive = timeReaming > 0 && timeReaming < targetTime * 1000;

  if (timeReaming <= 0) {
    clearInterval(timer.current);
    // setTimeRemaming(timeReaming * 1000);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaming(targetTime * 1000);
  }

  function handleStart() {
    // timer.current = setTimeout(() => {
    //   setTimerExpired(true);
    //   dialog.current.open();
    // }, targetTime * 1000);

    timer.current = setInterval(() => {
      setTimeRemaming((prevTimeReamaining) => prevTimeReamaining - 10);
    }, 10);
  }

  function handleStop() {
    dialog.current.open();
    // clearTimeout(timer.current);
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeReaming}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You Lost!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is runnig..." : "Timmer innactive"}
        </p>
      </section>
    </>
  );
}
