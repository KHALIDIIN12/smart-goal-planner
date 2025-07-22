import React from "react";

function Goals({ goals, onToggleCompleted }) {
  return (
    <div>
      <h2>Goal List</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            <strong>{goal.title}</strong>: {goal.description} — 
            {goal.completed ? "Done" : "Not Done"} 
            <button onClick={() => onToggleCompleted(goal.id, goal.completed)}>
              Mark as {goal.completed ? "Not Done" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;