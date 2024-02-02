inputs = [1.0, 2.0, 3.0, 2.5]
weights = [[0.2, 0.8, -0.5, 1.0], [0.5, -0.91, 0.26, -0.5], [-0.26, -0.27, 0.17, 0.87]]
biases = [2.0, 3.0, 0.5]

outputs = weights.each_with_index.map do |weight, index| 
	weight.zip(inputs).map{|x, y| x * y}.reduce(:+) + biases[index]
end

puts outputs
