import React, { useState, useEffect } from "react";
import Goals from "./Goals";

const API = "http://localhost:3005/goals";

function App() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(""); // new state
  const [category, setCategory] = useState("Personal"); // new state

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
      deadline,
      category,
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
        setDeadline("");
        setCategory("Personal");
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

  function handleDeleteGoal(goalId) {
    fetch(`${API}/${goalId}`, { method: "DELETE" })
      .then(() => {
        setGoals(goals.filter((goal) => goal.id !== goalId));
      });
  }

  function handleEditGoal(updatedGoal) {
    fetch(`${API}/${updatedGoal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal)
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals(goals.map((goal) => (goal.id === data.id ? data : goal)));
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
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
          <option value="Education">Education</option>
        </select>
        <button type="submit">Add Goal</button>
      </form>

      <Goals
        goals={goals}
        onToggleCompleted={handleToggleCompleted}
        onDeleteGoal={handleDeleteGoal}
        onEditGoal={handleEditGoal}
      />
    </div>
  );
}

export default App;