import { useState } from "react";

const initialItems = [
  { id: 1, desciption: "Passport", quantity: 2, packed: false },
  { id: 2, desciption: "Socks", quantity: 12, packed: true },
  { id: 3, desciption: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎅</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, steItems] = useState([]); // [] bo jest to pusta lista

  function handleAddItems(item) {
    setItems((items) => items.push(item));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; //Gaurd function

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    handleAddItems(newItem);

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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.desciption}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      👜You have X items on your list, and you already packed X(X%)
    </footer>
  );
}
