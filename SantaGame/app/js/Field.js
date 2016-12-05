function pixelConv (num) {
  this.num = num * 32;
  return this.num;
};

var gridSize = { rows: 18, cols: 24 };

var Field = function(){
  this.field;
  this.height = gridSize.rows * 32;
  this.width = gridSize.cols * 32;

  this.setNextTresure = true;
  this.score = 0;
  this.endFlag = false;
}

Field.prototype.init = function () {
  this.field = Field.prototype.generateField(gridSize.rows, gridSize.cols);
};

Field.prototype.generateField = function (rows, cols) {
  this.rows = rows;
  this.cols = cols;
  this.matrix = [];

  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.cols; j++) {
      if (i == 0 || i == this.rows -1) {
        this.matrix.push([]);
        this.matrix[i][j] = 1;
      } else if(j == 0 || j == this.cols -1) {
        this.matrix.push([]);
        this.matrix[i][j] = 1;
      } else {
        this.matrix.push([]);
        this.matrix[i][j] = 0;
      }
    }
  }
  return this.matrix;
};

Field.prototype.getRandomRow = function () {
  this.randomRow = Math.floor(Math.random() * (gridSize.rows -2) + 1);

  for (var i = 0; i < snake.tailLength; i++) {
    while (this.randomRow == drawing.tails[i].position.x) {
      this.randomRow = Math.floor(Math.random() * (gridSize.rows -2) + 1);
    }
  }
  return this.randomRow;
};

Field.prototype.getRandomCol = function () {

  this.randomCol = Math.floor(Math.random() * (gridSize.cols -2) + 1);

  for (var i = 0; i < snake.tailLength; i++) {
    while (this.randomCol == drawing.tails[i].position.y) {
      this.randomCol = Math.floor(Math.random() * (gridSize.cols -2) + 1);
    }
  }
  return this.randomCol;
};

Field.prototype.setTresure = function () {
  this.ramdomRow = Field.prototype.getRandomRow();
  this.ramdomCol = Field.prototype.getRandomCol();

  if (field.setNextTresure == true){
    for (var i = 0; i < snake.tailLength; i++) {
      if (drawing.tails[i].position.y == this.ramdomRow && drawing.tails[i].position.x == this.ramdomCol ) {
        this.ramdomRow = Field.prototype.getRandomRow();
        this.ramdomCol = Field.prototype.getRandomCol();
      }
    }
    drawing.tresure.position.x = pixelConv(this.randomCol);
    drawing.tresure.position.y = pixelConv(this.randomRow);
  }
  field.setNextTresure = false;
  drawing.stage.addChild(drawing.tresure);
};

Field.prototype.judgeHitWall = function () {
  if (snake.currentRow < pixelConv(1) || snake.currentRow > field.height - pixelConv(2)){
    field.endFlag = true;
    // Debug
    if(field.endFlag == true){
      console.log("Hitting Row Wall Stopped Game");
      console.log(snake.currentRow);
      console.log(snake.currentCol);
    }

  } else if (snake.currentCol < pixelConv(1) || snake.currentCol > field.width - pixelConv(2)){
    field.endFlag = true;
    // Debug
    if (field.endFlag == true){
    console.log("Hitting Col Wall Stopped Game");
    console.log(snake.currentRow);
    console.log(snake.currentCol);
    }

  }
};

Field.prototype.judgeHitMyself = function () {
  for (var i = 0; i < snake.tailLength; i++) {
    if (drawing.tails[i].position.x == snake.currentCol && drawing.tails[i].position.y == snake.currentRow){
      field.endFlag = true;
      // Debug
      if (field.endFlag == true){
        console.log("judgeHitMyself() Stoped Game");
      }
    }
  }
};

Field.prototype.judgeEatTresure = function () {
  if (snake.currentRow == drawing.tresure.position.y && snake.currentCol == drawing.tresure.position.x){
    Snake.prototype.eatTresure();
    // Debug
    if (field.endFlag == true){
      console.log("judgeEatTresure() Stoped Game");
    }
  }
};

Field.prototype.judge = function () {
  Field.prototype.judgeEatTresure();
  Field.prototype.judgeHitWall();
  Field.prototype.judgeHitMyself();
};

Field.prototype.printMatrix = function (matrix) {

  this.matrix = matrix;

  for (var i = 0; i < gridSize.rows; i++) {
    for (var j = 0; j < gridSize.cols; j++) {
      document.write(this.matrix[i][j]);
    }
    document.write("<br>")
  }
};
