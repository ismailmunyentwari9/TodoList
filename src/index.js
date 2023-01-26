import './style.css';
// grabing up the neede HTML elements to be used in JS codes.....😎😊😉😎............

const btn = document.querySelector('form');
const listInput = document.querySelector('#lists-input');
const cleanAllDone = document.querySelector('#clearDones');
const listHolder = document.querySelector('#list-holder');

// *********Empty array for storing datas ***********
let listArray = [];

// Store the listArray in Local Storage when the form is submitted....😎😊😉😎............

class UI {
  static displayData() {
    const datas = listArray.map((item) => `<div class="col-12" id="list">
                <p class="checkboxP"> 
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck">
                <span id="description">${item.discription}</span>
                </p>
                <span><i class="fa fa-ellipsis-v" aria-hidden="true"></i></span>
            </div>`);
    listHolder.innerHTML = (datas).join(' ');
  }
  // cleaning the input field after submition process....😎😊😉😎............

  static cleanInputs() {
    listInput.value = '';
  }
}

// Define the todoListStore object using a function constructor😎😊😉😎............

function TodoListStore(discription, completed, index) {
  this.discription = discription;
  this.completed = completed;
  this.index = index;
}

btn.addEventListener('submit', (e) => {
  e.preventDefault();
  const index = listArray.length + 1;
  const completed = false;
  if (listInput.value !== '' || null) {
    const todoObject = new TodoListStore(listInput.value, completed, index);
    listArray = [...listArray, todoObject];
    localStorage.setItem('listArray', JSON.stringify(listArray));
    UI.displayData();
    UI.cleanInputs();
  }
});

// Retrieve the listArray from Local Storage when the page is loaded..😎😊😉😎............

if (localStorage.getItem('listArray')) {
  listArray = JSON.parse(localStorage.getItem('listArray'));
  UI.displayData();
}

// funtion for marking done lists😎😊😉😎............

listHolder.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox' && event.target.checked) {
    event.target.nextElementSibling.style.textDecoration = 'line-through';
    event.target.completed = true;
  } else if (event.target.type === 'checkbox' && !event.target.checked) {
    event.target.nextElementSibling.style.textDecoration = 'none';
  }
});

listHolder.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-ellipsis-v')) {
    event.target.classList.remove('fa-ellipsis-v');
    event.target.classList.add('fa-trash');
    event.target.parentElement.parentElement.style.backgroundColor = '#f39c12';
  } else if (event.target.classList.contains('fa-trash')) {
    event.target.parentElement.parentElement.remove();
  }
});

// Function to remove completed items from the listArray and the DOM
function removeCompleted() {
  listArray = listArray.filter((item) => !item.completed);
  localStorage.setItem('listArray', JSON.stringify(listArray));
  UI.displayData();
  // Select all elements with the completed class and remove them from the DOM
  const completedElements = document.querySelectorAll('.completed');
  completedElements.forEach((element) => element.remove());
}

// Add a click event listener to the cleanAllDone element
cleanAllDone.addEventListener('click', removeCompleted);
