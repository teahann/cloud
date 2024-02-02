import platform
import subprocess
from art import FRAMES

NUMBER_WRONG_ALLOWED = 6
WORD = input("Enter the secret word: ").lower()
CURRENT_WORD = ["_"] * len(WORD)
msg = ""
guesses = []
wrong_guesses = []

if len(WORD) < 1:
	exit("Word is too short. Exiting cuz you suck")

for i, letter in enumerate(WORD):
	if letter == " ":
		CURRENT_WORD[i] = " "
	else:
		if not letter.isalpha():
			exit("Wrong. Letters only.")

def clear_screen():
	if platform.system() == "Windows":
		subprocess.run("cls", shell=True)
	else:
		subprocess.run("clear")

def game_state():
	global msg
	clear_screen()
	print(f"Guesses left: {NUMBER_WRONG_ALLOWED - len(wrong_guesses)}")
	print("".join(CURRENT_WORD))
	if guesses:
		guessed_letters_str = ", ".join(guesses)
		print(f"Guessed Letters: {guessed_letters_str}\n")
		print(FRAMES[len(wrong_guesses)])
	if msg:
		print(msg)
		msg = ""

def report_score(wrong_guesses):
	if wrong_guesses <= 1:
		print("Wow. You're literally the best player of all time! 🏆🏆🏆🏆🏆🏆🏆🏆🏆")
	elif 2 <= wrong_guesses <= 4: 
		print("You're an above average player. Nice")
	else:
		print("You're garbage. Git gud. (●'◡'●)(●'◡'●)")

while True:
	game_state()
	guess = input("Enter a letter: ").lower()

	# Validate guess
	if not guess.isalpha():
		msg = f'You guessed {guess}. Guess must be a letter!'
		continue
	elif len(guess) != 1:
		msg = f"You guessed {guess}. Guess must be 1 letter only"
		continue
	elif guess in guesses:
		msg = f"You guessed {guess}. You have already guessed that letter. Try again."
		continue

	guesses.append(guess)

	if guess in WORD:
		for i, letter in enumerate(WORD):
			if guess == letter:
				CURRENT_WORD[i] = guess
				continue
	else:
		msg = f"The letter '{guess}' is not in the mystery word. whomp whomp\n"
		wrong_guesses.append(guess)

	if WORD == "".join(CURRENT_WORD):
		msg = "You win! 🏆"
		game_state()
		report_score(len(wrong_guesses))
		break
	
	if len(wrong_guesses) >= NUMBER_WRONG_ALLOWED:
		msg = f"~~~ Game Over ~~~\nYou lost! 😦\nThe word was: {WORD}"
		game_state()
		break
