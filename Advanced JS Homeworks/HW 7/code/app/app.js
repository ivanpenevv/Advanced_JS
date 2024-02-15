let Library = {
    name: '',
    books: [],
    address: '',
    numberOfMembers: 0,
    printBooks() {
      console.log('Books in ' + this.name + ':');
      this.books.forEach(book => {
        console.log(book.title + ' (' + book.genre + ')');
      });
    },
    addBook(book) {
      let newBook = Object.create(book);
      this.books.push(newBook);
    },
    addLibrary(library) {
      this.libraries.push(library);
    },
    removeLibrary(library) {
      let index = this.libraries.indexOf(library);
      if (index > -1) {
        this.libraries.splice(index, 1);
      }
    }
  };
  
  let Book = {
    title: '',
    genre: '',
    libraries: [],
    authors: [],
    addLibrary(library) {
      this.libraries.push(library);
      library.addBook(this);
    },
    removeLibrary(library) {
      let index = this.libraries.indexOf(library);
      if (index > -1) {
        this.libraries.splice(index, 1);
        library.removeBook(this);
      }
    }
  };
  
  let Author = {
    firstName: '',
    lastName: '',
    yearOfBirth: 0,
    books: [],
    currentBook: null,
    startBook(book) {
      if (this.currentBook) {
        this.books.push(this.currentBook);
      }
      this.currentBook = book;
    }
  };

  function createLibrary(name, address) {
    let library = Object.create(Library);
    library.name = name;
    library.address = address;
    library.numberOfMembers = library.books.length * 15;
    return library;
  }
  
  function createBook(title, genre) {
    let book = Object.create(Book);
    book.title = title;
    book.genre = genre;
    return book;
  }
  
  function createAuthor(firstName, lastName, yearOfBirth) {
    let author = Object.create(Author);
    author.firstName = firstName;
    author.lastName = lastName;
    author.yearOfBirth = yearOfBirth;
    return author;
  }


let library1 = createLibrary('Library 1', 'Strumica');
let library2 = createLibrary('Library 2', 'Skopje');

let book1 = createBook('Book 1', 'Fiction');
let book2 = createBook('Book 2', 'Novel');

let author1 = createAuthor('Ivan', 'Penev', 1980);
let author2 = createAuthor('Ivana', 'Peneva', 1985);

library1.addBook(book1);
library2.addBook(book2);

book1.addLibrary(library1);
book2.addLibrary(library2);

author1.startBook(book1);
author2.startBook(book2);

library1.printBooks();
library2.printBooks();