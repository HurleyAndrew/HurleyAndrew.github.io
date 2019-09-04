class colorBox {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.fillColor = "#ffffff";
    this.hover = false;
  }

  checkHover() {
    if (
      mouseX >= this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      this.hover = true;
    } else {
      this.hover = false;
    }
  }
  changeColor(color) {
    if (this.hover) {
      this.fillColor = color;
    }
  }
  display() {
    fill(this.fillColor);
    rect(this.x, this.y, this.width, this.height);
  }
}
