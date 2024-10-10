import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext, themes } from "./themeContext";
import React, { useContext, useEffect, useState } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module


function ClickLikes(props: Note) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    document.getElementById(props.id.toString())!.style.display = isLiked ? "" : "none";
  }, [isLiked]);

  return (
    <div>
      <button onClick={handleClick}>{isLiked ? "♥" : "♡"}</button>
    </div>
  );
}

function App() {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.personal,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
    (document.getElementById("form") as HTMLFormElement).reset();
  };



  return (
    <ThemeContext.Provider value={currentTheme}>
      <div className='app-container' style={{ background: currentTheme.background, color: currentTheme.foreground }}>
        <form className="note-form" onSubmit={createNoteHandler} id="form">
          <div><input id="title" placeholder="Note Title" style={{ background: currentTheme.background, color: currentTheme.foreground }} onChange={(event) =>
            setCreateNote({ ...createNote, title: event.target.value })} required></input></div>

          <div><textarea id="content" style={{ background: currentTheme.background, color: currentTheme.foreground }} onChange={(event) =>
            setCreateNote({ ...createNote, content: event.target.value })}
            required></textarea></div>

          <div><select id="label"
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
          </div>

          <div><button type="submit">Create Note</button></div>

          {/* <div>{ToggleTheme()}</div> */}

          <button onClick={toggleTheme} type="button"> Toggle Theme </button>

          <div id="liked" style={{ background: currentTheme.background, color: currentTheme.foreground }}>
            <h2>List of Favorites</h2>
            <p id="1">n1</p>
            <p id="2">n2</p>
            <p id="3">n3</p>
            <p id="4">n4</p>
            <p id="5">n5</p>
            <p id="6">n6</p>
            <p id="7">n7</p>
            <p id="8">n8</p>
            <p id="9">n9</p>
            <p id="10">n10</p>
            <p id="11">n11</p>
            <p id="12">n12</p>
            <p id="13">n13</p>
            <p id="14">n14</p>
            <p id="15">n15</p>
            <p id="16">n16</p>
            <p id="17">n17</p>
            <p id="18">n18</p>
            <p id="19">n19</p>
            <p id="20">n20</p>
          </div>
        </form>
        <div className="notes-grid" id="notes-grid">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-item"
              style={{ background: currentTheme.background, color: currentTheme.foreground }}>
              <div className="notes-header">
                {/* {ClickLikes(note.id)} */}<ClickLikes title={note.title} content={note.content} label={note.label} id={note.id} />
                <button>x</button>
              </div>
              <h2> {note.title} </h2>
              <p> {note.content} </p>
              <p> {note.label} </p>
            </div>
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;