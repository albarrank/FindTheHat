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
        this.playerXLocation = 0;
        this.playerYLocation = 0;
        this.game = {
            over: false,
            message: ''
        }

        // home position for player 
        this._field[0][0] = pathCharacter;
    }

    get field() {
        return this._field;
    }

    startGame() {
        // let gameOver = false;

        while (!this.game.over) {


            this.print();
            this.askQuestion();

            // Check if Game over
            if (!this.game.over) this.updateField(this.playerYLocation, this.playerXLocation);
            else {

                // End the game
                gameOver = game.over

                // Log reason Game ended
                console.log(game.status);


            }
        }


    }

    askQuestion() {
        console.log('\n\nDirections: up = u, down = d, right = r, left = l');
        const direction = prompt('Which direction would you like to move? ');

        if (direction === 'u') {
            this.playerYLocation--;
            this.game = this.checkStatus(currentRow, currentCol);
        } else if (direction === 'd') {
            this.playerYLocation++;
            this.game = this.checkStatus(currentRow, currentCol);
        } else if (direction === 'l') {
            this.playerXLocation--;
            this.game = this.checkStatus(currentRow, currentCol);
        } else if (direction === 'r') {
            this.playerXLocation++;
            this.game = this.checkStatus(currentRow, currentCol);
        } else {
            this.game = this.checkStatus(currentRow, currentCol);
            console.log('\n');
            console.log(this.game.message);
        }
    }

    checkStatus(currentX, currentY) {
        const colOutOfBounds = this.field.length;
        const rowOutOfBounds = this.field[0].length;

        let status = undefined;
        let over = undefined;

        // Check if Fallen off column
        if (currentX < 0 || currentX >= colOutOfBounds) {
            over = true;
            status = 'Out Of Bounds!';
        }
        // Check if Fallen off row
        else if (currentY < 0 || currentY >= rowOutOfBounds) {
            over = true;
            status = 'Out Of Bounds!';
        }
        // Check if on hat position
        else if (this.field[currentY][currentX] === hat) {
            over = true;
            status = 'You Found Your Hat!';
        }
        // Check if Landed on hole
        else if (this.field[currentY][currentX] === hole) {
            over = true;
            status = 'You Fell In A Hole!';
        } else {
            over = false;
            status = 'Invalid Input Please Use Valid Directions.';
        }

        return {
            over,
            status

        }
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    updateField(row, col) {
        this._field[row][col] = pathCharacter;
    }

    static generateField(height, width) {
        const randField = [];

        // randomized location for hat
        let randCol = Math.floor(Math.random() * width);
        let randRow = Math.floor(Math.random() * height);


        for (let i = 0; i < height; i++) {
            let row = [];

            for (let k = 0; k < width; k++) {
                if (k === 0 && i === 0) row.push(pathCharacter);
                else row.push(randomCharacter());
            }
            randField.push(row);
        }

        // make sure hat is not located in the same location as start point of user
        if (randRow === 0) randRow++;
        randField[randRow][randCol] = hat;

        return randField;
    }
};

const myField = new Field(Field.generateField(5, 5));

console.log(myField)

// Game logic
let currentRow = 0;
let currentCol = 0;

function checkStatus(currentRow, currentCol) {
    const colOutOfBounds = myField.field.length;
    const rowOutOfBounds = myField.field[0].length;

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
        status = 'Invalid Input Please Use Valid Directions.';
    }

    return {
        over,
        status

    }
}

function randomCharacter() {
    const characterArray = [hole, fieldCharacter, fieldCharacter, hole, fieldCharacter, fieldCharacter];
    const randomIndex = Math.floor(Math.random() * characterArray.length);

    return characterArray[randomIndex]
}