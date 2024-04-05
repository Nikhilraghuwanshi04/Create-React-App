import React, { useState, useEffect } from "react";
import styles from "./Display.module.css";

export default function Displaynotes() {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState("");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notesu");
    if (savedNotes) {
      setData(JSON.parse(savedNotes));
    }
  }, []); 

  function handlechange(e) {
    let id = e.target.id;
    if (id === "name") {
      setNotes(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (notes.trim() !== "") {
      const newData = [...data, notes];
      setData(newData);
      localStorage.setItem("notes", JSON.stringify(newData));
      setNotes("");
    }
  }

  function handleClear() {
    setData([]);
    localStorage.removeItem("notes");
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([data.join("\n")], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "notes.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  }

  return (
    <div>
      <div className={styles.border}>
        <div className={styles.list}>
          <h1>Your Notes List:</h1>
          <ul>
            {data.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
          <button onClick={handleClear}>
            Clear 
          </button>
          <button onClick={handleDownload}>
            Download 
          </button>
        </div>

        <div className={styles.notes}>
          <h1>Write Your Notes here:</h1>
          <textarea
            name=""
            id="name"
            cols="85"
            rows="30"
            className={styles.notes1}
            value={notes}
            onChange={handlechange}
            style={{
              fontWeight: bold ? "bold" : "normal",
              fontStyle: italic ? "italic" : "normal",
              textDecoration: underline ? "underline" : "none"
            }}
          ></textarea>
          <div className={styles.btn}>
            <button type="button" onClick={() => setBold(!bold)}>
              Bold
            </button>
            <button type="button" onClick={() => setItalic(!italic)}>
              Italic
            </button>
            <button type="button" onClick={() => setUnderline(!underline)}>
              Underline
            </button>
            <button type="submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
