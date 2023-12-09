import { useState } from "react";

// const initialItems = [
//   { id: 1, desciption: "Passport", quantity: 2, packed: false },
//   { id: 2, desciption: "Socks", quantity: 12, packed: true },
//   { id: 3, desciption: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, steItems] = useState([]); // [] bo jest to pusta lista

  function handleAddItems(item) {
    // setItems((items) => items.push(item));
    steItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    steItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    steItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🎅</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      {/* // Jesli  zapomnimy o arrow function - react od razu wywola funkcje bez danych */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  console.log(numItems);

  return (
    <footer className="stats">
      👜You have {numItems} items on your list, and you already packed X(X%)
    </footer>
  );
}
