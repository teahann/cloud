from itertools import permutations

word = "teahann"
perms = set(permutations(word))

for perm in sorted(perms):
    print(''.join(perm))