import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ThemeContext, themes } from "./themeContext";
import React, { useState } from 'react';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module

function ClickLikes({ note, handleList }: { note: Note, handleList: () => void }) {
    return (
        <div>
            <button onClick={handleList}>{note.isLiked ? "♥" : "♡"}</button>
        </div>
    );
}

export const StickyNotes = () => {
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
        isLiked: false,
    };
    const [createNote, setCreateNote] = useState(initialNote);

    const handleList = (id: number) => {
        setNotes((notes) =>
            notes.map((note) =>
                note.id === id ? { ...note, isLiked: !note.isLiked } : note
            )
        );
    };
    const likedNotes = notes.filter(note => note.isLiked);

    const handleDelete = (id: number) => {
        setNotes(notes.filter(note => note.id != id));
    };

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

                    <div><textarea id="content" placeholder="Note Content" style={{ background: currentTheme.background, color: currentTheme.foreground }} onChange={(event) =>
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

                    <button onClick={toggleTheme} type="button"> Toggle Theme </button>

                    <div id="liked" style={{ background: currentTheme.background, color: currentTheme.foreground }}>
                        <h2>List of Favorites</h2>
                        {likedNotes.map((note) => (
                            <p>{note.title}</p>
                        ))}
                    </div>
                </form>
                <div className="notes-grid" id="notes-grid">
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className="note-item"
                            style={{ background: currentTheme.background, color: currentTheme.foreground }}>
                            <div className="notes-header">
                                <ClickLikes note={note} handleList={() => handleList(note.id)} />
                                <button title={note.id.toString()} onClick={() => handleDelete(note.id)}>x</button>
                            </div>
                            <h2 title={"Title " + note.id.toString()} contentEditable="true"> {note.title} </h2>
                            <p title={"Content " + note.id.toString()} contentEditable="true"> {note.content} </p>
                            <p title={"Label " + note.id.toString()} contentEditable="true"> {note.label} </p>
                        </div>
                    ))}
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

