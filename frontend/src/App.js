import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");      // 入力した英文
  const [result, setResult] = useState([]);  // APIの結果

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/check/", { text });
      setResult(res.data.marked);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Web App for Natural English</h1>
      <textarea
        rows="4" 
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your sentence here..."
      />
      <br />
      <button onClick={handleCheck} style={{ marginTop: "10px" }}>
        Check
      </button>

      <div style={{ marginTop: "20px" }}>
        {result.length > 0 ? (
          <ul>
            {result.map((item, idx) => (
              <li key={idx}>
                ⚠️ Unnatural: <strong>{item.bigram}</strong> (freq: {item.frequency})
              </li>
            ))}
          </ul>
        ) : (
          <p>No issues detected yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
