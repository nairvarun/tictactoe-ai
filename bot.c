#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int *GameInit(void);
void PrintBoard(int board[]);
int GetGameStatus(int board[]);
int *GetValidMoves(int board[]);
void StarGame(int board[]);
void Play(int board[], int is_ai_move);
int Minimax(int board[], int is_maximizing, int alpha, int beta);

int main(void)
{
	int *board;
	board = GameInit();
	PrintBoard(board);
	StarGame(board);
	return 0;
}

int *GameInit(void)
{
	// board[0] ==> status of game wrt x
		// 0 ==> ai playing as o
		// 1 ==> ai playing as x
	// return vals:
		// 0 ==> draw
		// 1 ==> x (ai) won
		// -1 == x (human) won
	int *board = calloc(10, sizeof(*board));
	for (int i = 1; i < 10; i++)
	{
		board[i] = i;
	}
	
	while (1)
	{
		printf("what do you wnat to play as? [x/o]\n> ");
		char choice = getchar();
		if (choice == 'x')	// ai ==> o 
		{
			board[0] = 'o' - '0';
			int _; while ((_ = getchar()) != '\n' && _ != EOF) {}	/* clear input stream */
			break;
		}
		else if (choice == 'o')	// ai ==> x
		{
			board[0] = 'x' - '0';
			int _; while ((_ = getchar()) != '\n' && _ != EOF) {}	/* clear input stream */
			break;
		}
		else
		{
			printf("\ninvalid choice! ");
			int _; while ((_ = getchar()) != '\n' && _ != EOF) {}	/* clear input stream */
		}
	}

	return(board);
}

void PrintBoard(int board[])
{
	printf("\n");
	for (int i = 1;  i < 10; i += 3)
	{
		printf("|%c|%c|%c|\n", board[i] + '0', board[i+1] + '0', board[i+2] + '0');
		if (i < 7) {printf("--+-+--\n");}
	}
	printf("\n");
}

int GetGameStatus(int board[])
{
	int *valid_moves;
	valid_moves = GetValidMoves(board);

	// board[0] ==> status of game wrt x
		// 0 ==> ai playing as o
		// 1 ==> ai playing as x
	// return vals:
		// 0 ==> draw
		// 1 ==> x (ai) won
		// -1 ==> x (human) won
		// 100 ==> game not over
	if (board[1] == board[2] && board[2] == board[3]){return (board[0] == board[1] ? 1 : -1);}
	else if (board[4] == board[5] && board[5] == board[6]){return (board[0] == board[4] ? 1 : -1);}
	else if (board[7] == board[8] && board[8] == board[9]){return (board[0] == board[7] ? 1 : -1);}
	else if (board[1] == board[4] && board[4] == board[7]){return (board[0] == board[1] ? 1 : -1);}
	else if (board[2] == board[5] && board[5] == board[8]){return (board[0] == board[2] ? 1 : -1);}
	else if (board[7] == board[6] && board[6] == board[9]){return (board[0] == board[7] ? 1 : -1);}
	else if (board[1] == board[5] && board[5] == board[9]){return (board[0] == board[1] ? 1 : -1);}
	else if (board[3] == board[5] && board[5] == board[7]){return (board[0] == board[3] ? 1 : -1);}
	else if (valid_moves[0] == 0) {return 0;}
	else {return(100);}
}

int *GetValidMoves(int board[])
{
	int *valid_moves = calloc(9, sizeof(*valid_moves));
	int valid_move_counter = 0;
	for (int i = 1; i < 10; i ++)
	{
		if (board[i] <= 9)
		{
			valid_moves[valid_move_counter] = i;
			valid_move_counter++;
		}
	}
	return (valid_moves);
}

void StarGame(int board[])
{
	int is_ai_move = (board[0] == 'x' - '0') ? 1 : 0;

	while(GetGameStatus(board) == 100)
	{
		Play(board, is_ai_move);
		is_ai_move = is_ai_move ? 0 : 1;
	}
}

void Play(int board[], int is_ai_move)
{
	if (is_ai_move)
	{
		int *valid_moves, score, best_score, best_move;
		best_score = INT_MIN;
		valid_moves = GetValidMoves(board);

		for (int i = 0; i < 9; i++)
		{
			if (valid_moves[i])
			{
				board[valid_moves[i]] = board[0];
				score = Minimax(board, 0, INT_MIN, INT_MAX);
				board[valid_moves[i]] = valid_moves[i];
				if (score > best_score)
				{
					best_score = score;
					best_move = valid_moves[i];
				}
			}
		}
		board[best_move] = board[0];
		printf("\nai played at %d\n", best_move);
		PrintBoard(board);
	}
	else
	{
		int *valid_moves;
		valid_moves = GetValidMoves(board);
		while (1)
		{
			printf("your move?\n> ");
			char choice = getchar() - '0';
			for (int i = 0; i < 9; i++)
			{
				// printf("%d, %d\n", valid_moves[i], choice);
				if (valid_moves[i] == choice)
				{
					board[valid_moves[i]] = (board[0] == 'x' - '0') ? ('o' - '0') : ('x' - '0');
					int _; while ((_ = getchar()) != '\n' && _ != EOF) {}	/* clear input stream */
					goto end;
				}
			}
			printf("\ninvalid choice! ");
			int _; while ((_ = getchar()) != '\n' && _ != EOF) {}	/* clear input stream */
		}
		end:
		PrintBoard(board);
	}
}

int Minimax(int board[], int is_maximizing, int alpha, int beta)
{
	if (GetGameStatus(board) != 100)
	{
		return GetGameStatus(board);
	}
	else
	{
		if (is_maximizing)
		{
			int *valid_moves, score, best_score, best_move;
			best_score = INT_MIN;
			valid_moves = GetValidMoves(board);
			for (int i = 0; i < 9; i++)
			{
				if (valid_moves[i])
				{
					board[valid_moves[i]] = board[0];
					score = Minimax(board, 0, INT_MIN, INT_MAX);
					board[valid_moves[i]] = valid_moves[i];
					if (score > best_score)
					{
						best_score = score;
					}
					if (best_score > alpha)
					{
						alpha = best_score;
					}
					if (alpha >= beta)
					{
						break;
					}
				}
			}
			return best_score;
		}
		else
		{
			int *valid_moves, score, best_score, best_move;
			best_score = INT_MAX;
			valid_moves = GetValidMoves(board);
			for (int i = 0; i < 9; i++)
			{
				if (valid_moves[i])
				{
					board[valid_moves[i]] = (board[0] == 'x' - '0') ? ('o' - '0') : ('x' - '0');
					score = Minimax(board, 1, INT_MIN, INT_MAX);
					board[valid_moves[i]] = valid_moves[i];
					if (score < best_score)
					{
						best_score = score;
					}
					if (best_score < beta)
					{
						beta = best_score;
					}
					if (alpha >= beta)
					{
						break;
					}
				}
			}
			return best_score;
		}
	}
}