/*{{{
 * 
 * todo: 
 * 		- check for standards and conventions (expecially for functions)
 * 		- '==' vs '==='
 * 		- simplify
 *
 */ //}}}


//gameStatus(){{{
/*{{{
 * board[0] is true only when the human is playing as 'x'
 * 
 * board[0] ? 'x' : 'o' gets the human's shape
 * 					and
 * board[0] ? 'o' : 'x' gets the ai's shape
 *
 * meaning of return values of gameStatus():
 *	(a) null 	--> the game isn't over
 *	(b) 0 		--> draw
 *	(c) 1		--> ai won the game
 *	(d) -1		--> human won the game
 *
 * }}}*/
function gameStatus(board) {
    if (board[1] == board[2] && board[2] == board[3]) {
        return board[1] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (board[4] == board[5] && board[5] == board[6]) {
        return board[4] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (board[7] == board[8] && board[8] == board[9]) {
        return board[7] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (board[1] == board[4] && board[4] == board[7]) {
        return board[1] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (board[2] == board[5] && board[5] == board[8]) {
        return board[2] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (board[3] == board[6] && board[6] == board[9]) {
        return board[3] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (board[1] == board[5] && board[5] == board[9]) {
        return board[1] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (board[3] == board[5] && board[5] == board[7]) {
        return board[3] == (board[0] ? 'x' : 'o') ? -1 : 1;
    } else if (validMoves(board).length == 0) {
        return 0;
    } else {
        return null;
    }
}
//}}}


//printboard(){{{
// function printBoard(board) {
//     console.log(`
//         |${board[1]}|${board[2]}|${board[3]}|
//         --+-+--
//         |${board[4]}|${board[5]}|${board[6]}|
//         --+-+--
//         |${board[7]}|${board[8]}|${board[9]}|
//     `);
// }
//}}}


//validMoves(){{{
function validMoves(board) {
    let vmoves = new Array();
    for (let i = 1; i < 10; i++) {
        if (board[i] != 'x' && board[i] != 'o') {
            vmoves.push(i);
        }
    }
    return vmoves;
}
//}}}


//humanPlay(){{{
function humanPlay(board) {

    return new Promise((resolve, reject) => {

        document.getElementById('b1').addEventListener('click', function() {
            document.getElementById('b1').style.color = 'rgba(0, 0, 0, 1)';
            board[1] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b1').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b2').addEventListener('click', function() {
            document.getElementById('b2').style.color = 'rgba(0, 0, 0, 1)';
            board[2] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b2').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b3').addEventListener('click', function() {
            document.getElementById('b3').style.color = 'rgba(0, 0, 0, 1)';
            board[3] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b3').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b4').addEventListener('click', function() {
            document.getElementById('b4').style.color = 'rgba(0, 0, 0, 1)';
            board[4] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b4').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b5').addEventListener('click', function() {
            document.getElementById('b5').style.color = 'rgba(0, 0, 0, 1)';
            board[5] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b5').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b6').addEventListener('click', function() {
            document.getElementById('b6').style.color = 'rgba(0, 0, 0, 1)';
            board[6] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b6').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b7').addEventListener('click', function() {
            document.getElementById('b7').style.color = 'rgba(0, 0, 0, 1)';
            board[7] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b7').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b8').addEventListener('click', function() {
            document.getElementById('b8').style.color = 'rgba(0, 0, 0, 1)';
            board[8] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b8').style.pointerEvents = 'none';
            resolve(true);
        });
        document.getElementById('b9').addEventListener('click', function() {
            document.getElementById('b9').style.color = 'rgba(0, 0, 0, 1)';
            board[9] = board[0] ? 'x' : 'o';
            // printBoard(board);
            document.getElementById('b9').style.pointerEvents = 'none';
            resolve(true);
        });
    });
}
//}}}


//aiPlay(){{{
function aiPlay(board) {
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
    document.getElementsByClassName('board_box')[bestMove - 1].innerHTML = board[0] ? 'o' : 'x';
    document.getElementsByClassName('board_box')[bestMove - 1].style.color = 'rgba(0, 0, 0, 1)';
    document.getElementsByClassName('board_box')[bestMove - 1].style.pointerEvents = 'none';
    // console.log(`ai played at ${bestMove}`);
    // printBoard(board);

    return true;
}
//}}}


//minimax(){{{
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
//}}}


//startGame(){{{
async function startGame(board) {
    let isHumanMove = board[0];
    // printBoard(board);

    board[0] ? isHumanMove = true : isHumanMove = false;
    while (gameStatus(board) == null) {
        isHumanMove ? await humanPlay(board) : aiPlay(board);
        isHumanMove = !isHumanMove;
    }

    var box = document.getElementsByClassName('board_box');
    for (var i = 0; i < box.length; i++) {
        box[i].style.pointerEvents = 'none';
    }

    // console.log(`${gameStatus(board) ? `the ai won` : gameStatus(board) == 0 ? `draw` : `this wasn't supposed to happen`}`);

    document.getElementById('board').innerHTML = gameStatus(board) ? ':(' : gameStatus(board) == 0 ? 'draw' : "this wasn't supposed to happen";
}
//}}}


//main(){{{
function main() {
    var board = [null,
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
    ]

    // board[0] describes the human player. if it is true, the human is playing as x. if it is false, the human is playing as o.
    Math.round(Math.random()) ? board[0] = true : board[0] = false;
    // console.log(`you will play as ${board[0] ? 'x' : 'o'}\nai will play as ${board[0] ? 'o' : 'x'}`);

    document.getElementById('title').innerHTML = board[0] ? 'x' : 'o';

    var box = document.getElementsByClassName('board_box');
    for (var i = 0; i < box.length; i++) {
        box[i].innerHTML = board[0] ? 'x' : 'o';
    }

    startGame(board);
}
//}}}

main()