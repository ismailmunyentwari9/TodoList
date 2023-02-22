const todolist = () => {
// grabing up the neede HTML elements to be used in JS codes.....😎😊😉😎............

  const btn = document.querySelector('form');
  const listInput = document.querySelector('#lists-input');
  const cleanAllDone = document.querySelector('#clearDones');
  const listHolder = document.querySelector('#list-holder');

  // ****Empty array for storing datas ****
  let listArray = [];

  // Store the listArray in Local Storage when the form is submitted....😎😊😉😎............
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
      // eslint-disable-next-line no-use-before-define
      UI.displayData();
      // eslint-disable-next-line no-use-before-define
      UI.cleanInputs();
    }
  });

  class UI {
    static displayData() {
      const datas = listArray.map((item) => `<div class="col-12" id="list" data-index=${item.index}>
                <p class="checkboxP"> 
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck">
                <span contenteditable="false" index='${item.index}' id="discription">${item.discription}</span>
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

  // Retrieve the listArray from Local Storage when the page is loaded..😎😊😉😎............

  // funtion for marking done lists😎😊😉😎............

  listHolder.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox' && event.target.checked) {
      event.target.nextElementSibling.style.textDecoration = 'line-through';
      event.target.completed = true;
    } else if (event.target.type === 'checkbox' && !event.target.checked) {
      event.target.nextElementSibling.style.textDecoration = 'none';
    }
  });

  if (localStorage.getItem('listArray')) {
    listArray = JSON.parse(localStorage.getItem('listArray'));
    UI.displayData();
  }

  listHolder.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-ellipsis-v')) {
      event.target.classList.remove('fa-ellipsis-v');
      event.target.classList.add('fa-trash');
      event.target.parentElement.parentElement.style.backgroundColor = '#f39c12';
      const targeted = event.target.parentNode.previousElementSibling.lastElementChild;
      targeted.contentEditable = 'true';
    } else if (event.target.classList.contains('fa-trash')) {
    // Get the index of the element to be deleted
      const trash = event.target;
      const taskElm = trash.parentNode.parentNode;
      const listindex = Array.prototype.indexOf.call(listHolder.children, taskElm);

      // Remove the element from the listArray
      listArray.splice(listindex, 1);

      // Update the local storage with the updated listArray
      localStorage.setItem('listArray', JSON.stringify(listArray));

      // Remove the element from the DOM
      event.target.parentElement.parentElement.remove();
    }
  });

  listHolder.addEventListener('input', (e) => {
    if (e.target.closest('#discription')) {
      const inputText = e.target.closest('#discription');
      const taskElm = inputText.parentNode.parentNode;
      const index = Array.prototype.indexOf.call(listHolder.children, taskElm);
      listArray[index].discription = e.target.textContent;

      localStorage.setItem('listArray', JSON.stringify(listArray));
    }
  });

  window.addEventListener('load', () => {
    if (localStorage.getItem('listArray')) {
      listArray = JSON.parse(localStorage.getItem('listArray'));
      UI.displayData();
    }
  });

  if (localStorage.getItem('listArray')) {
    listArray = JSON.parse(localStorage.getItem('listArray'));
    UI.displayData();
  }

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

  if (localStorage.getItem('listArray')) {
    listArray = JSON.parse(localStorage.getItem('listArray'));
    UI.displayData();
  }
};

export default todolist;