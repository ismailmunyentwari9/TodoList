import './style.css';

const btn = document.querySelector('form');
const listInput = document.querySelector('#lists-input');
const listHolder = document.querySelector('#list-holder');

// *********event lister ***********
let listArray = [];
// Store the listArray in Local Storage when the form is submitted
class UI {
  static displayData() {
    const datas = listArray.map((item) => `<div class="col-12" id="list">
                <p> <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"><span>${item.discription}</span></p>
                <span><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
            </div>`);
    listHolder.innerHTML = (datas).join(' ');
  }

  static cleanInputs() {
    listInput.value = '';
  }
}

// Define the todoListStore object using a function constructor
function TodoListStore(discription, completed, index) {
  this.discription = discription;
  this.completed = completed;
  this.index = index;
}

btn.addEventListener('submit', (e) => {
  e.preventDefault();
  const index = listArray.length + 1;
  const completed = true;
  if (listInput.value !== '' || null) {
    const todoObject = new TodoListStore(listInput.value, completed, index);
    listArray = [...listArray, todoObject];
    localStorage.setItem('listArray', JSON.stringify(listArray));
    UI.displayData();
    UI.cleanInputs();
  }
});

// Retrieve the listArray from Local Storage when the page is loaded
if (localStorage.getItem('listArray')) {
  listArray = JSON.parse(localStorage.getItem('listArray'));
  UI.displayData();
}
