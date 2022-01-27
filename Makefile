all: bot.c
	gcc -o cbot bot.c

clean: cbot
	rm cbot