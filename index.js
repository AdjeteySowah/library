
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

   // Close Dialog, Reset Dialog and Unblur Body
let form = document.querySelector("form");
let addBtn = document.querySelector("button[value='add']");
addBtn.addEventListener("click", (event) => {
   event.preventDefault();

   if (!form.checkValidity()) {
      form.reportValidity();
   } else {
      addBookToLibrary();
      dialog.close();
      body.classList.remove("blurred");
      form.reset();
   }
});

let cancelBtn = document.querySelector("button[value='cancel']");
cancelBtn.addEventListener("click", () => {
   dialog.close();
   body.classList.remove("blurred");
   form.reset();
});


   // Create Book Objects and Store in Array
let myLibrary = [
                  {title: "Mankind's Search For God", author: "Anonymous", pages: "384", hasRead: false},
                  {title: "Atomic Habits", author: "James Clear", pages: "320", hasRead: true},
                  {title: "The Intelligent Investor", author: "Benjamin Graham", pages: "623", hasRead: false},
                  {title: "Getting Things Done", author: "David Allen", pages: "352", hasRead: true},
                  {title: "Thinking, Fast and Slow", author: "Daniel Kahneman", pages: "499", hasRead: false},
                ];
   
      // Loop Through the Already Existing Library(Array) and Display Each book as a Card
let output = document.querySelector(".library.output");
myLibrary.forEach((book, index) => {
      let div = document.createElement("div");
      div.setAttribute("class", "library__book");
      div.setAttribute("data-index", `${index}`);
         let div1 = document.createElement("div");
         div1.setAttribute("class", "remove-icon");
            let img = document.createElement("img");
            img.setAttribute("src", "./assets/imgs/remove.svg");
            img.setAttribute("alt", "remove icon");
         div1.appendChild(img);

         let div2 = document.createElement("div");
            let heading = document.createElement("h2");
            heading.setAttribute("class", "book-title");
            heading.textContent = book.title;

            let paragraph1 = document.createElement("p");
            paragraph1.setAttribute("class", "book-author");
            paragraph1.textContent = book.author;

            let paragraph2 = document.createElement("p");
            paragraph2.setAttribute("class", "book-pages");
            paragraph2.textContent = `Total Pages: ${book.pages}`;

            let paragraph3 = document.createElement("p");
            paragraph3.setAttribute("class", "book-read-status");
               let checkbox = document.createElement("input");
               checkbox.setAttribute("type", "checkbox");
               checkbox.setAttribute("id", `read-${index}`);
               checkbox.setAttribute("name", "read");
               if (book.hasRead === true) {
                  checkbox.setAttribute("checked", "");
               }
               let label = document.createElement("label");
               label.setAttribute("for", `read-${index}`);
               label.textContent = "Read";
            paragraph3.appendChild(checkbox);
            paragraph3.appendChild(label);
         div2.appendChild(heading);
         div2.appendChild(paragraph1);
         div2.appendChild(paragraph2);
         div2.appendChild(paragraph3);
      div.appendChild(div1);
      div.appendChild(div2);
   output.appendChild(div);
});


function Book(title, author, pages, hasRead) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.hasRead = hasRead;
}

let title = document.querySelector("input[id='title']");
let author = document.querySelector("input[id='author']");
let pages = document.querySelector("input[id='pages']");
let hasRead = document.querySelector("input[id='read--form']");

function addBookToLibrary() {
   let book = new Book(title.value, author.value, pages.value, hasRead.checked);
   myLibrary.push(book);

      // Display a Newly Added Book as a Card
   let index = myLibrary.length - 1;

      let div = document.createElement("div");
      div.setAttribute("class", "library__book");
      div.setAttribute("data-index", `${index}`);
         let div1 = document.createElement("div");
         div1.setAttribute("class", "remove-icon");
            let img = document.createElement("img");
            img.setAttribute("src", "./assets/imgs/remove.svg");
            img.setAttribute("alt", "remove icon");
         div1.appendChild(img);

         let div2 = document.createElement("div");
            let heading = document.createElement("h2");
            heading.setAttribute("class", "book-title");
            heading.textContent = book.title;

            let paragraph1 = document.createElement("p");
            paragraph1.setAttribute("class", "book-author");
            paragraph1.textContent = book.author;

            let paragraph2 = document.createElement("p");
            paragraph2.setAttribute("class", "book-pages");
            paragraph2.textContent = `Total Pages: ${book.pages}`;

            let paragraph3 = document.createElement("p");
            paragraph3.setAttribute("class", "book-read-status");
               let checkbox = document.createElement("input");
               checkbox.setAttribute("type", "checkbox");
               checkbox.setAttribute("id", `read-${index}`);
               checkbox.setAttribute("name", "read");
               if (book.hasRead === true) {
                  checkbox.setAttribute("checked", "");
               }
               let label = document.createElement("label");
               label.setAttribute("for", `read-${index}`);
               label.textContent = "Read";
            paragraph3.appendChild(checkbox);
            paragraph3.appendChild(label);
         div2.appendChild(heading);
         div2.appendChild(paragraph1);
         div2.appendChild(paragraph2);
         div2.appendChild(paragraph3);
      div.appendChild(div1);
      div.appendChild(div2);
   output.appendChild(div);

      // Add an Event Listener to Every Single book Added
   let removeBtn = div.querySelector(".remove-icon");
   removeBtn.addEventListener("click", (event) => {
         // remove book from page
      output.removeChild(event.target.closest(".library__book"));

         // remove book from the library array
      let bookIndex = event.target.closest(".library__book").getAttribute("data-index");
      myLibrary.splice(bookIndex, 1);

         // Assign unique IDs and for attribute values related to the checkboxes
      document.querySelectorAll(".book-read-status").forEach((container, index) => {
         let checkbox = container.querySelector("input[type='checkbox']");
         let label = container.querySelector("label");
      
         let uniqueID = `read-${index}`;
         checkbox.id = uniqueID;
         label.setAttribute("for", uniqueID);
      });

         // Reset data-index Attribute For Each Book
      document.querySelectorAll(".library__book").forEach((container, index) => {
         container.setAttribute("data-index", index);
      });
   });
}


   // Remove a Book From the Library
let removeBtns = document.querySelectorAll(".remove-icon");
removeBtns.forEach((btn) => {
   btn.addEventListener("click", (event) => {
         // remove book from page
      output.removeChild(event.target.closest(".library__book"));

         // remove book from the library array
      let bookIndex = event.target.closest(".library__book").getAttribute("data-index");
      myLibrary.splice(bookIndex, 1);

         // Assign unique IDs and for attribute values related to the checkboxes
      document.querySelectorAll(".book-read-status").forEach((container, index) => {
         let checkbox = container.querySelector("input[type='checkbox']");
         let label = container.querySelector("label");
      
         let uniqueID = `read-${index}`;
         checkbox.id = uniqueID;
         label.setAttribute("for", uniqueID);
      });

         // Reset data-index Attribute For Each Book
      document.querySelectorAll(".library__book").forEach((container, index) => {
         container.setAttribute("data-index", index);
      });
   });
});