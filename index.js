let libraryModule = {
   myLibrary: [
      {title: "Mankind's Search For God", author: "Anonymous", pages: "384", hasRead: false},
      {title: "Atomic Habits", author: "James Clear", pages: "320", hasRead: true},
      {title: "The Intelligent Investor", author: "Benjamin Graham", pages: "623", hasRead: false},
      {title: "Getting Things Done", author: "David Allen", pages: "352", hasRead: true},
      {title: "Thinking, Fast and Slow", author: "Daniel Kahneman", pages: "499", hasRead: false},
   ],

   init: function() {
      this.cacheDom();
      this.bindEvents();
      this.render();
   },

   cacheDom: function() {
      this.body = document.querySelector("body");
      this.output = this.body.querySelector(".library.output");
      this.addBookIcon = this.body.querySelector(".add-book img");
      this.dialog = this.body.querySelector("dialog");
      this.form = this.body.querySelector("form");
      this.input = this.body.querySelector("input");
      this.title = this.body.querySelector("input[id='title']");
      this.author = this.body.querySelector("input[id='author']");
      this.pages = this.body.querySelector("input[id='pages']");
      this.hasRead = this.body.querySelector("input[id='read--form']");
      this.addBtn = this.body.querySelector("button[value='add']");
      this.cancelBtn = this.body.querySelector("button[value='cancel']");
   },

   bindEvents: function() {
      this.output.addEventListener("click", this.removeBook.bind(this));
      this.addBookIcon.addEventListener("click", this.showModal.bind(this));
      this.addBtn.addEventListener("click", this.closeModal.bind(this));      // this calls the addBook method
      this.cancelBtn.addEventListener("click", this.slideUpModalWithAnimation.bind(this));
   },

   render: function() {
      this.output.innerHTML = "";

      this.myLibrary.forEach((book, index) => {
            let div = document.createElement("div");
            div.setAttribute("class", "library__book");
            div.setAttribute("data-index", `${index}`);
               let div1 = document.createElement("div");
               div1.setAttribute("class", "remove-icon");
                  let img = document.createElement("img");
                  img.setAttribute("src", "./assets/imgs/remove.svg");
                  img.setAttribute("alt", "remove icon");
                  img.setAttribute("class", "remove-icon");
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
                     checkbox.setAttribute("class", "book-card-input");
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

         this.output.appendChild(div);
      });
   },

   Book: function(title, author, pages, hasRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.hasRead = hasRead;
   },

   addBook: function() {
      let newBook = new this.Book(this.title.value, this.author.value, this.pages.value, this.hasRead.checked);
      this.myLibrary.push(newBook);
      this.render();
   },

      // Show Dialog and Blur Body
   showModal: function() {
      if (this.dialog.classList.contains("closing")) {
         this.dialog.classList.remove("closing");
      }
      this.dialog.showModal();

      this.input.focus();
      
      this.body.classList.add("blurred");
         // overemphasizing that the dialog should not be blurred
      this.dialog.style.filter = "none";
   },

      // Close Dialog, Reset Dialog and Unblur Body
   closeModal: function(event) {
      event.preventDefault();

      if (!this.form.checkValidity()) {
         this.form.reportValidity();
      } else {
         this.addBook();
         this.dialog.close();
         this.body.classList.remove("blurred");
         this.form.reset();
      }
   },

   slideUpModalWithAnimation: function() {
      this.dialog.classList.add("closing");
      this.dialog.addEventListener("animationend", () => {
         if (this.dialog.classList.contains("closing")) {
            this.dialog.close();
            }
         }, {once: true});
   
      this.body.classList.remove("blurred");
      this.form.reset();
   },

      // remove book and toggle read status in myLibrary array
   removeBook: function(event) { 
      let bookIndex = event.target.closest(".library__book").getAttribute("data-index");

      if (event.target.classList.contains("remove-icon")) {
            //  remove book from page
         this.output.removeChild(event.target.closest(".library__book"));

            // remove book from the library array
         this.myLibrary.splice(bookIndex, 1);
         this.render();

      } else if (event.target.classList.contains("book-card-input")) {
         if (this.myLibrary[bookIndex].hasRead === true) {
            this.myLibrary[bookIndex].hasRead = false;
         } else {
            this.myLibrary[bookIndex].hasRead = true;
         }
      } 
   },
};

libraryModule.init();