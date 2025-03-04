const bookForm = document.querySelector("#book-form");
const bookList = document.querySelector("#book-list");
const deleteBtn = document.querySelector(".delete-btn");
const form = document.querySelector("form");

function showMessage(type, text) {
  const message = document.createElement("div");
  message.className = `${type}-message`;
  message.textContent = text;

  form.parentNode.insertBefore(message, form);

  setTimeout(() => {
    message.remove();
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

  showMessage("success", "책이 추가되었습니다");
  clearForm();
});

function clearForm() {
  const form = document.querySelector("form");
  form.reset();
}

bookList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    event.target.parentElement.remove();
    showMessage("delete", "책이 삭제되었습니다");
  }
});
