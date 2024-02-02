from emojis import EMOJI_CODES
import random

mojis = ''
for _ in range(250):
  mojis = mojis + random.choice(EMOJI_CODES)

print(mojis)
