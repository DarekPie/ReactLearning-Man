import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="glider.jpg" alt="Dariusz Piechota" />;
}

function Intro() {
  return (
    <div>
      <h1>Dariusz Piechota</h1>
      <p>Some about me!</p>
    </div>
  );
}

function SkillList() {
  return (
    <div>
      <Skill />
    </div>
  );
}

function Skill(props) {
  return <div className="skill">react 👌</div>;
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
