% P06 - check if list is a palindrome
% `reverse/2` is a built-in predicate

palindrome(List) :-
	reverse(List, Reversed),
	List == Reversed.

reverse_manually([], []).
reverse_manually([Head|Tail], Reversed) :-
	reverse_manually(Tail, ReversedTail),
	append(ReversedTail, [Head], Reversed).


palindrome([h, i, w, o, r, l, d ]).
palindrome([b, a, n, a, n, a, b ]).
