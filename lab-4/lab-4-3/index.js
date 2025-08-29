const egg = document.querySelector(".egg");
const basket = document.querySelector(".basket");

function checkPosition() {
  if (egg.style.left === basket.style.left) {
    egg.hidden = true;
    console.log('hidden!');
  } else {
    egg.src = "images/broken.png";
  }
}


let leftPosition = Math.floor(100 * Math.random());
egg.style.left = leftPosition + "%";
let topPosition = -100;
const timerID = setInterval(() => {
  topPosition += 40;
  egg.style.top = topPosition + "px";
  if (topPosition >= window.innerHeight - 90) {
    checkPosition();
    clearInterval(timerID);
  }
}, 200);



let leftPositionBasket = 300;
basket.style.left = leftPositionBasket + "px";
window.onkeydown = (e) => {
  switch (e.keyCode) {
    case 39: // arrow right
      leftPositionBasket += 10;
      basket.style.left = leftPositionBasket + "px";
      break;
    case 37: // arrow left
      leftPositionBasket -= 10;
      basket.style.left = leftPositionBasket + "px";
      break;
    default:
      break;
  }

}