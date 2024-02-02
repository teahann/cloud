% P08 - get unique items in list

unique([], []).
unique([H|T], L) :- member(H, T), unique(T, L).
unique([H|T], [H|L]) :- \+ member(H, T), unique(T, L).

unique([1, 2, 2, 3, 4, 4, 5, 5, 5, 2, 8.2, 8.2], List).
