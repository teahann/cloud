import platform
import subprocess
from art import FRAMES

NUMBER_WRONG_ALLOWED = 6
msg = ""
guesses = []
wrong_guesses = []

def clear_screen():
	if platform.system() == "Windows":
		subprocess.run("cls", shell=True)
	else:
		subprocess.run("clear")

# Init game
clear_screen()
WORD = input("Enter secret word: ").lower()
CURRENT_WORD = ["_"] * len(WORD)
# Validate word
if len(WORD) < 1:
	exit("Word is too short. Exiting")

for i, letter in enumerate(WORD):
	if letter == " ":
		CURRENT_WORD[i] = " "
	else:
		if not letter.isalpha():
			exit("Letters only. Exiting")

def game_state():
	global msg
	clear_screen()
	print(f"Guesses left: {NUMBER_WRONG_ALLOWED - len(wrong_guesses)}")
	print(FRAMES[min(len(wrong_guesses), len(FRAMES) - 1)])
	print(f"Word: {' '.join(CURRENT_WORD)}")
	if len(guesses) > 0:
		print(f"Letter graveyard: {', '.join(guesses)}")
	if msg:
		print(msg)
		msg = ""

def report_score(wrong_guesses):
	if wrong_guesses <= 1:
		print("🏆 You're literally the best player of all time! 🏆")
	elif 2 <= wrong_guesses <= 4: 
		print("You're an above average player. Nice")
	else:
		print("(●'◡'●) You're garbage. Git gud (●'◡'●)")

while True:
	game_state()
	guess = input("Enter a letter: ").lower()

	# Validate
	if not guess.isalpha():
		msg = f"Your guess '{guess}' is not a letter!"
		continue
	elif len(guess) != 1:
		msg = f"Your guess '{guess}' is not a single letter"
		continue
	elif guess in guesses:
		msg = f"Your guess '{guess}' has already been guessed."
		continue

	# Add
	guesses.append(guess)
	if guess in WORD:
		for i, letter in enumerate(WORD):
			if guess == letter:
				CURRENT_WORD[i] = guess
				continue
	else:
		msg = f"The letter '{guess}' is not in the mystery word. whomp whomp\n"
		wrong_guesses.append(guess)

	# End
	if WORD == "".join(CURRENT_WORD):
		msg = "You win! 🏆"
		game_state()
		report_score(len(wrong_guesses))
		break
	elif len(wrong_guesses) >= NUMBER_WRONG_ALLOWED:
		msg = f"😦 You lost 😖\nThe word was {WORD}"
		game_state()
		break
