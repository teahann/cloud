% numpy.dot() in prolog

mult_and_sum([], [], 0).
mult_and_sum([H1|T1], [H2|T2], Result) :-
	mult_and_sum(T1, T2, Result1),
	Result is Result1 + H1 * H2.

add_bias([], [], []).
add_bias([H1|T1], [H2|T2], [H|T]) :-
	H is H1 + H2,
	add_bias(T1, T2, T).

compute_layer(Input, Weights, Biases, Output) :-
	maplist(mult_and_sum(Input), Weights, TempOutput),
	add_bias(TempOutput, Biases, Output).


compute_layer([1, 2, 3, 2.5], [[0.2, 0.8, -0.5, 1.0], [0.5, -0.91, 0.26, -0.5], [-0.26, -0.27, 0.17, 0.87]], [2, 3, 0.5], Output).
