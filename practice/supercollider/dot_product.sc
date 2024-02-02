(
var inputs = [1, 2, 3, 2.5];
var weights = [
	[0.2, 0.8, -0.5, 1.0],
	[0.5, -0.91, 0.26, -0.5],
	[-0.26, -0.27, 0.17, 0.87]
];
var biases = [2, 3, 0.5];

{
	var outputs = [];
	for(0, weights.size - 1, {arg index;
		var weight = weights.at(index);
		var input = inputs.at(index);
		var bias = biases.at(index);
		var output = ((weight * input).sum + bias);
		outputs = outputs.add(output);
	});
	outputs.postln;
}.value;
)
