/**
 * @todo check if code complies with convention
 * @todo check if '==' should be replaced with '==='
 * @todo check for unnecessarily complex code
 */

const readline = require('readline-sync');

/**
 * @param {object} board 
 * @returns {number} `-1` if human wins
 * @returns {number} `1` if ai wins
 * @returns {number} `0` if draw
 * @returns {object} `null` if game not over
 * 
 * @reminder `board[0] = true` --> human ~> x | ai ~> o
 * @reminder `board[0] = false` --> human ~> o | ai ~> x
 */
function gameStatus(board) {
    if (board[1] == board[2] && board[2]  == board[3]) {return board[1] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if (board[4] == board[5] && board[5] == board[6]) {return board[4] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if (board[7] == board[8] && board[8] == board[9]) {return board[7] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if (board[1] == board[4] && board[4] == board[7]) {return board[1] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if (board[2] == board[5] && board[5] == board[8]) {return board[2] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if (board[3] == board[6] && board[6] == board[9]) {return board[3] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if (board[1] == board[5] && board[5] == board[9]) {return board[1] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if (board[3] == board[5] && board[5] == board[7]) {return board[3] == (board[0] ? 'x' : 'o') ? -1 : 1;}
    else if(validMoves(board).length == 0) {return 0}
    else {return null}
}

/**
 * prints the game board
 * @param {object} board 
 */
function printBoard(board) {
    console.log(`
        |${board[1]}|${board[2]}|${board[3]}|
        --+-+--
        |${board[4]}|${board[5]}|${board[6]}|
        --+-+--
        |${board[7]}|${board[8]}|${board[9]}|
    `);
}

/**
 * @param {object} board 
 * @returns {object} array of valid moves
 */
function validMoves(board) {
    let vmoves = new Array();
    for (let i = 1; i < 10; i++) {
        if (board[i] != 'x' && board[i] != 'o') {
            vmoves.push(i);
        }
    }
    return vmoves;
}

/**
 * takes move input for human move and executes it.
 * 
 * calls minimax() executes best move for ai.
 * 
 * 
 * @param {object} board
 * @param {boolean} isHumanMove
 */
function play(board, isHumanMove) {
    if (isHumanMove) {
        try {
            console.log(validMoves(board));
            let move = readline.question('move? ');
            move = parseInt(move);
            if (validMoves(board).includes(move)) {
                board[move] = board[0] ? 'x' : 'o';
                printBoard(board);
            } else {
                console.log(`invalid move(1)`);
                // console.log(validMoves(board));
                // console.log(move);
                play(board, isHumanMove);
            }
        } catch (error) {
            // console.log(error);
            console.log(`invalid move(2)`);
            play(board, isHumanMove);
        }
    } else {
        let bestScore = -Infinity;
        let bestMove, score;
        let vMoves = validMoves(board);
        for (let i = 0; i < vMoves.length; i++) {
            board[vMoves[i]] = board[0] ? 'o' : 'x';
            score = minimax(board, false, -Infinity, Infinity);
            // console.log(`> ${score}`);       // for debugging: displays the score evaluated by minimax for all valid moves.
            board[vMoves[i]] = vMoves[i];
            if (score > bestScore) {
                // currently the ai to prefers the first path to victory and not the quickest path. do i wanna fix it??
                bestScore = score;
                bestMove = vMoves[i];
            }
        }

        board[bestMove] = board[0] ? 'o' : 'x';
        console.log(`ai played at ${bestMove}`);
        printBoard(board);
    }
}

/**
 * @param {object} board 
 * @param {boolean} is_maximizing 
 * @param {number} alpha 
 * @param {number} beta 
 * @returns best score evaluated by the minimax algorithm
 */
function minimax(board, is_maximizing, alpha, beta) {
    if (gameStatus(board) != null) {
        return gameStatus(board);
    } else {
        if (is_maximizing) {
            let bestScore = -Infinity;
            let vMoves = validMoves(board);
            for (let i = 0; i < vMoves.length; i++) {
                board[vMoves[i]] = board[0] ? 'o' : 'x';
                score = minimax(board, false, alpha, beta);
                board[vMoves[i]] = vMoves[i];
                if (score > bestScore) {
                    bestScore = score;
                }
                if (bestScore > alpha) {
                    alpha = bestScore;
                }
                if (alpha >= beta) {
                    break;
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            let vMoves = validMoves(board);
            for (let i = 0; i < vMoves.length; i++) {
                board[vMoves[i]] = board[0] ? 'x' : 'o';
                score = minimax(board, true, alpha, beta);
                board[vMoves[i]] = vMoves[i];
                if (score < bestScore) {
                    bestScore = score;
                }
                if (bestScore < beta) {
                    beta = bestScore;
                }
                if (alpha >= beta) {
                    break;
                }
            }
            return bestScore;
        }
    }
}

/**
 * game loop
 * @param {object} board 
 */
function startGame(board) {
    let isHumanMove = board[0];
    printBoard(board);
    board[0] ? isHumanMove = true : isHumanMove = false;
    while (gameStatus(board) == null) {
        play(board, isHumanMove);
        isHumanMove = !isHumanMove;
    }
    console.log(`${gameStatus(board) ? `the ai won` : gameStatus(board) == 0 ? `draw` : `this wasn't supposed to happen`}`);
}

function main() {
    var board = [null,
        1, 2, 3,
        4, 5, 6,
        7, 8, 9 
    ]
    
    // board[0] describes the human player. if it is true, the human is playing as x. if it is false, the human is playing as o.
    Math.round(Math.random()) ? board[0] = true : board[0] = false;
    console.log(`you will play as ${board[0] ? 'x' : 'o'}\nai will play as ${board[0] ? 'o' : 'x'}`);

    startGame(board);
}

if (typeof module !== 'undefined' && require.main === module) {
    main();
}
