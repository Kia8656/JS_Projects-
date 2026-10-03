const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');



for (const card of cards) {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
}


for (const list of lists) {
  list.addEventListener('dragover', dragOver);
  list.addEventListener('dragenter', dragEnter);
  list.addEventListener('dragleave', dragLeave);
  list.addEventListener('drop', dragDrop);

}


function dragStart(e) {
  // this allows the drop location know which element
  // is being moved when you release it.
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.log("drag ended");
}

function dragOver(e) {
  // this line is important because by default the browsers doesn't allow
  // you to drop elements onto element and this overwrites it.
  e.preventDefault();

}


function dragEnter() {
  e.preventDefault();
  
  this.classList.add('over');
}


function dragLeave() {

  this.classList.remove('over');
}


function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");

  const card = document.getElementById(id);

  this.appendChild(card);

  this.classList.remove('over');
}