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
            else console.log(this.game.message);
        }


    }

    askQuestion() {
        console.log('\n\nDirections: up = u, down = d, right = r, left = l');
        const direction = prompt('Which direction would you like to move? ');

        if (direction === 'u') {
            this.playerYLocation--;
            this.checkStatus(this.playerXLocation, this.playerYLocation);
        } else if (direction === 'd') {
            this.playerYLocation++;
            this.checkStatus(this.playerXLocation, this.playerYLocation);
        } else if (direction === 'l') {
            this.playerXLocation--;
            this.checkStatus(this.playerXLocation, this.playerYLocation);
        } else if (direction === 'r') {
            this.playerXLocation++;
            this.checkStatus(this.playerXLocation, this.playerYLocation);
        } else {
            this.checkStatus(this.playerXLocation, this.playerYLocation);
            console.log('\n');
            console.log(this.game.message);
        }
    }

    checkStatus(currentX, currentY) {
        const colOutOfBounds = this.field.length;
        const rowOutOfBounds = this.field[0].length;

        let message = undefined;
        let over = undefined;

        // Check if Fallen off column
        if (currentX < 0 || currentX >= colOutOfBounds) {
            over = true;
            message = 'Out Of Bounds!';
        }
        // Check if Fallen off row
        else if (currentY < 0 || currentY >= rowOutOfBounds) {
            over = true;
            message = 'Out Of Bounds!';
        }
        // Check if on hat position
        else if (this.field[currentY][currentX] === hat) {
            over = true;
            message = 'You Found Your Hat!';
        }
        // Check if Landed on hole
        else if (this.field[currentY][currentX] === hole) {
            over = true;
            message = 'You Fell In A Hole!';
        } else {
            over = false;
            message = 'Invalid Input Please Use Valid Directions.';
        }

        this.game.over = over;
        this.game.message = message;
    }

    print() {
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    updateField(row, col) {
        this._field[row][col] = pathCharacter;
    }

    static generateField(height, width, percent = 0.1) {
        // creates empty Array with height 
        const randField = new Array(height)
            // fills the empty undefinded filled array with defined value of 0
            .fill(0)
            // each 0 element of the randField array will then be filled with another empty Array with width
            .map(el => new Array(width));


        for (let i = 0; i < height; i++) {
            for (let k = 0; k < width; k++) {
                const prob = Math.random();
                randField[i][k] = prob > percent ? fieldCharacter : hole;
            }
        }

        // randomized location for hat
        let randCol = Math.floor(Math.random() * width);
        let randRow = Math.floor(Math.random() * height);

        // make sure hat is not located in the same location as start point of user
        if (randRow === 0) randRow++;
        randField[randRow][randCol] = hat;

        return randField;
    }
};

const myField = new Field(Field.generateField(10, 10));

myField.startGame();