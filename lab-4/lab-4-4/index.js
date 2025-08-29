const addButton = document.querySelector("button");
const table = document.querySelector("table");
const task = document.querySelector(".task");

function adjustCheckbox() {
  const checkboxes = document.querySelectorAll(".checkbox");
  const taskTexts = document.querySelectorAll(".taskText");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click", function () {
      if (this.checked) {
        taskTexts[i].style.textDecoration = "line-through";
      } else taskTexts[i].style.textDecoration = "";
    });
  }
}
addButton.addEventListener("click", () => {
  const newRow = document.createElement("tr");

  const firstColumn = document.createElement("td");
  firstColumn.innerHTML = `<input type="checkbox" class="checkbox"></input>`;
  adjustCheckbox();

  const secondColumn = document.createElement("td");
  secondColumn.classList.add("taskText");
  secondColumn.innerText = task.value;

  const thirdColumn = document.createElement("td");
  thirdColumn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  thirdColumn.addEventListener("click", function () {
    this.parentElement.remove();
  });

  newRow.appendChild(firstColumn);
  newRow.appendChild(secondColumn);
  newRow.appendChild(thirdColumn);

  table.appendChild(newRow);
});