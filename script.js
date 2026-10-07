const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

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
}

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
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