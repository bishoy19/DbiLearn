const redBox = document.querySelector(".red");
const greenBox = document.querySelector(".green");
const blueBox = document.querySelector(".blue");
const container = document.querySelector(".container");

const boxes = document.querySelectorAll(".square");
for (let box of boxes) {
  box.onclick = addBox;
}


function addBox() {
  const color = this.getAttribute("id");
  console.log(color)
  const newBox = document.createElement("div");
  newBox.classList.add("square");
  newBox.classList.add(color);
  newBox.setAttribute("id", color);
  newBox.onclick = addBox;
  container.appendChild(newBox);

  this.classList.add('deactivated');
  this.onclick = function () { };

}