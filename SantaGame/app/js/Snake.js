


var Snake = function (){
  this.tailLength = 3;
  this.movingSpeed = 200;

  this.currentRow = pixelConv(gridSize.rows) / 2;
  this.currentCol = pixelConv(gridSize.cols) / 2;
  this.pointerRow = this.currentRow;
  this.pointerCol = this.currentCol;
}

Snake.prototype.update = function () {
  Snake.prototype.controlHead(player.keyDirection);
  drawing.head.position.y = snake.currentRow;
  drawing.head.position.x = snake.currentCol;
  drawing.stage.addChild(drawing.head);
};

Snake.prototype.init = function () {
  snake.currentRow = pixelConv(gridSize.rows) / 2;
  snake.currentCol = pixelConv(gridSize.cols) / 2;
  snake.pointerRow = snake.currentRow;
  snake.pointerCol = snake.currentCol;
};

Snake.prototype.controlHead = function (keyDirection) {
  snake.pointerCol = snake.currentCol;
  snake.pointerRow = snake.currentRow;

  switch (keyDirection) {
    case 1: // left key pressed
      snake.currentCol -= pixelConv(1);
      drawing.head.setTexture(drawing.textureHeadLeft);
      break;
    case 2: // up key pressed
      snake.currentRow -= pixelConv(1);
      drawing.head.setTexture(drawing.textureHeadUp);
      break;
    case 3: // right key pressed
      snake.currentCol += pixelConv(1);
      drawing.head.setTexture(drawing.textureHeadRight);
      break;
    case 4: // down key pressed
      snake.currentRow += pixelConv(1);
      drawing.head.setTexture(drawing.textureHeadDown);
      break;
    default:
      // Pause for any other key input
      break;
  }
};


Snake.prototype.eatTresure = function () {
  field.setNextTresure = true;
  field.score += 100;
  snake.tailLength ++;
  snake.movingSpeed -= 5;
};

function genRandomNum(){
  return Math.floor(Math.random() * 3);
}
