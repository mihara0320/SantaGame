var Drawing = function(){
  this.style = {
    fontFamily : 'fantasy',
    fontSize : '30px',
    fontStyle : 'normal',
    fontWeight : 'bold',
    fill : '#000000',
  };
  this.stage = new PIXI.Container();
  // Texture for field and walls
  this.textureGlass = PIXI.Texture.fromImage('png/snow.png');
  this.glasses = [];
  this.textureWall = PIXI.Texture.fromImage('png/wall.png');
  this.walls = [];
  // Texture collections for snakeHead
  this.textureHeadUp = PIXI.Texture.fromImage('png/SantaUp.png');
  this.textureHeadLeft = PIXI.Texture.fromImage('png/SantaLeft.png');
  this.textureHeadDown = PIXI.Texture.fromImage('png/SantaDown.png');
  this.textureHeadRight = PIXI.Texture.fromImage('png/SantaRight.png');
  this.head = new PIXI.Sprite(this.textureHeadUp);
  this.head.anchor.x = 0;
  this.head.anchor.y = 0;
  // Texture for snakeTails
  this.textureTail = PIXI.Texture.fromImage('png/SantaBag.png');
  this.tails = [];
  // Texture for tresure
  this.textureTresure = PIXI.Texture.fromImage('png/chestBox.png');
  this.tresure = new PIXI.Sprite(this.textureTresure);
  this.tresure.anchor.x = 0;
  this.tresure.anchor.y = 0;
  // Texture for rectangle behind scoreDisplay
  this.rectangle = new PIXI.Graphics();
  this.rectangle.beginFill(0xeeeeee, 1);
  this.rectangle.drawRect(782, 15, 202, 545);
  // Comments for game play
  this.tryHarderDisplay = new PIXI.Text('Try Harder!!!', this.style);
  this.tryHarderDisplay.x = 300;
  this.tryHarderDisplay.y = 280;
  this.niceTryDisplay = new PIXI.Text('Nice try!!!', this.style);
  this.niceTryDisplay.x = 315;
  this.niceTryDisplay.y = 280;
  this.excellentDisplay = new PIXI.Text('Excellent!!!', this.style);
  this.excellentDisplay.x = 300;
  this.excellentDisplay.y = 280;
  this.gameOverDisplay = new PIXI.Text('Game Over!!!', this.style);
  this.gameOverDisplay.x = 300;
  this.gameOverDisplay.y = 200;
  // Text on the top of reload icon
  this.playAgainDisplay = new PIXI.Text('Play Again?', this.style);
  this.playAgainDisplay.x = 810;
  this.playAgainDisplay.y = 390;
  // Reload icon
  this.reload = PIXI.Sprite.fromImage('png/reload.png');
  this.reload.position.set(880,490);
  this.reload.anchor.x = 0.5;
  this.reload.anchor.y = 0.5;
  this.reload.interactive = true;
  this.reload.on('mousedown', Drawing.prototype.reloadPage);
  this.reload.on('touchstart', Drawing.prototype.reloadPage);
}

// Initializes positions for snakeHead and snakeTails
Drawing.prototype.init = function () {
  for (var i = 0 ; i < (gridSize.rows -2) * (gridSize.cols -2) ; i++) {
    drawing.tails.push(new PIXI.Sprite(drawing.textureTail));
    drawing.tails[i].position.x = snake.pointerCol;
    drawing.tails[i].position.y = snake.pointerRow + pixelConv(i + 1);
    drawing.tails[i].anchor.x = 0;
    drawing.tails[i].anchor.y = 0;
  }

  drawing.head.position.x = snake.currentCol;
  drawing.head.position.y = snake.currentRow;
};
// Collection of update functions of this object
Drawing.prototype.update = function () {
  Drawing.prototype.backgroundUpdate();
  snake.update();
  Drawing.prototype.tailsUpdate();
  Drawing.prototype.scoreUpdate();
};
// Allocate field and walls images to corresponding position
// If the position has 1, allocate wall
// If teh position has 0, allocate field
Drawing.prototype.backgroundUpdate = function () {
  var glassCounter = 0;
  var wallCounter = 0;

  for(var row = 0; row < gridSize.rows; row ++){
    for(var col = 0; col < gridSize.cols; col ++){
      var posx = pixelConv(col);
      var posy = pixelConv(row);
        if( field.field[row][col] == 0){
          drawing.glasses.push(new PIXI.Sprite(drawing.textureGlass));
          drawing.glasses[glassCounter].position.x = posx;
          drawing.glasses[glassCounter].position.y = posy;
          drawing.glasses[glassCounter].anchor.x = 0;
          drawing.glasses[glassCounter].anchor.y = 0;
          drawing.stage.addChild(drawing.glasses[glassCounter]);
          glassCounter ++;
        } else if (field.field[row][col] == 1) {
          drawing.walls.push(new PIXI.Sprite(drawing.textureWall));
          drawing.walls[wallCounter].position.x = posx;
          drawing.walls[wallCounter].position.y = posy;
          drawing.walls[wallCounter].anchor.x = 0;
          drawing.walls[wallCounter].anchor.y = 0;
          drawing.stage.addChild(drawing.walls[wallCounter]);
          wallCounter ++;
      }
    }
  }
};
// Manages drawing of snakeTails following snakeHead
Drawing.prototype.tailsUpdate = function () {
  var tempX =[];
  var tempY =[];
  // Copying current tail positions to temporary place holder
  for (var i = 0 ; i < (gridSize.rows -2) * (gridSize.cols -2); i++) {
    tempX.push(drawing.tails[i].position.x);
    tempY.push(drawing.tails[i].position.y);
  }
  // Only first part of tail reads where the head was in one frame before
  // The rest of tails follow one tail before
  for (var i = 0 ; i < (gridSize.rows -2) * (gridSize.cols -2); i++) {
    if( player.keyDirection != 0 ) {
      if(i == 0) {
        drawing.tails[i].position.x = snake.pointerCol;
        drawing.tails[i].position.y = snake.pointerRow;
      }
       else {
        drawing.tails[i].position.x = tempX[i-1];
        drawing.tails[i].position.y = tempY[i-1];
      }
    }
  }
  for (var i = 0; i < snake.tailLength; i++) {
    drawing.stage.addChild(drawing.tails[i])
  }
};
// Refreashed page if reload icon is pressed
Drawing.prototype.reloadPage = function (eventData) {
  location.reload();
};
// Animates reload icon
Drawing.prototype.reloadAnimate = function () {
  requestAnimationFrame(Drawing.prototype.reloadAnimate);
  drawing.reload.rotation -= 0.001;
  drawing.stage.addChild(drawing.reload);
  drawing.stage.addChild(drawing.playAgainDisplay);
};
// Display current score and speed
Drawing.prototype.scoreUpdate = function () {
  var scoreAsString = field.score.toString();
  var scoreDisplay = new PIXI.Text('Score: ' + scoreAsString, drawing.style);
  scoreDisplay.x = field.width + 20;
  scoreDisplay.y = field.height / 20;
  var movingSpeedAdString = snake.movingSpeed.toString();
  var speedDisplay = new PIXI.Text("Speed: " + movingSpeedAdString + "ms", drawing.style);
  speedDisplay.x = field.width + 20;
  speedDisplay.y = field.height / 7;
  drawing.stage.addChild(drawing.rectangle);
  drawing.stage.addChild(scoreDisplay);
  drawing.stage.addChild(speedDisplay);
};
// Display Game Over followed by some comments
Drawing.prototype.DisplayGameOver = function () {
  if (field.score < 1000){
    drawing.stage.addChild(this.tryHarderDisplay);
  } else if (field.score < 10000){
    drawing.stage.addChild(this.niceTryDisplay);
  } else {
    drawing.stage.addChild(this.excellentDisplay);
  }
  drawing.stage.addChild(this.gameOverDisplay);
};
