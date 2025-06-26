import React from "react";

export default function ResultModal({ref, result, targetTime }) {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>Your {result}: </h2>
      <p>
        Target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopeed the timer with <strong> X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}
