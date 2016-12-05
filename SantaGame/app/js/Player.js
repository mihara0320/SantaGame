
var Player = function() {
  this.keyDirection = 0;
}
// Get arrow key input
document.onkeydown = function getDirection() {

  switch(event.keyCode) {
      case 37: // left key pressed
          if (player.keyDirection == 3){
            player.keyDirection = 3;
          } else {
            player.keyDirection = 1;
          }
          console.log("left");
          break;
      case 38:
          // up key pressed
          if (player.keyDirection == 4){
            player.keyDirection = 4;
          } else {
            player.keyDirection = 2;
          }
          console.log("up");
          break;
      case 39:
          // right key pressed
          if (player.keyDirection == 1){
            player.keyDirection = 1;
          } else {
            player.keyDirection = 3;
          }
          console.log("right");
          break;
      case 40:
          // down key pressed
          if (player.keyDirection == 2){
            player.keyDirection = 2;
          } else {
            player.keyDirection = 4;
          }
          console.log("down");
          break;
      default:
          player.keyDirection = 0;
          break;
  }
}
