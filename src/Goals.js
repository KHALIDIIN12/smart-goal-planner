import React, { useState } from "react";

function Goals({ goals, onToggleCompleted, onDeleteGoal, onEditGoal }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function startEditing(goal) {
    setEditingId(goal.id);
    setEditTitle(goal.title);
    setEditDescription(goal.description);
  }

  function saveEdit(goal) {
    onEditGoal({ ...goal, title: editTitle, description: editDescription });
    setEditingId(null);
  }

  return (
    <div>
      <h2>Goal List</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}>
            {editingId === goal.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={() => saveEdit(goal)}>Save</button>
              </>
            ) : (
              <>
                <strong>{goal.title}</strong>: {goal.description} —{" "}
                {goal.completed ? "Done" : "Not Done"} <br />
                <em>Deadline: {goal.deadline}</em> |{" "}
                <em>Category: {goal.category}</em>
                <br />
                <button
                  onClick={() =>
                    onToggleCompleted(goal.id, goal.completed)
                  }
                >
                  Mark as {goal.completed ? "Not Done" : "Done"}
                </button>
                <button onClick={() => startEditing(goal)}>Edit</button>
                <button onClick={() => onDeleteGoal(goal.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;