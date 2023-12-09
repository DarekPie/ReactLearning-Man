import { useState } from "react";

export function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; //Gaurd function

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    // Set initnial state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          // WAZNE!!! e.target - jest jak by stringiem ktory dostaje dokładnie to co wpisujemy w okienko wyrzuca to do zmiennej "value"
          console.log(e.target); // Widac to tutaj mamy, typ inputu, co to jest czyli placeholder i faktyczna wartosc czyli value
          setDescription(e.target.value); // Wrzucamy wiec zmienna tam gdzie chcemy!
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}
