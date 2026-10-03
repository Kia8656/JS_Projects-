const countEl = document.getElementById('count-el');
const saveBtn = document.querySelector('#save-btn');
const saveEl = document.getElementById('save-el');
const resetBtn = document.getElementById('reset-btn');



let count = 0;

function increment() {
  //count = count + 1
  count += 1;
  countEl.textContent = count;

}

// function save() {
//   saveEl.textContent += " " + countEl.textContent + "  \u002d  ";
//   countEl.textContent = 0;
//   count = 0;
// }

function save() {
  saveEl.innerHTML +=
    ` <span class="saved-count">${countEl.textContent}</span>
     <span class="dash">\u002d</span> `;
  countEl.textContent = 0;
  count = 0;
}

// function save() {
//   let countStr = count + " - "
//   saveEl.textContent += countStr;
//   countEl.textContent = 0;
//   count = 0;
// }


function reset() {
  countEl.textContent = 0;
  saveEl.textContent = "Previous enteries:";
}