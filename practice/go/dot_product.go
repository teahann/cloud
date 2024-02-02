package main

import "fmt"

func main() {
	inputs := []float64{1, 2, 3, 2.5}
	weights := [][]float64{
		[]float64{0.2, 0.8, -0.5, 1.0},
		[]float64{0.5, -0.91, 0.26, -0.5},
		[]float64{-0.26, -0.27, 0.17, 0.87}}
	biases := []float64{2, 3, 0.5}
	output := make([]float64, 3)

	for i, weight := range weights {
		for j, input := range inputs {
			outputs[i] += weight[j] * input
		}
		outputs[i] += biases[i]
	}

	fmt.Printf("%f %f %f\n", output[0], output[1], output[2])
}
