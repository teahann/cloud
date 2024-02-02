% P01 - get last element of a list

my_last(X,[X]).
my_last(X,[_|L]) :- my_last(X,L).

% ?- my_last(X, [a, b, c, d])
% ?- my_last(X, [0, 1, 2, 3])
