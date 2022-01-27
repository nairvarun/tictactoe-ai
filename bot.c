#include <stdio.h>
#include <stdlib.h>

char * GameInit(void);
void PrintBoard(char board[]);
int * GameOver(void);
void StartGme(void);

int main(void)
{
	char *board;
	int *GameStatus;
	board = GameInit();
	GameStatus = GameOver();
	for (int i = 0; i<2; i++)
	{
		printf("%d\n", GameStatus[i]);
	}
	return 0;
}

char * GameInit(void)
{
	char *board = malloc(sizeof(*board) * 11);
	while (1)
	{
		printf("do you want to play as 'x' or 'o'? ");
		board[0] = getchar();	/* board[0] represents if the human is playing as 'x' or 'o' */

		// clear input stream
		char c;
		while ((c = getchar()) != '\n' && c != EOF) {}
		
		if (board[0] == 'x' || board[0] == 'o' || board[0] == 'X' || board[0] == 'O')
		{
			break;
		}
		else
		{
			printf("invalid choice\n\n");
		}
	}
	
	printf("\nyou will be playing as '%c'\n\n", board[0]);
	for (int i = 1; i < 10; i++)
	{
		board[i] = i + '0';
	}
	board[0] = 's';
	PrintBoard(board);

	return(board);
}

void PrintBoard(char board[])
{
	// todo: print in the middle of the terminal screen 
	// clears treminal screen
	// printf("%c[2J%c[;H", (char) 27, (char) 27);
	
	for (int i = 1; i < 10; i += 3)
	{
		printf("|%c|%c|%c|\n", board[i], board[i+1], board[i+2]);
		// only print divisions after the first and second line
		if (i < 7)
		{
			printf("-------\n");
		}
	}
}

void StartGme(void)
{
	
}

int * GameOver(void)
{
	int *GameStatus = calloc(2, sizeof(*GameStatus));

	// [0=game not over;1=game over, 0=draw, 1=ai won, -1=human won]
	if (board[1] == board[2] && board[2] == board[3])
	{
		GameStatus[0] = 1;
		GameStatus[1] = board[0] == board[1] ? -1 : 1;
	}
	else if (board[4] == board[5] && board[5] == board[6])
	{
		GameStatus[0] = 1;
		GameStatus[1] = board[0] == board[1] ? -1 : 1;
	}
	
	return(GameStatus);
}