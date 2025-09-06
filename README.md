import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

// --- Components ---
function Layout({ children }) {
  return (
    <div className="p-4 font-sans">
      <nav className="mb-4 space-x-4">
        <Link to="/admin" className="text-blue-600">Admin</Link>
        <Link to="/candidate" className="text-blue-600">Candidate</Link>
      </nav>
      {children}
    </div>
  );
}

function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Login</h2>
      <input
        className="border p-2 rounded"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-500 text-white p-2 rounded"
        onClick={() => onSuccess()}
      >
        Login
      </button>
    </div>
  );
}

function Admin() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;
  return <h1 className="text-2xl font-bold">Admin Dashboard</h1>;
}

function SpeechCapture({ onResult }) {
  const [supported, setSupported] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setSupported(true);
    }
  }, []);

  if (!supported) {
    return (
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Type your answer here..."
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          onResult(e.target.value);
        }}
      />
    );
  }

  return (
    <button className="p-2 bg-blue-500 text-white rounded">
      🎤 Start Speaking
    </button>
  );
}

function Candidate() {
  const [answer, setAnswer] = useState("");
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Candidate Portal</h2>
      <SpeechCapture onResult={(text) => setAnswer(text)} />
      <p className="mt-4">Your Answer: {answer}</p>
    </div>
  );
}

// --- App ---
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="*" element={<Navigate to="/candidate" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}