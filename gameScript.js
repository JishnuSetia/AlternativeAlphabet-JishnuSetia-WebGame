//Create Canvas
let canvas = document.createElement('canvas');
canvas.width = document.body.clientWidth;
canvas.height = 800;
canvas.style.zIndex = "1";
document.body.appendChild(canvas);
let ctx = canvas.getContext('2d');
//Fonts
let font60 = "60px Merriweather";
let font30 = "30px Merriweather";
let font20 = "20px Merriweather";
//Colors
let blue = "#0078ff";
let red = "#d93233";
let yellow = "#ed9f2c";
let green = "#2e9457";
let purple = "#714a8d";
let white = "#ffffff";
//Cards
let otherWords = ["Alternative", "DEFINE", "draw", "question", "reflect"];
let letterIds = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let currentAction = 0;
let currentWord = 0;
//PlayerData
let players = ["Player 1","Player 2","Player 3","Player 4","Player 5","Player 6"];
let playerPoints = [0,0,0,0,0,0];
let currentPlayer = 0;
let playerCount = 0;
//ScreenManagement
let currentScreen = "players";
//Buttons
let buttonsPlayerScreen = [
    { text: "2 Players", x: canvas.width / 2 - 100, y: 200, width: 200, height: 50, clickValue: 2 },
    { text: "3 Players", x: canvas.width / 2 - 100, y: 270, width: 200, height: 50, clickValue: 3 },
    { text: "4 Players", x: canvas.width / 2 - 100, y: 340, width: 200, height: 50, clickValue: 4 },
    { text: "5 Players", x: canvas.width / 2 - 100, y: 410, width: 200, height: 50, clickValue: 5 },
    { text: "6 Players", x: canvas.width / 2 - 100, y: 480, width: 200, height: 50, clickValue: 6 }
];
let buttonsScoreBoard = [
    {text: "Exit", x:canvas.width/2-300,y:200,width:200,height:50,clickValue:"Exit"},
    {text: "Continue", x:canvas.width/2+100,y:200,width:200,height:50,clickValue:"Continue"}
];
let buttonsEndScreen = [
    {text:"New Game", x: canvas.width / 2 - 100, y: 200, width: 200, height: 50, clickValue: 2 }
]
let buttonsGameScreen = [
    {text:"Completed", x: canvas.width / 2 - 300, y: 200, width: 200, height: 50, clickValue: 2 },
    {text:"Forfeit", x: canvas.width / 2 + 100, y: 200, width: 200, height: 50, clickValue: 2 }
]
//PlayerSelectionScreen
function drawPlayersScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = white;
    ctx.font = font60;
    ctx.textAlign = "center";
    ctx.fillText("Choose Your Player Count", canvas.width / 2, 100);
    buttonsPlayerScreen.forEach(button => {
        // Button color
        let buttonColor;
        switch(button.text) {
            case "2 Players":
                buttonColor = "#375998";
                break;
            case "3 Players":
                buttonColor = "#d93233";
                break;
            case "4 Players":
                buttonColor = "#ed9f2c";
                break;
            case "5 Players":
                buttonColor = "#2e9457";
                break;
            case "6 Players":
                buttonColor = "#714a8d";
                break;
            default:
                buttonColor = "#0056b3";
                break;
        }
        ctx.fillStyle = buttonColor;
        ctx.beginPath();
        ctx.moveTo(button.x + 10, button.y);
        ctx.lineTo(button.x + button.width - 10, button.y);
        ctx.quadraticCurveTo(button.x + button.width, button.y, button.x + button.width, button.y + 10);
        ctx.lineTo(button.x + button.width, button.y + button.height - 10);
        ctx.quadraticCurveTo(button.x + button.width, button.y + button.height, button.x + button.width - 10, button.y + button.height);
        ctx.lineTo(button.x + 10, button.y + button.height);
        ctx.quadraticCurveTo(button.x, button.y + button.height, button.x, button.y + button.height - 10);
        ctx.lineTo(button.x, button.y + 10);
        ctx.quadraticCurveTo(button.x, button.y, button.x + 10, button.y);
        ctx.closePath();
        ctx.fill();

        // Text color
        ctx.fillStyle = white;
        ctx.font = font20;
        ctx.textAlign = "center";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 10);
    });
}
//GameScreen
function drawGameScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = white;
    ctx.font = font60;
    ctx.textAlign = "center";
    ctx.fillText(players[currentPlayer]+"'s Turn", canvas.width / 2, 100);

    // Draw image
    let image = document.getElementById(letterIds[currentWord]);
    ctx.drawImage(image, 0, 0, image.width, image.height, canvas.width / 2 - 300, 150, 200, 300);

    image = document.getElementById(otherWords[currentAction]);
    ctx.drawImage(image, 0, 0, image.width, image.height, canvas.width / 2 + 100, 150, 200, 300);

    // Draw card borders
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.strokeRect(canvas.width / 2 - 300, 150, 200, 300);
    ctx.strokeRect(canvas.width / 2 + 100, 150, 200, 300);

    buttonsGameScreen.forEach(button => {
        // Button color
        let buttonColor;
        switch(button.text) {
            default:
                buttonColor = blue;
                break;
        }
        ctx.fillStyle = buttonColor;
        ctx.beginPath();
        button.y = 350+(50*(3));
        ctx.moveTo(button.x + 10, button.y);
        ctx.lineTo(button.x + button.width - 10, button.y);
        ctx.quadraticCurveTo(button.x + button.width, button.y, button.x + button.width, button.y + 10);
        ctx.lineTo(button.x + button.width, button.y + button.height - 10);
        ctx.quadraticCurveTo(button.x + button.width, button.y + button.height, button.x + button.width - 10, button.y + button.height);
        ctx.lineTo(button.x + 10, button.y + button.height);
        ctx.quadraticCurveTo(button.x, button.y + button.height, button.x, button.y + button.height - 10);
        ctx.lineTo(button.x, button.y + 10);
        ctx.quadraticCurveTo(button.x, button.y, button.x + 10, button.y);
        ctx.closePath();
        ctx.fill();

        // Text color
        ctx.fillStyle = white;
        ctx.font = font20;
        ctx.textAlign = "center";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 10);
    });
}
//ScoreBoard
function drawScoreBoard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = white;
    ctx.font = font60;
    ctx.textAlign = "center";
    ctx.fillText("Score Board", canvas.width / 2, 100);
    ctx.font = font30;
    for (let i = 0; i < playerCount; i++) {
        ctx.fillText(players[i] + ": " + playerPoints[i], canvas.width / 2, 110 + (50 * (i + 1)));
    }
    buttonsScoreBoard.forEach(button => {
        // Button color
        let buttonColor;
        switch(button.text) {
            case "Exit":
                buttonColor = red;
                break;
            default:
                buttonColor = blue;
                break;
        }
        ctx.fillStyle = buttonColor;
        ctx.beginPath();
        button.y = 110+(50*(playerCount+1));
        ctx.moveTo(button.x + 10, button.y);
        ctx.lineTo(button.x + button.width - 10, button.y);
        ctx.quadraticCurveTo(button.x + button.width, button.y, button.x + button.width, button.y + 10);
        ctx.lineTo(button.x + button.width, button.y + button.height - 10);
        ctx.quadraticCurveTo(button.x + button.width, button.y + button.height, button.x + button.width - 10, button.y + button.height);
        ctx.lineTo(button.x + 10, button.y + button.height);
        ctx.quadraticCurveTo(button.x, button.y + button.height, button.x, button.y + button.height - 10);
        ctx.lineTo(button.x, button.y + 10);
        ctx.quadraticCurveTo(button.x, button.y, button.x + 10, button.y);
        ctx.closePath();
        ctx.fill();

        // Text color
        ctx.fillStyle = white;
        ctx.font = font20;
        ctx.textAlign = "center";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 10);
    });

}
//End Screen
function drawEndScreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = white;
    ctx.font = font60;
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, 100);
    ctx.font = font30;
    ctx.textAlign = "center";
    ctx.fillText("Score Board", canvas.width / 2, 160);
    ctx.font = font20;
    for (let i = 0; i < playerCount; i++) {
        ctx.fillText(players[i] + ": " + playerPoints[i], canvas.width / 2, 180 + (50 * (i + 1)));
    }
    buttonsEndScreen.forEach(button => {
        // Button color
        let buttonColor;
        switch(button.text) {
            default:
                buttonColor = blue;
                break;
        }
        ctx.fillStyle = buttonColor;
        ctx.beginPath();
        button.y = 180+(50*(playerCount+1));
        ctx.moveTo(button.x + 10, button.y);
        ctx.lineTo(button.x + button.width - 10, button.y);
        ctx.quadraticCurveTo(button.x + button.width, button.y, button.x + button.width, button.y + 10);
        ctx.lineTo(button.x + button.width, button.y + button.height - 10);
        ctx.quadraticCurveTo(button.x + button.width, button.y + button.height, button.x + button.width - 10, button.y + button.height);
        ctx.lineTo(button.x + 10, button.y + button.height);
        ctx.quadraticCurveTo(button.x, button.y + button.height, button.x, button.y + button.height - 10);
        ctx.lineTo(button.x, button.y + 10);
        ctx.quadraticCurveTo(button.x, button.y, button.x + 10, button.y);
        ctx.closePath();
        ctx.fill();

        // Text color
        ctx.fillStyle = white;
        ctx.font = font20;
        ctx.textAlign = "center";
        ctx.fillText(button.text, button.x + button.width / 2, button.y + button.height / 2 + 10);
    });

}
//Event Listener
canvas.addEventListener('click', function(event) {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    switch (currentScreen){
        case "players":
            // Check if any button is clicked
            buttonsPlayerScreen.forEach(button => {
                if (mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height) {
                    playerCount=button.clickValue;
                    currentScreen="scoreboard";
                }
            });
            break;
        case "game":
            buttonsGameScreen.forEach(button => {
                if (mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height) {
                    if(button.text=="Completed"){
                        playerPoints[currentPlayer]+=10;
                    }
                    currentScreen = "scoreboard";
                }
            });
            break;
        case "scoreboard":
            buttonsScoreBoard.forEach(button => {
                if (mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height) {
                    console.log("Button clicked:", button.text);
                    if(button.text=="Exit"){
                        currentScreen="end";
                    }else{
                        currentScreen="game";
                        currentPlayer = currentPlayer+1==playerCount?0:currentPlayer+1;
                        currentAction = Math.floor(Math.random()*otherWords.length);
                        currentWord = Math.floor(Math.random()*letterIds.length);
                    }
                }
            });
            break;
        case "end":
            buttonsEndScreen.forEach(button => {
                if (mouseX >= button.x && mouseX <= button.x + button.width && mouseY >= button.y && mouseY <= button.y + button.height) {
                    location.reload();
                }
            });
            break;
        default:
            break;
    }
});
//Render Func
function render(){
    switch (currentScreen) {
        case "players":
            drawPlayersScreen();// done
            break;
        case "game":
            drawGameScreen();
            break;
        case "scoreboard":
            drawScoreBoard();//done
            break;
        case "end":
            drawEndScreen();//done
            break;
    }
}
// Main game loop
function gameLoop() {
    render();
    requestAnimationFrame(gameLoop);
}
// Start the game loop
gameLoop();
