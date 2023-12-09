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

  function handleClearList() {
    steItems([]);
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

function PackingList({ items, onDeleteItem, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed ststus</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
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
