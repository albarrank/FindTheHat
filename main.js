const prompt = require('prompt-sync')({
    sigint: true
});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(twoDimArray) {
        this._field = twoDimArray;
    }

    get field() {
        return this._field;
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    updateField(row, col) {
        // create code for user to backtrack
        this._field[row][col] = pathCharacter;
    }
};

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░']
]);

// Game logic

let gameOver = false;
let currentRow = 0;
let currentCol = 0;
let status = null;

while (!gameOver) {
    
    // Give directions
    console.log('\n\nDirections: up = U, down = D, right = R, left = L');
    
    // Show the current field for the game
    myField.print();
    const direction = prompt('Which direction would you like to move? ');



    if (direction === 'U') {
        currentRow--;
        game = checkStatus(currentRow, currentCol);
    } else if (direction === 'D') {
        currentRow++;
        game = checkStatus(currentRow, currentCol);
    } else if (direction === 'L') {
        currentCol--;
        game = checkStatus(currentRow, currentCol);
    } else if (direction === 'R') {
        currentCol++;
        game = checkStatus(currentRow, currentCol);
    } else {
        game = checkStatus(currentRow, currentCol);
        console.log(game);
    }

    // Check if Game over
    if (!game.over) myField.updateField(currentRow, currentCol);
    else {

        // End the game
        gameOver = game.over

        // Log reason Game ended
        console.log(game.status);


    } 
}


function checkStatus(currentRow, currentCol) {
    const colOutOfBounds = myField.field.length;
    const rowOutOfBounds = myField.field[0].length;

    // console.log(currentRow, currentCol);
    // console.log(rowOutOfBounds, colOutOfBounds);

    let status = undefined;
    let over = undefined;
    
    // Check if Fallen off column
    if (currentCol < 0 || currentCol >= colOutOfBounds) {
        over = true;
        status = 'Out Of Bounds!';
    }
    // Check if Fallen off row
    else if (currentRow < 0 || currentRow >= rowOutOfBounds) {
        over = true;
        status = 'Out Of Bounds!';
    }
    // Check if on hat position
    else if (myField.field[currentRow][currentCol] === hat) {
        over = true;
        status = 'You Found Your Hat!';
    }
    // Check if Landed on hole
    else if (myField.field[currentRow][currentCol] === hole) {
        over = true;
        status = 'You Fell In A Hole!';
    } else {
        over = false;
        status ='Invalid Input Please Use Valid Directions.';
    }

    return {
        over,
        status

    }
}