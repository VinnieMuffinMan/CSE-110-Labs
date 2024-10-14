import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { ToDoList } from "./toDoList";

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

describe("Delete StickyNote", () => {
    test("delete one note", () => {
        render(<StickyNotes />);
        const deleteButton = screen.getByTitle("1");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
    })
    test("delete all notes", () => {
        render(<StickyNotes />);
        let deleteButton = screen.getByTitle("1");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
        deleteButton = screen.getByTitle("2");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
        deleteButton = screen.getByTitle("3");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
        deleteButton = screen.getByTitle("4");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
        deleteButton = screen.getByTitle("5");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
        deleteButton = screen.getByTitle("6");
        fireEvent.click(deleteButton);
        expect(deleteButton).not.toBeInTheDocument();
    })
})

test("all items displayed", () => {
    render(<ToDoList />);
    const apple = screen.getByText("Apples");
    const banana = screen.getByText("Bananas");

    expect(apple).toBeInTheDocument();
    expect(banana).toBeInTheDocument();
})

test("checkbox increment/decrement counter", () => {
    render(<ToDoList />);
    const appleCheck = screen.getByTitle("ApplesCheck");
    const bananaCheck = screen.getByTitle('BananasCheck');
    const counter = screen.getByText("Items bought: 0");

    fireEvent.click(appleCheck);
    expect(counter).toHaveTextContent("Items bought: 1");
    fireEvent.click(bananaCheck);

    fireEvent.click(appleCheck);
    expect(counter).toHaveTextContent("Items bought: 1");
    fireEvent.click(bananaCheck);
    expect(counter).toHaveTextContent("Items bought: 0");
})