import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
});

describe("Update StickyNote", () => {
    test("update one note", () => {
        render(<StickyNotes />);
        const noteTitle = screen.getByTitle("Title 1");
        noteTitle.textContent = 'New Title';
        const newNoteTitle = screen.getByText("New Title");
        expect(newNoteTitle).toBeInTheDocument();

        const noteContent = screen.getByTitle("Content 1");
        noteContent.textContent = 'New Content';
        const newNoteContent = screen.getByText("New Content");
        expect(newNoteContent).toBeInTheDocument();
    })
});

describe("Delete StickyNote", () => {
    test("delete one note", () => {
        render(<StickyNotes />);
        const deleteButton = screen.getByTitle("1");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
    })
});