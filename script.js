const container = document.querySelector(".book-container");
const dialog = document.querySelector("#bookFormDialog");
const form = document.querySelector("#bookForm");


const myLibrary = [];  //book objects are going to be stored in an array

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLib(title, author, pages, read){
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

removeBook = (id) => {
    const index = myLibrary.findIndex(book => book.id === id);
    if(index != -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

toggleBookReadStatus = (id) => {
    const book = myLibrary.find(book => book.id === id);
    if(book) {
        book.toggleRead();
        displayBooks();
    }
}

displayBooks = () => {
    container.innerHTML = ''; //clear previous display

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.dataset.id = book.id; // .dataset → a special object that lets you set or read custom data-* attributes on HTML elements. When you later click “Remove” or “Toggle Read” on that card, you can read the data-id to figure out which Book object in myLibrary this card is linked to.
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author: </strong>${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.read ? '✅ Read' : '❌ Not Read'}</p>
            <button class="toggleBtn">Toggle Read</button>
            <button class="removeBtn">Remove</button>
        `;  
        
        card.querySelector('.removeBtn').addEventListener("click", () => removeBook(book.id));
        card.querySelector('.toggleBtn').addEventListener("click", () => toggleBookReadStatus(book.id));

        container.appendChild(card);
    });
}

newBook.addEventListener("click", (e) => dialog.showModal());
closeFormBtn.addEventListener("click", (e) => dialog.close());

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = parseInt(document.querySelector("#pages").value);
    const read = document.querySelector("#read").checked;

    addBookToLib(title, author, pages, read);
    form.reset(); //reset the form fields after submission  
    dialog.close();
});


addBookToLib('The Hobbit', 'J.R.R. Tolkien', 310, true);
addBookToLib('1984', 'George Orwell', 328, false);







