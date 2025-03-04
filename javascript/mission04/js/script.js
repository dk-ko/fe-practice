const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");
const deleteBtn = document.querySelector(".delete-btn");

function showSuccessMessage() {
  console.log("Success message");
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent = "책이 추가되었습니다";

  const form = document.querySelector("form");
  form.parentNode.insertBefore(successMessage, form);

  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

function showDeleteMessage() {
  console.log("Delete message");
  const deleteMessage = document.createElement("div");
  deleteMessage.className = "delete-message";
  deleteMessage.textContent = "책이 삭제되었습니다";

  const form = document.querySelector("form");
  form.parentNode.insertBefore(deleteMessage, form);

  setTimeout(() => {
    deleteMessage.remove();
  }, 2000);
}

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const bookNameValue = form.querySelector("#book-name").value;
  const bookAuthorValue = form.querySelector("#book-author").value;

  const bookRow = document.createElement("tr");
  bookRow.className = "book-row";

  const bookName = document.createElement("td");
  bookName.textContent = bookNameValue;

  const bookAuthor = document.createElement("td");
  bookAuthor.textContent = bookAuthorValue;

  const deletebtn = document.createElement("td");
  deletebtn.className = "delete-btn";
  deletebtn.textContent = "X";

  bookRow.appendChild(bookName);
  bookRow.appendChild(bookAuthor);
  bookRow.appendChild(deletebtn);
  bookList.appendChild(bookRow);

  showSuccessMessage();
  clarForm();
});

function clarForm() {
  const form = document.querySelector("form");
  form.reset();
}

bookList.addEventListener("click", deleteBook);

function deleteBook(event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentElement.remove();
    showDeleteMessage();
  }
}
