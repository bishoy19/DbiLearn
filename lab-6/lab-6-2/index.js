function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}


Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};


Rectangle.isSquare = function (rect) {
  return rect.width === rect.height;
};
const rect1 = new Rectangle(5, 10);
console.log(rect1.getArea());

const rect2 = new Rectangle(4, 4);

console.log(Rectangle.isSquare(rect2));

const rect3 = new Rectangle(4, 6);

console.log(Rectangle.isSquare(rect3)); 