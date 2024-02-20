import numpy as np

inputs = [1,2,3,2.5]
weights = [
	[0.2,0.8,-0.5,1.0],
	[0.5,-0.91,0.26,-0.5],
	[-0.26,-0.27,0.17,0.87]
]
biases = [2,3,0.5]

a=np.dot(weights,inputs)+biases
print(a, 'numpy dot')

b=[]
for weight, bias in zip(weights, biases):
	x = 0
	for i, w in zip(inputs, weight):
		x += i * w
	x += bias
	b.append(x)
print(b, 'loop')

c = [sum(w*i for w,i in zip(W, inputs))+b for W,b in zip(weights, biases)]
print(c, 'one-line')
