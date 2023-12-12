import "./styles.css";
import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPrecentage1] = useState(0);
  const [percentage2, setPrecentage2] = useState(0);

  // const tip = (bill + (percentage1 + percentage2) / 2) / 100;
  const tip = (bill * (percentage1 + percentage2)) / (2 * 100);

  function handleReset() {
    setBill("");
    setPrecentage1(0);
    setPrecentage1(0);
  }

  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelecProcentage presentage={percentage1} onSelect={setPrecentage1}>
        How do you like the service?
      </SelecProcentage>
      <SelecProcentage presentage={percentage2} onSelect={setPrecentage2}>
        How did your friend like the service?
      </SelecProcentage>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelecProcentage({ children, presentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={presentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Abolutely amazin! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay {bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
