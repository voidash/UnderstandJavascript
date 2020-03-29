//Book class: Represents a Book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//UI Class:TO handle UI class
class UI{
    static displayBooks(){
       
        const books = JSON.parse(Store.getBooks());
        books.forEach((book)=>UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>
        <a href="#" class="btn btn-danger btn-sm delete">X</a>
        </td>`;
        
        list.appendChild(row);
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>document.querySelector('.alert').remove(),3000);


    }

    static deleteBook(el){
       var isbn=el.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerHTML;
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            Store.removeBook(isbn);
        }


    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#ISBN').value='';
    }
}
//Store class:To take care of Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books = localStorage.getItem('books');
            console.log(books);
        }
        return books;
    }
    static addBook(book){
        const books = JSON.parse(Store.getBooks());
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = JSON.parse(Store.getBooks());

        books.forEach((book,index)=>{
            if(book.isbn == isbn){
                books.splice(index);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}



//events: display 
document.addEventListener('DOMContentLoaded',UI.displayBooks);





//event:add


document.querySelector('#book-form').addEventListener('submit',(e)=>{ e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn= document.querySelector('#ISBN').value;
    //validation

    if(title===''||author===''||isbn===''){
        UI.showAlert('Fill all the fields','danger');
    }else{
    //instatiate a book
    const book = new Book(title,author,isbn);
    //add book to store
    Store.addBook(book);
    //adding it to UI
    UI.addBookToList(book);
    //show success message
    UI.showAlert('Book Added successfully','success');
    UI.clearFields();
    }
}
);

//event:remove a book
//event propogation

document.querySelector('#book-list').addEventListener('click',(e)=>{
    console.log(e.target.classList);
    UI.deleteBook(e.target);
    UI.showAlert('Book removed','success');

});



