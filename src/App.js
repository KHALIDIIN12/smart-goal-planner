import React, { useState, useEffect } from "react";
import Goals from "./Goals";

const API = "http://localhost:3005/goals";

function App() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setGoals(data));
  }, []);

  function handleAddGoal(e) {
    e.preventDefault();

    const newGoal = {
      title,
      description,
      completed: false
    };

    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGoal)
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals([...goals, data]);
        setTitle("");
        setDescription("");
      });
  }

  function handleToggleCompleted(goalId, currentCompleted) {
    fetch(`${API}/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: !currentCompleted })
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        const updatedGoals = goals.map((goal) =>
          goal.id === updatedGoal.id ? updatedGoal : goal
        );
        setGoals(updatedGoals);
      });
  }

  return (
    <div>
      <h1>Smart Goal Planner</h1>

      <form onSubmit={handleAddGoal}>
        <input
          type="text"
          placeholder="Goal Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Goal Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Goal</button>
      </form>

      <Goals goals={goals} onToggleCompleted={handleToggleCompleted} />
    </div>
  );
}

export default App;