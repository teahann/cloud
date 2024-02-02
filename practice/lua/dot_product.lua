inputs = {1, 2, 3, 2.5}
weights = {{0.2, 0.8, -0.5, 1.0}, {0.5, -0.91, 0.26, -0.5}, {-0.26, -0.27, 0.17, 0.87}}
biases = {2, 3, 0.5}

for i = 1, #weights do
	local output = 0
	for j = 1, #inputs do
		output = output + inputs[j]*weights[i][j]
	end
	output = output + biases[i]
	print(output)
end
