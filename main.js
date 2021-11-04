 
let add = document.querySelectorAll('.add')
let saveButtons = document.querySelectorAll('.save')
 let saveBacklog = document.querySelector('.backlog-s ')
let saveProgress = document.querySelector('.progress-s ')
let saveComplete = document.querySelector('.complete-s ')
let saveOnhold = document.querySelector('.on-hold-s')

let backlog = document.querySelector('.backlog')
let progress = document.querySelector('.progress')
let complete = document.querySelector('.complete')
let onHold = document.querySelector('.onhold ') 

let firstCard = document.querySelector('.first')
let secondCard = document.querySelector('.second')
let thirdCard = document.querySelector('.third')
let fourthCard = document.querySelector('.fourth')

let backlogArray = []
let progressArray = []
let completeArray = []
let onholdArray = []

let taskIdCounter = 1

add.forEach((addTask)=>{
  addTask.addEventListener('click', ()=>{
      addTask.nextElementSibling.classList.add('show')
  })
}) 




if(localStorage.getItem('backlogs')) {
   backlogArray = JSON.parse(localStorage.getItem('backlogs'))
  
}
if(localStorage.getItem('progress')) {
  progressArray = JSON.parse(localStorage.getItem('progress'))
  
}
if(localStorage.getItem('complete')) {
  completeArray = JSON.parse(localStorage.getItem('complete'))
  
 }
 if(localStorage.getItem('onhold')) {
    onholdArray = JSON.parse(localStorage.getItem('onhold'))
   
 }
 showTasks()


function showTasks() {
  backlogArray.forEach(backLogValue => renderTask(backLogValue, firstCard))
  progressArray.forEach(progressValue => renderTask(progressValue, secondCard))
  completeArray.forEach(backLogValue => renderTask(backLogValue, thirdCard))
  onholdArray.forEach(backLogValue => renderTask(backLogValue, fourthCard))
}


saveButtons.forEach(saveButton => saveButton.addEventListener(
    'click', ()=>{
      
      saveButton.parentElement.classList.remove('show')
      createTask(saveButton.previousElementSibling, saveButton.parentElement.parentElement)
      })
    )


function createTask(elementInput, card){
   eval(elementInput.classList + "Array").push(elementInput.value)

    renderTask(elementInput.value, card)
   
    saveToStorage()  
    

}

function renderTask(value, card) {
    let newTask = document.createElement('div')
    newTask.classList.add('taskStyle')
    newTask.append(value)
    taskIdCounter++
    newTask.id = "task"+ taskIdCounter
    newTask.draggable= 'true'
    newTask.addEventListener("dragstart", function(ev) {
      drag(ev)
  });
    card.append(newTask)
}



function saveToStorage() {
    listArrays = [backlogArray, progressArray, completeArray, onholdArray];
    const arrayNames = ['backlogs', 'progress', 'complete', 'onhold']; 
    arrayNames.forEach((arrayName, index) => {
      localStorage.setItem(`${arrayName}`, JSON.stringify(listArrays[index]));
    });
  }

  function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("taskId", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("taskId");
    ev.target.appendChild(document.getElementById(data));
}


 