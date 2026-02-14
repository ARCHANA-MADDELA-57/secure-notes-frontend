import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/notes`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addOrUpdateNote = async () => {
    if (!title) return;

    if (editId) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/${editId}`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/notes`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setTitle("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/notes/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchNotes();
  };

  const startEdit = (note) => {
    setTitle(note.title);
    setEditId(note.id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={header}>
          <h2>My Notes</h2>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </div>

        <div style={inputSection}>
          <input
            style={input}
            value={title}
            placeholder="Write a note..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <button style={primaryBtn} onClick={addOrUpdateNote}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <div>
          {notes.length === 0 && (
            <p style={{ textAlign: "center", color: "#888" }}>
              No notes yet
            </p>
          )}

          {notes.map((note) => (
            <div key={note.id} style={noteCard}>
              <span>{note.title}</span>

              <div>
                <button
                  style={editBtn}
                  onClick={() => startEdit(note)}
                >
                  Edit
                </button>

                <button
                  style={deleteBtn}
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const container = {
  minHeight: "100vh",
  background: "#f3f4f6",
  display: "flex",
  justifyContent: "center",
  paddingTop: "50px"
};

const card = {
  background: "white",
  width: "500px",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
};

const inputSection = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px"
};

const input = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const primaryBtn = {
  padding: "10px 15px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const noteCard = {
  background: "#f9fafb",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const editBtn = {
  marginRight: "8px",
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

const logoutBtn = {
  background: "#111827",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};
