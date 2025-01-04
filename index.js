let totalPages = "Total Pages: ";
let num;

let myLibrary = [{title: "Thinking, Fast and Slow", author: "Daniel Kahneman", pages: `${totalPages} ${num}`, hasRead: "Read"}];

function Book(title, author, pages, hasRead) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.hasRead = hasRead;
}

function addBookToLibrary() {
   // take some arguments 
      // I think it'll take arguments/data from the dialog the user interacts with
      // title, author, pages, read?
   // create a book from those arguments
   // store the new book object into myLibrary array
}


   // Assign unique IDs and for attribute values related to the checkboxes
   // The elements with .book-read-status are containers for the checkbox and its label 
document.querySelectorAll(".book-read-status").forEach((container, index) => {
   let checkbox = container.querySelector("input[type='checkbox']");
   let label = container.querySelector("label");

   let uniqueID = `read-${index + 1}`;
   checkbox.id = uniqueID;
   label.setAttribute("for", uniqueID);
});


   // Show Dialog and Blur Body
let body = document.querySelector("body");
let dialog = document.querySelector("dialog");
let addBookIcon = document.querySelector(".add-book img");
addBookIcon.addEventListener("click", () => {
   dialog.showModal();
   body.classList.add("blurred");
      // overemphasizing that the dialog should not be blurred
   dialog.style.filter = "none";
});

   // Close Dialog and Unblur Body
let cancelBtn = document.querySelector(".cancel");
cancelBtn.addEventListener("click", () => {
   dialog.close();
   body.classList.remove("blurred");
});