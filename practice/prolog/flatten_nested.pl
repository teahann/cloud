% P07 - make 1 dimensional list from list of lists
% `\+` is negation-as-failure

flatten_([], []).
flatten_([Head|Tail], FlatList) :-
	flatten_(Head, FlatHead),
	flatten_(Tail, FlatTail),
	append(FlatHead, FlatTail, FlatList).
flatten_(Elem, [Elem]) :- \+ is_list(Elem).


flatten_([[1, 2, 3], [4, 5, 6], [7, 8, 9]], X).
