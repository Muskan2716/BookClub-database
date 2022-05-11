//User name stored in an array, we can add as many users as we want.
const users = [
    "UserA",
    "UserB",
    "UserC",
    "Muskan"
];

class books
{
    constructor(id,title,author,lender,borrower)
    {
        this.id = id;
        this.title = title;
        this.author = author;
        this.lender = lender;
        this.borrower = borrower;
    }
}

let book1 = new books("1","Book1","Author1","UserC","UserB")
let book2 = new books("2","Book2","Author2","UserC","-")
let book3 = new books("3","Book3","Author3","UserD","UserC")
let book4 = new books("4","Book4","Author4","UserA","-")
let book5 = new books("5","Book5","Author5","UserA","-")
let book6 = new books("6","Book6","Author6","UserB","UserA")

let library = [book1,book2,book3,book4,book5,book6];
let book_count = library.length+1;
let current_user =""

//arrow function to check if any user is logged in or not
const isUserLoggedIn =()=>{
    if(current_user == ""){
        return false;
    }
    else{
        return true;
    }
}

const borrow_book = (i) =>{
    library[i-1].borrower = current_user;
    BooksInfo();
}

function return_book(i){
    library[i-1].borrower = "-";
    BooksInfo();
}

const book_row =(book) =>{
    let action ="-";
    if(current_user == book.borrower && isUserLoggedIn()){
        action = `<button onclick=return_book(${book.id})>Return</button>`;
    }
    else if(current_user == book.lender){
        action = "-";
    }
    else if(book.borrower =="-" && isUserLoggedIn())
    {
        action = `<button onclick="borrow_book(${book.id})">Borrow</button>`;
    }
    return '<tr>'+
    '<td>'+ book.id +'</td>'+'<td>'+ book.title +'</td>'+'<td>'+ book.author +'</td>'+'<td>'+ book.lender +'</td>'+'<td>'+ book.borrower +'</td>'+'<td>'+ action +'</td>'+
    '</tr>';
}

//function to fetch data and to display in the database.
function BooksInfo ()
{
    const booksList = document.getElementById('info-table-body');
    booksList.innerHTML = '';
    library.map((book)=>{
        booksList.innerHTML += book_row(book);
    })

    InputRow();
}

//function to add a new book into the database.
const insert_new_book =() =>{

    const new_book_title = document.getElementById('new-book-title').value;
    const new_book_author = document.getElementById('new-book-author').value;
    const new_book_lender = current_user;
    const new_book_borrower = "-";
    const new_book_id = book_count;

    if(new_book_title.length <=0 || new_book_author <=0)
    {
        alert("Title and Author are required fields!");
    }

    else
    {
        let new_book = new books(new_book_id,new_book_title,new_book_author,new_book_lender,new_book_borrower);
        library.push(new_book);
        book_count++;
        BooksInfo();
    }

}

//Function For displaying logged in username on top of the table.
function changeLoggedInUser()
{
    let logged_in_username = document.getElementById("logged-in-user-name-current");
    let user_name = document.getElementById("logged-user").value;
    current_user = user_name;
    if(users.includes(user_name))
    {
        logged_in_username.innerHTML = "Logged-in user : " + user_name;
        BooksInfo();
    }

    else{
        alert("The entered user name: "+ user_name +" is not found! Please enter a valid user.");
    }
}

//function to populate data into add book row if clicked on it.
const InputRow=() =>{

    const inputRow = document.getElementById('info-table-body-new-book');
    if(isUserLoggedIn())
    {
        inputRow.innerHTML  =   '<tr>'+
                                    '<td id="new-book-id">'+book_count+'</td>'+
                                    '<td>'+'<input id="new-book-title" placeholder="Title">'+'</td>'+
                                    '<td>'+'<input id="new-book-author" placeholder="Author">'+'</td>'+
                                    '<td id="lender">'+current_user+'</td>'+
                                    '<td id="borrower">'+`-`+'</td>'+
                                    '<td id="button-action-new-book">'+'<button onclick="insert_new_book()">Add Book</button>'+'</td>'+
                                '</tr>';
    }
}


