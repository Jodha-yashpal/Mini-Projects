const inputBox = document.querySelector('#input-box');
const listContainer = document.querySelector('.list-container');
const submit = document.querySelector('button');

submit.addEventListener('click', addTask);

function addTask(){
    if(inputBox.value === ""){
        alert("you must write something!!!");
    }
    else{
        let li = document.createElement('li');
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.textContent = "\u00d7"
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    inputBox.focus();
}

listContainer.addEventListener('click',(e)=>{
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
    }
})

// save data in browser
function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
}

// to show data when page is refreshed
function showTask(){
    listContainer.innerHTML = localStorage.getItem('data');
}

//call this function
showTask();