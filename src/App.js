import { useEffect, useState } from "react";

function App() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.log("Fetch error", err));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const newGoal = {
      title,
      category,
      completed: false,
    };

    fetch("http://localhost:3002/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals((prevGoals) => [...prevGoals, data]);
        setTitle("");
        setCategory("");
      });
  }
  function handleMarkAsDone(goalId) {
    fetch(`http://localhost:3002/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === updatedGoal.id ? updatedGoal : goal
          )
        );
      });
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>My Goals</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Goal</button>
      </form>

     
      <ul>
        {goals.length === 0 ? (
          <p>No goals added yet.</p>
        ) : (
          goals.map((goal) => (
            <li key={goal.id} style={{ marginBottom: "10px" }}>
              <strong>{goal.title}</strong> - {goal.category}{" "}
              {goal.completed ? (
                <span style={{ color: "green" }}>✅ Done</span>
              ) : (
                <button onClick={() => handleMarkAsDone(goal.id)}>
                  Mark as Done
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;