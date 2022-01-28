# todo
	# add readme on github
	# check if conditions are proper in game_over()


#region imports
import random
import math
#endregion


#region function definitions


# game_over checks whether the game has ended and returns the winner
def game_over(board):
	if board[1] == board[2] == board[3]:
		winner = board[1]
		return True, winner
	elif board[4] == board[5] == board[6]:
		winner = board[4]
		return True, winner
	elif board[7] == board[8] == board[9]:
		winner = board[7]
		return True, winner
	elif board[1] == board[4] == board[7]:
		winner = board[1]
		return True, winner
	elif board[2] == board[5] == board[8]:
		winner = board[2]
		return True, winner
	elif board[3] == board[6] == board[9]:
		winner = board[3]
		return True, winner
	elif board[1] == board[5] == board[9]:
		winner = board[1]
		return True, winner
	elif board[3] == board[5] == board[7]:
		winner = board[3]
		return True, winner
	elif get_valid_moves(board) == []:
		winner = None
		return True, winner
	else:
		winner = None
		return False, winner


# print_board prints the current state of the game board
def print_board(board):
	b = '''
	|%s|%s|%s|
	--+-+--
	|%s|%s|%s|
	--+-+--
	|%s|%s|%s|
	'''%(board[1], board[2], board[3], board[4], board[5], board[6], board[7], board[8], board[9])
	print(b)


# get_valid_moves returns a list of all valid moves for the current board state
def get_valid_moves(board):
	valid_moves = []
	for i in board:
		if board[i] == 'X' or board[i] == 'O':
			pass
		else:
			valid_moves.append(i)
	return valid_moves


# check_move checks whether the move made by the player is valid
def check_move(move, board):
	if move in get_valid_moves(board):
		return True
	else:
		return False


# play function is the function that actually executes the move entered by the human and the one made by the ai
def play(is_human, human, ai, board):
	if is_human == True:
		try:
			move = int(input('where do you want to play %s? '%human))
			if check_move(move, board) == True:
				board[move] = human
				print_board(board)
				print('valid moves:', get_valid_moves(board))
			else:
				print('invalid move')
				# print('invalid move: because check_move() == False')
				play(is_human, human, ai, board)
		except:
			print("invalid move")
			# print("invalid move: from play() exeption handling")
			play(is_human, human, ai, board)
	else:
	# random move:
		# board[random.choice(get_valid_moves(board))] = ai

	# best move found using minimax:
		# WARNING: i havent updated the minimax function. it WILL break things if uncommented.
		# best_score = -math.inf
		# best_move = random.choice(get_valid_moves(board))
	
		# for i in get_valid_moves(board):
		# 	# make_move(mover, i)
		# 	board[i] = mover
		# 	score = minimax(mover, board, False)
		# 	# make_move(i, i)
		# 	board[i] = i
		# 	if score > best_score:
		# 		best_score = score
		# 		best_move = i
		# board[best_move] = mover
		# print_board(board)
		# print('valid moves:', get_valid_moves(board))

	# best move found using minimax and alpha beta pruning:
		best_score = -math.inf
		best_move = random.choice(get_valid_moves(board))
	
		for i in get_valid_moves(board):
			board[i] = ai
			score = minimax_abp(ai, human, board, False, -math.inf, math.inf)
			board[i] = i
			if score > best_score:
				best_score = score
				best_move = i
		board[best_move] = ai
		print_board(board)
		print('the ai played', ai, 'at', best_move)
		print('valid moves:', get_valid_moves(board))


# game loop
def start_game(human, ai, board):
	while game_over(board)[0] == False:
		if human == 'X':
			play(True, human, ai, board)
			if game_over(board)[0] == True:
				break
			play(False, human, ai, board)
			if game_over(board)[0] == True:
				break
		else:
			play(False, human, ai, board)
			if game_over(board)[0] == True:
				break
			play(True, human, ai, board)
			if game_over(board)[0] == True:
				break
	if game_over(board)[1] == None:
		print('draw')
	else:
		if ai == game_over(board)[1]:
			print('the ai won')
		else:
			print('THIS WASNT SUPPOSED TO HAPPEN. CONTACT ME ASAP.')

# WARNING: The minimax function hasent been updated. it WILL break things if uncommented. use minimax_abp() instead.
# def minimax(mover, board, ismax):
	# if mover == 'X':
	# 	opp = 'O'
	# else:
	# 	opp = 'X'

	# if game_over(board)[0] == True:
	# 	if game_over(board)[1] == None:
	# 		return 0
	# 	elif game_over(board)[1] == mover:
	# 		return 1
	# 	else:
	# 		return -1
	# else:
	# 	if ismax == True:
	# 		best_score = -math.inf
			
	# 		for i in get_valid_moves(board):
	# 			# make_move(mover, i)
	# 			board[i] = mover
	# 			score = minimax(mover, board, False)
	# 			# make_move(i, i)
	# 			board[i] = i
	# 			if score > best_score:
	# 				best_score = score
	# 		return best_score
	# 		# best_score = max(best_score, score)
	# 		# return max(best_score, score)

	# 	else:
	# 		best_score = math.inf
			
	# 		for i in get_valid_moves(board):
	# 			# make_move(opp, i)
	# 			board[i] = opp
	# 			score = minimax(mover, board, True)
	# 			# make_move(i, i)
	# 			board[i] = i
	# 			if score < best_score:
	# 				best_score = score
	# 		return best_score
	# 		# best_score = min(best_score, score)
	# 		# return min(best_score, score)


# minimax alogrithm with alpha beta pruning
def minimax_abp(ai, human, board, is_maximizing, alpha, beta):
	# exit conditions for this recursive function
	if game_over(board)[0] == True:
		if game_over(board)[1] == None:
			return 0
		elif game_over(board)[1] == ai:
			return 1
		else:
			return -1
	# main algorithm
	else:
		if is_maximizing == True:
			best_score = -math.inf
			
			for i in get_valid_moves(board):
				board[i] = ai
				# only print the board if you want to see every move tried. might take time.
				# print_board(board)
				score = minimax_abp(ai, human, board, False, alpha, beta)
				board[i] = i
				if score > best_score:
					best_score = score
				if best_score > alpha:
					alpha = best_score
				if alpha >= beta:
					break
			return best_score
		else:
			best_score = math.inf
			
			for i in get_valid_moves(board):
				board[i] = human
				# only print the board if you want to see every move tried. might take time.
				# print_board(board)
				score = minimax_abp(ai, human, board, True, alpha, beta)
				board[i] = i
				if score < best_score:
					best_score = score
				if best_score < beta:
					beta = best_score
				if alpha >= beta:
					break
			return best_score


# main function
def main():
	# dictionary 'board' represents the main tictactoe board 
	board = {
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9
	}

	# 'X' and 'O' are randomly assigned and the game will be started
	options = ('X', 'O')
	human = random.choice(options)

	if human == 'X':
		ai = 'O'
	else:
		ai = 'X'

	print('you will be playing as', human)
	print_board(board)
	print('valid moves:', get_valid_moves(board))
	start_game(human, ai, board)


#endregion


if __name__ == '__main__':
	main()
