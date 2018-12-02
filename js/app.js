'use strict';

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Enemy.prototype.checkCollision = function() {
        if (
        player.y + 50 >= this.y
        && player.x <= this.x + 50
        && player.y <= this.y + 50
        && player.x + 50 >= this.x) {
            player.x = playerX;
            player.y = playerY;
        }
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    
    if (this.x >= 500) {
        this.x = -100;
    }

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y, speed) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed
};

Player.prototype.update = function(dt) {
    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y <= 0) {
        this.x = playerX;
        this.y = playerY;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 14;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
};

var playerX = 200;
var playerY = 400;
var playerSpeed = 100;
var player = new Player(playerX, playerY, playerSpeed);
var scoreDiv = document.createElement('div');
var numBugs = 3;

var randomNum = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


var allEnemies = [];

for (var i = 0; i < numBugs; i++) {
    if (i % numBugs === 0) {
        allEnemies.push(new Enemy(-50, 56, randomNum(100, 400)));
    }
    if (i % numBugs == 1) {
        allEnemies.push(new Enemy(-50, 142, randomNum(100, 400)));
    }
    if (i % numBugs == 2) {
        allEnemies.push(new Enemy(-50, 225, randomNum(100, 400)));
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
