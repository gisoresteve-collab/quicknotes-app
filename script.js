const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

let notes = [];

function render() {
  notesList.textContent = "";

  notes.forEach((note) => {
    const listItem = document.createElement("li");
    listItem.classList.add("note-card");

    const categoryClass = `category-${note.category.toLowerCase()}`;
    listItem.classList.add(categoryClass);

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("p");
    categoryLabel.classList.add("note-category");
    categoryLabel.textContent = note.category;

    const dateLabel = document.createElement("p");
    dateLabel.classList.add("note-date");
    dateLabel.textContent = new Date(note.createdAt).toLocaleString();

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = note.id;

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(dateLabel);
    listItem.appendChild(deleteButton);

    notesList.appendChild(listItem);
  });

  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toISOString()
  };

  notes.push(note);
  render();

  noteInput.value = "";
  noteInput.focus();
});

notesList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const noteId = Number(event.target.dataset.id);

    notes = notes.filter((note) => note.id !== noteId);
    render();
  }
});

render();