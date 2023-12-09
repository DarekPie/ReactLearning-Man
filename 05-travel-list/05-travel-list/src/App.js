import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";

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

  function handleClearList() {
    const confirmation = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmation) steItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export function Item({ item, onDeleteItem, onToggleItems }) {
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
  if (!items.length)
    return (
      <p className="stats">
        {" "}
        <em>Start Adding some items to you packing list</em>{" "}
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const procentage = Math.round((numPacked / numItems) * 100);

  console.log(numItems);

  return (
    <footer className="stats">
      <em>
        {procentage === 100
          ? "You got everything! Ready to go ✈"
          : `👜You have ${numItems} items on your list, and you already packed ${numPacked} (${procentage}%)`}
      </em>
    </footer>
  );
}
